function StartScreen({ info, totalQuestions, onStart }) {
    return (
        <div className="start-screen">
            <header className="start-header">
                <h1>Quiz: {info.title}</h1>
                <p>{info.description}</p>
            </header>

            <ul className="start-details">
                <li>{totalQuestions} questions</li>
                {info.timePerQuestion > 0 && (
                    <li>{info.timePerQuestion} seconds per question</li>
                )}
                <li>Immediate feedback after each answer</li>
            </ul>

            <button
                type="button"
                className="primary-btn"
                onClick={onStart}
            >
                Start Quiz
            </button>
        </div>
    );
}

export default StartScreen;