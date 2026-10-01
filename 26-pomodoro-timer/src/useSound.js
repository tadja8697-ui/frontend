import { useCallback, useRef } from 'react';

/**
 * Custom hook pour jouer un son de notification.
 * Utilise l'API Web Audio (pas de fichier audio nécessaire).
 */
export function useSound() {
    const audioContextRef = useRef(null);

    const playBeep = useCallback(() => {
        try {
            // Créer ou réutiliser l'AudioContext
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioContextRef.current;

            // Reprendre si suspendu (politique navigateur)
            if (ctx.state === 'suspended') ctx.resume();

            // Joue 3 bips courts
            [0, 0.2, 0.4].forEach((offset) => {
                const oscillator = ctx.createOscillator();
                const gain = ctx.createGain();

                oscillator.connect(gain);
                gain.connect(ctx.destination);

                oscillator.type = 'sine';
                oscillator.frequency.value = 880;   // La 880 Hz

                gain.gain.setValueAtTime(0.3, ctx.currentTime + offset);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + 0.15);

                oscillator.start(ctx.currentTime + offset);
                oscillator.stop(ctx.currentTime + offset + 0.15);
            });
        } catch (err) {
            console.warn('Impossible de jouer le son :', err);
        }
    }, []);

    return playBeep;
}