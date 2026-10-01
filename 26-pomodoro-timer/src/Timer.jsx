import { MODE_LABELS, MODE_CLASSES, MODES } from './constants.js';

/**
 * Formate un nombre de secondes en "MM:SS".
 */
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function Timer({ mode, timeLeft }) {
    const modeClass = MODE_CLASSES[mode];
    const modeLabel = MODE_LABELS[mode];
    const formattedTime = formatTime(timeLeft);
    const progress = 1 - timeLeft / (mode === MODES.WORK ? 25 * 60 : 5 * 60);

    return (
        <div className={`timer ${modeClass}`}>
            <p className="timer-mode" aria-live="polite">
                {modeLabel}
            </p>

            <p
                className="timer-time"
                aria-label={`Time left: ${Math.floor(timeLeft / 60)} minutes and ${timeLeft % 60} seconds`}
            >
                {formattedTime}
            </p>
        </div>
    );
}

export default Timer;