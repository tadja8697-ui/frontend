import { useState, useEffect, useRef, useCallback } from 'react';
import { MODES, DEFAULT_CONFIG } from './constants.js';

/**
 * Custom hook qui gère TOUTE la logique du timer.
 * @param {Function} onSessionEnd - Callback appelé à la fin d'une session
 */
export function useTimer(onSessionEnd) {
    // ---------- STATE ----------
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [mode, setMode] = useState(MODES.WORK);
    const [timeLeft, setTimeLeft] = useState(DEFAULT_CONFIG.work * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);

    // Ref pour le callback : évite de redéclencher le useEffect
    const onSessionEndRef = useRef(onSessionEnd);
    useEffect(() => {
        onSessionEndRef.current = onSessionEnd;
    }, [onSessionEnd]);

    // ---------- TIMER ----------
    useEffect(() => {
        // Ne rien faire si le timer est arrêté
        if (!isRunning) return;

        // Interval qui décrémente chaque seconde
        const id = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // Le timer atteint 0 → on termine la session
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup
        return () => clearInterval(id);
    }, [isRunning]);

    // ---------- FIN DE SESSION ----------
    useEffect(() => {
        // Si le timer n'est pas à 0, on ne fait rien
        if (timeLeft !== 0 || !isRunning) return;

        // Arrêter le timer
        setIsRunning(false);

        // Jouer le son
        onSessionEndRef.current?.();

        // Calculer le prochain mode
        let nextMode;
        let nextSessions = sessionsCompleted;

        if (mode === MODES.WORK) {
            nextSessions = sessionsCompleted + 1;
            setSessionsCompleted(nextSessions);

            // Long break toutes les N sessions ?
            nextMode = (nextSessions % config.sessionsBeforeLongBreak === 0)
                ? MODES.LONG_BREAK
                : MODES.SHORT_BREAK;
        } else {
            // Après un break → retour au travail
            nextMode = MODES.WORK;
        }

        setMode(nextMode);
        setTimeLeft(config[nextMode] * 60);
    }, [timeLeft, isRunning, mode, sessionsCompleted, config]);

    // ---------- ACTIONS ----------

    /** Démarre ou reprend le timer. */
    const start = useCallback(() => setIsRunning(true), []);

    /** Met en pause le timer. */
    const pause = useCallback(() => setIsRunning(false), []);

    /** Bascule start/pause. */
    const toggle = useCallback(() => setIsRunning((r) => !r), []);

    /** Remet le timer à zéro pour la session en cours. */
    const reset = useCallback(() => {
        setIsRunning(false);
        setTimeLeft(config[mode] * 60);
    }, [mode, config]);

    /** Réinitialise complètement (retour au mode Work). */
    const resetAll = useCallback(() => {
        setIsRunning(false);
        setMode(MODES.WORK);
        setTimeLeft(config.work * 60);
        setSessionsCompleted(0);
    }, [config]);

    /** Change de mode manuellement. */
    const switchMode = useCallback((newMode) => {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(config[newMode] * 60);
    }, [config]);

    /** Met à jour la configuration. */
    const updateConfig = useCallback((newConfig) => {
        setConfig(newConfig);
        // Recalcule le temps restant si on n'est pas en cours
        if (!isRunning) {
            setTimeLeft(newConfig[mode] * 60);
        }
    }, [mode, isRunning]);

    // ---------- RETOUR ----------
    return {
        // State
        mode,
        timeLeft,
        isRunning,
        sessionsCompleted,
        config,
        // Actions
        start,
        pause,
        toggle,
        reset,
        resetAll,
        switchMode,
        updateConfig,
    };
}