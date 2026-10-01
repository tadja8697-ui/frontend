import { useState, useCallback } from 'react';
import { quizInfo, questions } from './questions.js';
import { useCountdown } from './useCountdown.js';
import StartScreen from './StartScreen.jsx';
import QuestionCard from './QuestionCard.jsx';
import ResultsScreen from './ResultsScreen.jsx';
import './style.css';

// Les 3 états possibles de l'app
const STATUS = {
    START: 'start',
    PLAYING: 'playing',
    FINISHED: 'finished',
};

function App() {
    // ============================================================
    // STATE (l'état global de l'app)
    // ============================================================
    const [status, setStatus]               = useState(STATUS.START);
    const [currentIndex, setCurrentIndex]   = useState(0);
    const [score, setScore]                 = useState(0);
    const [answers, setAnswers]             = useState([]);           // Historique
    const [selectedIndex, setSelectedIndex] = useState(null);         // Réponse actuelle

    const total   = questions.length;
    const current = questions[currentIndex];

    // ============================================================
    // TIMER (via custom hook)
    // ============================================================
    // Callback appelé quand le timer atteint 0
    const handleTimeout = useCallback(() => {
        // Si l'utilisateur n'a pas répondu → on compte comme raté
        if (selectedIndex === null) {
            answerQuestion(-1, true);   // -1 = "pas de réponse"
        }
    }, [selectedIndex]);

    const timeLeft = useCountdown(
        quizInfo.timePerQuestion,
        status === STATUS.PLAYING && selectedIndex === null,  // Timer seulement si en jeu ET pas répondu
        handleTimeout,
        currentIndex,                                          // Reset à chaque changement de question
    );

    // ============================================================
    // ACTIONS
    // ============================================================

    // Démarrer le quiz
    function startQuiz() {
        setStatus(STATUS.PLAYING);
        setCurrentIndex(0);
        setScore(0);
        setAnswers([]);
        setSelectedIndex(null);
    }

    // Enregistrer une réponse
    function answerQuestion(index, timedOut = false) {
        // index = -1 → "pas de réponse" (timeout)
        const isCorrect = index === current.correctIndex;

        // 1. Mettre à jour le score
        if (isCorrect) {
            setScore((s) => s + 1);
        }

        // 2. Enregistrer la réponse dans l'historique
        setAnswers((prev) => [
            ...prev,
            {
                question:      current.question,
                selectedText:  index === -1 ? 'No answer (timeout)' : current.options[index],
                correctText:   current.options[current.correctIndex],
                isCorrect,
                timedOut,
            },
        ]);

        // 3. Marquer qu'on a répondu (pour cette question)
        setSelectedIndex(index);
    }

    // Passer à la question suivante
    function nextQuestion() {
        if (currentIndex + 1 < total) {
            setCurrentIndex((i) => i + 1);
            setSelectedIndex(null);        // Reset pour la nouvelle question
        } else {
            setStatus(STATUS.FINISHED);
        }
    }

    // Recommencer
    function restartQuiz() {
        setStatus(STATUS.START);
        setCurrentIndex(0);
        setScore(0);
        setAnswers([]);
        setSelectedIndex(null);
    }

    // ============================================================
    // RENDU (selon le status)
    // ============================================================
    return (
        <main className="page">

            {status === STATUS.START && (
                <StartScreen
                    info={quizInfo}
                    totalQuestions={total}
                    onStart={startQuiz}
                />
            )}

            {status === STATUS.PLAYING && (
                <QuestionCard
                    question={current}
                    currentIndex={currentIndex}
                    total={total}
                    score={score}
                    timeLeft={timeLeft}
                    selectedIndex={selectedIndex}
                    onSelect={answerQuestion}
                    onNext={nextQuestion}
                />
            )}

            {status === STATUS.FINISHED && (
                <ResultsScreen
                    answers={answers}
                    score={score}
                    total={total}
                    onRestart={restartQuiz}
                />
            )}

        </main>
    );
}

export default App;