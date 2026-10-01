import { useState, useEffect, useRef } from 'react';
import { STORY_DURATION_MS, SWIPE_THRESHOLD } from './constants.js';

function StoryViewer({ stories, initialIndex, onClose, onDelete }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const touchStartXRef = useRef(null);
    const currentStory = stories[currentIndex];

    // ---------- PROGRESSION (3 secondes) ----------
    useEffect(() => {
        // Reset la progression à chaque changement de story
        setProgress(0);

        const startTime = Date.now();

        // setInterval pour animer la progress bar
        const id = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min((elapsed / STORY_DURATION_MS) * 100, 100);
            setProgress(pct);
        }, 50);

        // Timeout pour passer à la suivante
        const timeoutId = setTimeout(() => {
            goNext();
        }, STORY_DURATION_MS);

        return () => {
            clearInterval(id);
            clearTimeout(timeoutId);
        };
    }, [currentIndex]);

    // ---------- NAVIGATION ----------

    function goNext() {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    }

    function goPrevious() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            // Première story → recommence
            setProgress(0);
        }
    }

    // ---------- KEYBOARD ----------
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape')     onClose();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft')  goPrevious();
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, stories.length]);

    // ---------- SWIPE ----------
    function handleTouchStart(e) {
        touchStartXRef.current = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        if (touchStartXRef.current === null) return;

        const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
        touchStartXRef.current = null;

        if (deltaX < -SWIPE_THRESHOLD) goNext();
        if (deltaX >  SWIPE_THRESHOLD) goPrevious();
    }

    // ---------- RENDU ----------
    if (!currentStory) return null;

    return (
        <div
            className="story-viewer"
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse de story"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* ---------- PROGRESS BARS (une par story) ---------- */}
            <div className="story-progress" aria-hidden="true">
                {stories.map((story, index) => {
                    let width = 0;
                    if (index < currentIndex) width = 100;
                    if (index === currentIndex) width = progress;

                    return (
                        <div key={story.id} className="story-progress-segment">
                            <div
                                className="story-progress-fill"
                                style={{ width: `${width}%` }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* ---------- BOUTON FERMER ---------- */}
            <button
                type="button"
                className="story-close"
                onClick={onClose}
                aria-label="Fermer"
            >
                ×
            </button>

            {/* ---------- IMAGE ---------- */}
            <div className="story-image-wrapper">
                <img
                    src={currentStory.image}
                    alt=""
                    className="story-image"
                />
            </div>

            {/* ---------- ZONES DE CLIC (gauche/droite) ---------- */}
            <button
                type="button"
                className="story-nav story-nav--prev"
                onClick={goPrevious}
                aria-label="Story précédente"
            />
            <button
                type="button"
                className="story-nav story-nav--next"
                onClick={goNext}
                aria-label="Story suivante"
            />

            {/* ---------- INFO ---------- */}
            <div className="story-info">
                <p className="story-time">
                    Publiée à {new Date(currentStory.createdAt).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>

        </div>
    );
}

export default StoryViewer;