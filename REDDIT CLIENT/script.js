/* ============================================================
   1. CONFIGURATION & CONSTANTES
   ============================================================ */

// On utilise allorigins.win pour contourner le CORS de Reddit
// ⚠️ En production, il faudrait un backend proxy
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const REDDIT_API  = 'https://www.reddit.com/r';

// Clé localStorage
const STORAGE_KEY = 'reddit-client-lanes';

// Lanes par défaut (si rien dans localStorage)
const DEFAULT_SUBREDDITS = ['learnprogramming', 'javascript'];


/* ============================================================
   2. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

const lanesContainer = document.getElementById('lanes-container');
const addBtn         = document.getElementById('add-btn');
const modalOverlay   = document.getElementById('modal-overlay');
const addForm        = document.getElementById('add-form');
const subredditInput = document.getElementById('subreddit-input');
const modalError     = document.getElementById('modal-error');
const modalSubmit    = document.getElementById('modal-submit');
const contextMenu    = document.getElementById('context-menu');


/* ============================================================
   3. STATE
   ============================================================ */

/**
 * State principal : tableau de lanes.
 * Chaque lane :
 * {
 *   id: string,          // identifiant unique
 *   subreddit: string,   // nom du subreddit (sans r/)
 *   posts: [],           // tableau de posts
 *   isLoading: boolean,
 *   error: string|null
 * }
 */
let lanes = [];

// Menu contextuel actif
let activeContextMenu = { laneId: null };


/* ============================================================
   4. UTILITAIRES
   ============================================================ */

/**
 * Génère un identifiant unique.
 */
function generateId() {
    return 'lane-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
}

/**
 * Récupère les subreddits sauvegardés dans localStorage.
 * @returns {string[]}
 */
function loadSavedSubreddits() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_SUBREDDITS;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : DEFAULT_SUBREDDITS;
    } catch (e) {
        console.warn('Impossible de lire localStorage :', e);
        return DEFAULT_SUBREDDITS;
    }
}

/**
 * Sauvegarde la liste des subreddits dans localStorage.
 */
function saveSubreddits() {
    try {
        const names = lanes.map((lane) => lane.subreddit);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
    } catch (e) {
        console.warn('Impossible d\'écrire dans localStorage :', e);
    }
}

/**
 * Récupère les posts d'un subreddit via l'API Reddit.
 * @param {string} subreddit
 * @returns {Promise<Array>} Liste de posts normalisés
 */
async function fetchPosts(subreddit) {
    const url = `${CORS_PROXY}${encodeURIComponent(`${REDDIT_API}/${subreddit}.json?limit=20`)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status} — Impossible de charger r/${subreddit}.`);
    }

    const data = await response.json();

    // Reddit renvoie { data: { children: [...] } }
    if (!data?.data?.children) {
        throw new Error(`Subreddit r/${subreddit} introuvable ou vide.`);
    }

    // Normalisation des posts
    return data.data.children.map((child) => ({
        id: child.data.id,
        title: child.data.title,
        author: child.data.author,
        score: child.data.score,
        permalink: `https://www.reddit.com${child.data.permalink}`,
    }));
}


/* ============================================================
   5. RENDU
   ============================================================ */

/**
 * Reconstruit entièrement l'interface à partir du state `lanes`.
 */
function render() {
    // 1. Vider le conteneur
    lanesContainer.innerHTML = '';

    // 2. Créer une lane pour chaque élément de `lanes`
    lanes.forEach((lane) => {
        lanesContainer.appendChild(createLaneElement(lane));
    });
}

/**
 * Crée le DOM d'une lane complète.
 * @param {object} lane
 * @returns {HTMLElement}
 */
function createLaneElement(lane) {
    const laneEl = document.createElement('article');
    laneEl.className = 'lane';
    laneEl.dataset.id = lane.id;

    // ---------- HEADER ----------
    const header = document.createElement('header');
    header.className = 'lane-header';

    const title = document.createElement('h2');
    title.className = 'lane-title';
    title.textContent = `/r/${lane.subreddit}`;

    const menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'lane-menu-btn';
    menuBtn.setAttribute('aria-label', `Menu pour r/${lane.subreddit}`);
    menuBtn.innerHTML = '⋮';
    menuBtn.dataset.action = 'open-menu';

    header.appendChild(title);
    header.appendChild(menuBtn);

    // ---------- CONTENU ----------
    const content = document.createElement('div');
    content.className = 'lane-content';

    if (lane.isLoading) {
        content.appendChild(createLoadingState());
    } else if (lane.error) {
        content.appendChild(createErrorState(lane.error));
    } else if (lane.posts.length === 0) {
        content.appendChild(createEmptyState());
    } else {
        lane.posts.forEach((post) => {
            content.appendChild(createPostElement(post));
        });
    }

    laneEl.appendChild(header);
    laneEl.appendChild(content);

    return laneEl;
}

function createLoadingState() {
    const div = document.createElement('div');
    div.className = 'lane-state lane-state--loading';
    div.innerHTML = `<div class="spinner"></div><p>Loading posts...</p>`;
    return div;
}

function createErrorState(message) {
    const div = document.createElement('div');
    div.className = 'lane-state lane-state--error';
    div.textContent = `⚠️ ${message}`;
    return div;
}

function createEmptyState() {
    const div = document.createElement('div');
    div.className = 'lane-state lane-state--empty';
    div.textContent = 'No posts found.';
    return div;
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post';

    const score = document.createElement('p');
    score.className = 'post-score';
    score.textContent = post.score;

    const title = document.createElement('h3');
    title.className = 'post-title';

    const link = document.createElement('a');
    link.href = post.permalink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = post.title;

    title.appendChild(link);

    article.appendChild(score);
    article.appendChild(title);

    return article;
}


/* ============================================================
   6. ACTIONS
   ============================================================ */

/**
 * Ajoute une nouvelle lane (vérifie l'existence du subreddit).
 * @param {string} subreddit
 */
async function addLane(subreddit) {
    const clean = subreddit.trim().replace(/^r\//, '').toLowerCase();
    if (!clean) return;

    // Vérification : déjà présent ?
    if (lanes.some((l) => l.subreddit.toLowerCase() === clean)) {
        showModalError(`r/${clean} est déjà affiché.`);
        return;
    }

    // Vérification : le subreddit existe ?
    setModalLoading(true);

    try {
        const posts = await fetchPosts(clean);

        // Créer et ajouter la lane
        const newLane = {
            id: generateId(),
            subreddit: clean,
            posts,
            isLoading: false,
            error: null,
        };

        lanes.push(newLane);
        saveSubreddits();
        render();
        closeModal();
    } catch (err) {
        showModalError(err.message);
    } finally {
        setModalLoading(false);
    }
}

/**
 * Recharge les posts d'une lane.
 * @param {string} laneId
 */
async function refreshLane(laneId) {
    const lane = lanes.find((l) => l.id === laneId);
    if (!lane) return;

    lane.isLoading = true;
    lane.error = null;
    render();

    try {
        lane.posts = await fetchPosts(lane.subreddit);
    } catch (err) {
        lane.error = err.message;
    } finally {
        lane.isLoading = false;
        render();
    }
}

/**
 * Supprime une lane.
 * @param {string} laneId
 */
function deleteLane(laneId) {
    lanes = lanes.filter((l) => l.id !== laneId);
    saveSubreddits();
    render();
}


/* ============================================================
   7. MODALE
   ============================================================ */

function openModal() {
    modalOverlay.hidden = false;
    modalError.hidden = true;
    modalError.textContent = '';
    subredditInput.value = '';
    setTimeout(() => subredditInput.focus(), 50);
}

function closeModal() {
    modalOverlay.hidden = true;
    modalError.hidden = true;
    modalError.textContent = '';
}

function showModalError(message) {
    modalError.textContent = message;
    modalError.hidden = false;
}

function setModalLoading(isLoading) {
    modalSubmit.disabled = isLoading;
    modalSubmit.textContent = isLoading ? 'Checking...' : 'Add Subreddit';
}


/* ============================================================
   8. MENU CONTEXTUEL
   ============================================================ */

function openContextMenu(laneId, x, y) {
    activeContextMenu.laneId = laneId;

    // Positionner le menu (avec un décalage pour éviter les bords)
    const menuWidth = 140;
    const menuHeight = 80;
    const padding = 8;

    const posX = Math.min(x, window.innerWidth - menuWidth - padding);
    const posY = Math.min(y, window.innerHeight - menuHeight - padding);

    contextMenu.style.left = `${posX}px`;
    contextMenu.style.top = `${posY}px`;
    contextMenu.hidden = false;
}

function closeContextMenu() {
    contextMenu.hidden = true;
    activeContextMenu.laneId = null;
}


/* ============================================================
   9. ÉVÉNEMENTS
   ============================================================ */

// ---------- Bouton "+" → ouvre la modale ----------
addBtn.addEventListener('click', openModal);

// ---------- Soumission du formulaire d'ajout ----------
addForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addLane(subredditInput.value);
});

// ---------- Fermeture de la modale au clic sur l'overlay ----------
modalOverlay.addEventListener('click', function (event) {
    if (event.target === modalOverlay) closeModal();
});

// ---------- Échap ferme la modale et le menu ----------
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        if (!modalOverlay.hidden) closeModal();
        if (!contextMenu.hidden) closeContextMenu();
    }
});

// ---------- Clic dans le conteneur des lanes (délégation) ----------
lanesContainer.addEventListener('click', function (event) {
    // 1. Bouton menu (⋮)
    const menuBtn = event.target.closest('[data-action="open-menu"]');
    if (menuBtn) {
        event.stopPropagation();
        const laneEl = menuBtn.closest('.lane');
        const rect = menuBtn.getBoundingClientRect();
        openContextMenu(laneEl.dataset.id, rect.left, rect.bottom + 4);
        return;
    }
});

// ---------- Clic dans le menu contextuel (délégation) ----------
contextMenu.addEventListener('click', function (event) {
    const item = event.target.closest('.context-item');
    if (!item) return;

    const action = item.dataset.action;
    const laneId = activeContextMenu.laneId;

    closeContextMenu();

    if (!laneId) return;

    if (action === 'refresh') refreshLane(laneId);
    if (action === 'delete')  deleteLane(laneId);
});

// ---------- Clic ailleurs → ferme le menu contextuel ----------
document.addEventListener('click', function (event) {
    if (contextMenu.hidden) return;
    if (!contextMenu.contains(event.target)) {
        closeContextMenu();
    }
});

// ---------- Fermer le menu au scroll ----------
window.addEventListener('scroll', closeContextMenu, true);


/* ============================================================
   10. INITIALISATION
   ============================================================ */

/**
 * Charge les lanes sauvegardées et fetch leurs posts.
 */
async function init() {
    const savedSubreddits = loadSavedSubreddits();

    // Créer une lane "vide" pour chaque subreddit sauvegardé
    lanes = savedSubreddits.map((sub) => ({
        id: generateId(),
        subreddit: sub,
        posts: [],
        isLoading: true,
        error: null,
    }));

    render();

    // Fetch les posts en parallèle (pas en série !)
    await Promise.all(lanes.map((lane) => refreshLane(lane.id)));
}

init();