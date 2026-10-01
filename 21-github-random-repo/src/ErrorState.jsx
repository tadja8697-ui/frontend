function ErrorState({ message, onRetry }) {
    return (
        <div className="state state--error">
            <p className="error-text">{message}</p>
            <button
                type="button"
                className="retry-btn"
                onClick={onRetry}
            >
                Click to retry
            </button>
        </div>
    );
}

export default ErrorState;