function QuestionCard({
    question,
    currentIndex,
    total,
    score,
    timeLeft,
    selectedIndex,
    onSelect,
    onNext,
}) {
    // Est-ce que l'utilisateur a déjà répondu à CETTE question ?
    const hasAnswered = selectedIndex !== null;

    // Helper : la classe CSS d'un bouton d'option selon l'état
    function getOptionClass(index) {
        // Pas encore répondu → classe neutre
        if (!hasAnswered) return 'option-btn';

        // Réponse correcte → toujours vert
        if (index === question.correctIndex) {
            return 'option-btn is-correct';
        }

        // Réponse choisie mais fausse → rouge
        if (index === selectedIndex) {
            return 'option-btn is-wrong';
        }

        // Les autres → estompées
        return 'option-btn is-dimmed';
    }

    // Est-ce que la réponse donnée est correcte ?
    const isCorrect = selectedIndex === question.correctIndex;

    return (
        <div className="question-card">

            {/* ========== EN-TÊTE : progression + score + timer ========== */}
            <header className="question-header">
                <p className="question-progress">
                    Question {currentIndex + 1} / {total}
                </p>

                <div className="question-meta">
                    <span className="question-score">
                        Score: {score}
                    </span>

                    {timeLeft > 0 && (
                        <span
                            className={`question-timer ${timeLeft <= 10 ? 'is-urgent' : ''}`}
                            aria-live="polite"
                        >
                            ⏱ {timeLeft}s
                        </span>
                    )}
                </div>
            </header>

            {/* ========== QUESTION ========== */}
            <h2 className="question-text">
                {question.question}
            </h2>

            {/* ========== OPTIONS ========== */}
            <ul className="options-list">
                {question.options.map((option, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            className={getOptionClass(index)}
                            onClick={() => onSelect(index)}
                            disabled={hasAnswered}
                        >
                            <span className="option-letter">
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="option-text">{option}</span>
                        </button>
                    </li>
                ))}
            </ul>

            {/* ========== FEEDBACK ========== */}
            {hasAnswered && (
                <div
                    className={`feedback ${isCorrect ? 'feedback--correct' : 'feedback--wrong'}`}
                    role="status"
                >
                    {isCorrect ? (
                        <p>✓ Correct!</p>
                    ) : (
                        <p>
                            ✗ Wrong. The correct answer was{' '}
                            <strong>
                                {String.fromCharCode(65 + question.correctIndex)}.{' '}
                                {question.options[question.correctIndex]}
                            </strong>
                        </p>
                    )}
                </div>
            )}

            {/* ========== BOUTON SUIVANT ========== */}
            {hasAnswered && (
                <button
                    type="button"
                    className="primary-btn"
                    onClick={onNext}
                >
                    {currentIndex + 1 < total ? 'Next question' : 'See results'}
                </button>
            )}
        </div>
    );
}

export default QuestionCard;