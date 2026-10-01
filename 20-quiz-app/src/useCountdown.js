import { useState, useEffect } from 'react';

/**
 * Custom hook : compte à rebours en secondes.
 *
 * @param {number} initialSeconds - Durée au départ (0 = désactivé)
 * @param {boolean} isRunning     - Est-ce que le timer tourne ?
 * @param {Function} onExpire     - Callback appelé quand le timer atteint 0
 * @param {number} resetKey       - Change cette valeur pour réinitialiser
 * @returns {number} secondes restantes
 */
export function useCountdown(initialSeconds, isRunning, onExpire, resetKey) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    // Réinitialiser quand resetKey change (nouvelle question)
    useEffect(() => {
        setSecondsLeft(initialSeconds);
    }, [initialSeconds, resetKey]);

    // Démarrer / arrêter le timer
    useEffect(() => {
        // Pas de timer si désactivé ou si on ne joue pas
        if (!isRunning || initialSeconds <= 0) return;

        // Si déjà à 0 → on déclenche onExpire
        if (secondsLeft <= 0) {
            onExpire?.();
            return;
        }

        // setInterval : décrémente chaque seconde
        const id = setInterval(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);

        // Nettoyage : clearInterval quand le composant change ou se démonte
        return () => clearInterval(id);
    }, [isRunning, secondsLeft, initialSeconds, onExpire]);

    return secondsLeft;
}