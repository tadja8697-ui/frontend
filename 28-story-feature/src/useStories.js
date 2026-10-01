import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEY, STORY_LIFETIME_MS } from './constants.js';

/**
 * Charge les stories depuis localStorage en filtrant les expirées.
 * @returns {Array}
 */
function loadStories() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        const now = Date.now();

        // Filtrer les stories expirées
        return parsed.filter((story) => story.expiresAt > now);
    } catch (err) {
        console.warn('Impossible de lire localStorage :', err);
        return [];
    }
}

/**
 * Sauvegarde les stories dans localStorage.
 * @param {Array} stories
 * @returns {boolean} true si succès
 */
function saveStories(stories) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
        return true;
    } catch (err) {
        console.warn('Impossible de sauvegarder :', err);
        return false;
    }
}

/**
 * Custom hook pour gérer les stories.
 */
export function useStories() {
    const [stories, setStories] = useState(loadStories);
    const [error, setError] = useState(null);

    // ---------- SYNCHRONISATION AVEC LOCALSTORAGE ----------
    useEffect(() => {
        const success = saveStories(stories);
        if (!success) {
            setError('Stockage plein. Supprimez une story pour continuer.');
        } else {
            setError(null);
        }
    }, [stories]);

    // ---------- NETTOYAGE PÉRIODIQUE DES STORIES EXPIRÉES ----------
    useEffect(() => {
        // Toutes les 60 secondes, on retire les stories expirées
        const id = setInterval(() => {
            setStories((prev) => prev.filter((s) => s.expiresAt > Date.now()));
        }, 60_000);

        return () => clearInterval(id);
    }, []);

    // ---------- ACTIONS ----------

    /**
     * Ajoute une nouvelle story.
     * @param {string} imageDataURL
     */
    const addStory = useCallback((imageDataURL) => {
        const now = Date.now();

        const newStory = {
            id: `story-${now}-${Math.random().toString(36).slice(2, 8)}`,
            image: imageDataURL,
            createdAt: now,
            expiresAt: now + STORY_LIFETIME_MS,
        };

        setStories((prev) => [newStory, ...prev]);
        return newStory;
    }, []);

    /**
     * Supprime une story par son id.
     * @param {string} id
     */
    const deleteStory = useCallback((id) => {
        setStories((prev) => prev.filter((s) => s.id !== id));
    }, []);

    return {
        stories,
        error,
        addStory,
        deleteStory,
    };
}