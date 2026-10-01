function ProgressBar({ current, total }) {
    // Calcul du pourcentage (arrondi)
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="progress">
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                >
                    {percentage}%
                </div>
            </div>
            <span className="progress-label">
                {current} of {total}
            </span>
        </div>
    );
}

export default ProgressBar;