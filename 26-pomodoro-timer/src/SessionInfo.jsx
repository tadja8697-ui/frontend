import { MODES } from './constants.js';

function SessionInfo({ sessionsCompleted, sessionsBeforeLongBreak, onSwitchMode, currentMode }) {
    // Position dans le cycle (1, 2, 3, 4, 1, 2, ...)
    const positionInCycle = (sessionsCompleted % sessionsBeforeLongBreak) || sessionsBeforeLongBreak;
    const sessionsUntilLongBreak = sessionsBeforeLongBreak - (sessionsCompleted % sessionsBeforeLongBreak);

    return (
        <section className="session-info" aria-label="Session information">

            <p className="session-counter">
                🍅 <strong>{sessionsCompleted}</strong>{' '}
                {sessionsCompleted === 1 ? 'pomodoro' : 'pomodoros'} completed
            </p>

            <p className="session-cycle">
                Cycle : {positionInCycle} / {sessionsBeforeLongBreak}
            </p>

            {/* Boutons pour changer de mode manuellement */}
            <div className="mode-switcher" role="group" aria-label="Change session mode">
                <button
                    type="button"
                    className={`mode-btn ${currentMode === MODES.WORK ? 'is-active' : ''}`}
                    onClick={() => onSwitchMode(MODES.WORK)}
                >
                    Work
                </button>
                <button
                    type="button"
                    className={`mode-btn ${currentMode === MODES.SHORT_BREAK ? 'is-active' : ''}`}
                    onClick={() => onSwitchMode(MODES.SHORT_BREAK)}
                >
                    Short
                </button>
                <button
                    type="button"
                    className={`mode-btn ${currentMode === MODES.LONG_BREAK ? 'is-active' : ''}`}
                    onClick={() => onSwitchMode(MODES.LONG_BREAK)}
                >
                    Long
                </button>
            </div>
        </section>
    );
}

export default SessionInfo;