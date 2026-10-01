function StoryBar({ stories, onAddClick, onStoryClick, onStoryDelete }) {
    return (
        <nav className="story-bar" aria-label="Stories">

            {/* ---------- BOUTON "+" ---------- */}
            <button
                type="button"
                className="story-add"
                onClick={onAddClick}
                aria-label="Ajouter une story"
            >
                <span className="story-add-icon" aria-hidden="true">+</span>
            </button>

            {/* ---------- LISTE DES STORIES ---------- */}
            {stories.map((story) => (
                <div key={story.id} className="story-thumb-wrapper">
                    <button
                        type="button"
                        className="story-thumb"
                        onClick={() => onStoryClick(story.id)}
                        aria-label="Voir la story"
                    >
                        <img
                            src={story.image}
                            alt=""
                            className="story-thumb-img"
                        />
                    </button>

                    {/* Bouton supprimer au survol (optionnel) */}
                    <button
                        type="button"
                        className="story-delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onStoryDelete(story.id);
                        }}
                        aria-label="Supprimer cette story"
                    >
                        ×
                    </button>
                </div>
            ))}

        </nav>
    );
}

export default StoryBar;