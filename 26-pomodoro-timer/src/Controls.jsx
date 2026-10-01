function Controls({
    isRunning,
    onStart,
    onPause,
    onReset,
    onSkip,
}) {
    return (
        <div className="controls" role="group" aria-label="Timer controls">

            <button
                type="button"
                className="control-btn control-btn--secondary"
                onClick={onReset}
                aria-label="Reset current session"
            >
                Reset
            </button>

            <button
                type="button"
                className="control-btn control-btn--primary"
                onClick={isRunning ? onPause : onStart}
                aria-label={isRunning ? 'Pause timer' : 'Start timer'}
            >
                {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
                type="button"
                className="control-btn control-btn--secondary"
                onClick={onSkip}
                aria-label="Skip to next session"
            >
                Skip
            </button>

        </div>
    );
}

export default Controls;