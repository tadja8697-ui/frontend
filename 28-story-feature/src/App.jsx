import { useState, useRef } from 'react';
import { useStories } from './useStories.js';
import { processImage } from './utils/imageUtils.js';
import StoryBar from './StoryBar.jsx';
import StoryViewer from './StoryViewer.jsx';
import './index.css';

function App() {
    const { stories, error, addStory, deleteStory } = useStories();
    const [viewerIndex, setViewerIndex] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef(null);

    // ---------- AJOUT D'UNE STORY ----------
    async function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);

        try {
            const imageDataURL = await processImage(file);
            addStory(imageDataURL);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsProcessing(false);
            // Reset l'input pour permettre de re-uploader le même fichier
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    }

    function handleAddClick() {
        fileInputRef.current?.click();
    }

    // ---------- OUVERTURE / FERMETURE DU VIEWER ----------
    function handleStoryClick(id) {
        const index = stories.findIndex((s) => s.id === id);
        if (index !== -1) setViewerIndex(index);
    }

    function handleCloseViewer() {
        setViewerIndex(null);
    }

    // ---------- RENDU ----------
    return (
        <main className="app">

            <header className="app-header">
                <h1>📸 Stories</h1>
            </header>

            {/* Input file caché, déclenché par le bouton + */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
            />

            <StoryBar
                stories={stories}
                onAddClick={handleAddClick}
                onStoryClick={handleStoryClick}
                onStoryDelete={deleteStory}
            />

            {/* Message si stockage plein */}
            {error && (
                <p className="app-error" role="alert">{error}</p>
            )}

            {/* Indicateur de traitement d'image */}
            {isProcessing && (
                <p className="app-processing" role="status">
                    Traitement de l'image...
                </p>
            )}

            {/* Message quand aucune story */}
            {stories.length === 0 && !isProcessing && (
                <section className="app-empty">
                    <p>Aucune story pour le moment.</p>
                    <p>Cliquez sur <strong>+</strong> pour en ajouter une !</p>
                </section>
            )}

            {/* Visionneuse */}
            {viewerIndex !== null && stories.length > 0 && (
                <StoryViewer
                    stories={stories}
                    initialIndex={viewerIndex}
                    onClose={handleCloseViewer}
                    onDelete={deleteStory}
                />
            )}

        </main>
    );
}

export default App;