function LoadingState() {
    return (
        <div className="state state--loading">
            <div className="spinner" aria-hidden="true"></div>
            <p>Loading, please wait...</p>
        </div>
    );
}

export default LoadingState;