import { useState } from 'react';
import { flashcards } from './flashcards.js';
import FlashCard from './FlashCard.jsx';
import ProgressBar from './ProgressBar.jsx';
import './style.css';

function App() {
    // ---------- ÉTAT (STATE) ----------
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    // ---------- DONNÉES DÉRIVÉES ----------
    const total   = flashcards.length;
    const current = flashcards[currentIndex];

    // ---------- ACTIONS ----------
    function goNext() {
        if (currentIndex < total - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);        // On cache la réponse à chaque changement
        }
    }

    function goPrevious() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowAnswer(false);
        }
    }

    function toggleAnswer() {
        setShowAnswer(!showAnswer);
    }

    // ---------- RENDU ----------
    return (
        <main className="page">
            <h1>Flash Cards</h1>

            <ProgressBar current={currentIndex + 1} total={total} />

            <FlashCard
                question={current.question}
                answer={current.answer}
                showAnswer={showAnswer}
                onToggle={toggleAnswer}
                onPrevious={goPrevious}
                onNext={goNext}
                canGoPrevious={currentIndex > 0}
                canGoNext={currentIndex < total - 1}
            />
        </main>
    );
}

export default App;