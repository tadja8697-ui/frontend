function FlashCard({
    question,
    answer,
    showAnswer,
    onToggle,
    onPrevious,
    onNext,
    canGoPrevious,
    canGoNext,
}) {
    return (
        <div className="flashcard">
            {/* Corps de la carte : question OU réponse selon l'état */}
            <div className="flashcard-body">
                <p className="flashcard-text">
                    {showAnswer ? answer : question}
                </p>
            </div>

            {/* Pied de carte : navigation + toggle */}
            <footer className="flashcard-footer">
                <button
                    type="button"
                    className="nav-btn"
                    onClick={onPrevious}
                    disabled={!canGoPrevious}
                >
                    ‹ Previous
                </button>

                <button
                    type="button"
                    className="toggle-btn"
                    onClick={onToggle}
                >
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </button>

                <button
                    type="button"
                    className="nav-btn"
                    onClick={onNext}
                    disabled={!canGoNext}
                >
                    Next ›
                </button>
            </footer>
        </div>
    );
}

export default FlashCard;