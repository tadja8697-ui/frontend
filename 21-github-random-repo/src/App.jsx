import { useState, useEffect } from 'react';
import { languages } from './languages.js';
import EmptyState from './EmptyState.jsx';
import LoadingState from './LoadingState.jsx';
import ErrorState from './ErrorState.jsx';
import RepoCard from './RepoCard.jsx';
import './style.css';

const GITHUB_API = 'https://api.github.com/search/repositories';

function App() {
    // ---------- ÉTATS ----------
    const [language, setLanguage] = useState('');       // Langage sélectionné
    const [repo, setRepo]         = useState(null);     // Dépôt trouvé
    const [isLoading, setIsLoading] = useState(false);  // En cours de chargement
    const [error, setError]       = useState(null);     // Message d'erreur

    // ---------- FONCTION DE FETCH ----------
    async function fetchRandomRepo(lang) {
        setIsLoading(true);
        setError(null);
        setRepo(null);

        try {
            const url = `${GITHUB_API}?q=language:${encodeURIComponent(lang)}&sort=stars&order=desc&per_page=30`;
            const response = await fetch(url);

            // ---------- GESTION DES ERREURS HTTP ----------
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Rate limit reached. Please wait a minute and try again.');
                }
                if (response.status === 422) {
                    throw new Error('Invalid language query. Please select another language.');
                }
                throw new Error(`Failed to fetch repositories (HTTP ${response.status}).`);
            }

            const data = await response.json();

            // Aucun résultat → on considère ça comme une erreur
            if (!data.items || data.items.length === 0) {
                throw new Error('No repositories found for this language.');
            }

            // ---------- SÉLECTION ALÉATOIRE ----------
            const randomIndex = Math.floor(Math.random() * data.items.length);
            const randomRepo = data.items[randomIndex];

            setRepo(randomRepo);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    // ---------- FETCH AUTOMATIQUE AU CHANGEMENT DE LANGAGE ----------
    useEffect(() => {
        if (language) {
            fetchRandomRepo(language);
        } else {
            // Si on revient à "Select a Language" → on reset
            setRepo(null);
            setError(null);
        }
    }, [language]);

    // ---------- HANDLERS ----------
    function handleLanguageChange(e) {
        setLanguage(e.target.value);
    }

    function handleRefresh() {
        if (language) fetchRandomRepo(language);
    }

    function handleRetry() {
        if (language) fetchRandomRepo(language);
    }

    // ---------- RENDU ----------
    return (
        <main className="page">
            <header className="app-header">
                <h1>
                    <span className="app-icon" aria-hidden="true">📦</span>
                    GitHub Repository Finder
                </h1>
            </header>

            {/* Sélecteur de langage */}
            <div className="form-group">
                <label htmlFor="language-select" className="form-label">
                    Select a Language
                </label>
                <select
                    id="language-select"
                    className="form-select"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="">Select a Language</option>
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.label}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Zone de contenu : 4 états possibles */}
            <section className="content" aria-live="polite">

                {/* 1. EMPTY STATE : rien sélectionné */}
                {!language && !isLoading && !error && <EmptyState />}

                {/* 2. LOADING STATE */}
                {isLoading && <LoadingState />}

                {/* 3. ERROR STATE */}
                {!isLoading && error && (
                    <ErrorState message={error} onRetry={handleRetry} />
                )}

                {/* 4. SUCCESS STATE */}
                {!isLoading && !error && repo && (
                    <RepoCard repo={repo} onRefresh={handleRefresh} />
                )}

            </section>
        </main>
    );
}

export default App;