function formatNumber(num) {
    // 24000 → "24k"
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
}

function RepoCard({ repo, onRefresh }) {
    return (
        <div className="repo-card">

            {/* En-tête : nom + lien externe */}
            <div className="repo-header">
                <h2 className="repo-name">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {repo.name}
                    </a>
                </h2>
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                    aria-label={`Open ${repo.name} on GitHub`}
                >
                    ↗
                </a>
            </div>

            {/* Description */}
            <p className="repo-description">
                {repo.description || 'No description provided.'}
            </p>

            {/* Métadonnées : langage + stars + forks + issues */}
            <ul className="repo-meta">
                {repo.language && (
                    <li>
                        <span
                            className="lang-dot"
                            aria-hidden="true"
                        ></span>
                        {repo.language}
                    </li>
                )}
                <li>⭐ {formatNumber(repo.stargazers_count)}</li>
                <li>🍴 {formatNumber(repo.forks_count)}</li>
                <li>👁 {formatNumber(repo.open_issues_count)}</li>
            </ul>

            {/* Bouton Refresh */}
            <button
                type="button"
                className="refresh-btn"
                onClick={onRefresh}
            >
                Refresh
            </button>
        </div>
    );
}

export default RepoCard;