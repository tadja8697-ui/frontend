function ResultsScreen({ answers, score, total, onRestart }) {
    const percentage = Math.round((score / total) * 100);

    // Message selon le score
    let message = 'Keep practicing!';
    if (percentage >= 80) message = 'Excellent work! 🎉';
    else if (percentage >= 60) message = 'Good job! 👍';
    else if (percentage >= 40) message = 'Not bad, keep going.';

    return (
        <div className="results-screen">

            <header className="results-header">
                <h1>Quiz complete!</h1>
                <p className="results-message">{message}</p>
            </header>

            <div className="results-score">
                <p className="score-big">
                    {score} / {total}
                </p>
                <p className="score-percentage">{percentage}%</p>
            </div>

            {/* ========== DÉTAIL DES RÉPONSES ========== */}
            <section>
                <h2 className="results-subtitle">Your answers</h2>

                <ol className="results-list">
                    {answers.map((answer, index) => (
                        <li
                            key={index}
                            className={`results-item ${answer.isCorrect ? 'is-correct' : 'is-wrong'}`}
                        >
                            <span className="results-icon">
                                {answer.isCorrect ? '✓' : '✗'}
                            </span>

                            <div className="results-content">
                                <p className="results-question">
                                    {answer.question}
                                </p>

                                <p className="results-details">
                                    Your answer: {answer.selectedText}
                                </p>

                                {!answer.isCorrect && (
                                    <p className="results-details">
                                        Correct answer:{' '}
                                        <strong>{answer.correctText}</strong>
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <button
                type="button"
                className="primary-btn"
                onClick={onRestart}
            >
                Restart quiz
            </button>
        </div>
    );
}

export default ResultsScreen;