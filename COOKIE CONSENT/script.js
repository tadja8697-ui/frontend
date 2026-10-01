/* ============================================================
   1. CONFIGURATION
   ============================================================ */

// Nom de la clé dans localStorage
// ⚠️ On préfixe toujours pour éviter les conflits avec d'autres scripts
const STORAGE_KEY = 'cookie-consent';
const STORAGE_VALUE = 'accepted';


/* ============================================================
   2. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

const banner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('cookie-accept');
const closeBtn = document.getElementById('cookie-close');


/* ============================================================
   3. FONCTIONS UTILITAIRES
   ============================================================ */

/**
 * Vérifie si l'utilisateur a déjà accepté les cookies.
 * @returns {boolean}
 */
function hasConsent() {
    return localStorage.getItem(STORAGE_KEY) === STORAGE_VALUE;
}

/**
 * Enregistre le consentement dans localStorage.
 */
function saveConsent() {
    try {
        localStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
    } catch (e) {
        // localStorage peut être bloqué (navigation privée stricte, cookies désactivés...)
        console.warn('Impossible d\'enregistrer le consentement :', e);
    }
}

/**
 * Affiche la bannière avec une petite animation.
 */
function showBanner() {
    banner.hidden = false;

    // requestAnimationFrame pour laisser le navigateur peindre "hidden = false"
    // PUIS ajouter la classe → l'animation se déclenche correctement.
    requestAnimationFrame(function () {
        banner.classList.add('is-visible');
    });
}

/**
 * Cache la bannière avec une animation, puis la retire du DOM visuel.
 */
function hideBanner() {
    banner.classList.remove('is-visible');

    // On attend la fin de la transition (300ms) avant de mettre hidden
    setTimeout(function () {
        banner.hidden = true;
    }, 300);
}


/* ============================================================
   4. INITIALISATION AU CHARGEMENT DE LA PAGE
   ============================================================ */

function init() {
    if (hasConsent()) {
        // L'utilisateur a déjà accepté → on ne montre rien
        return;
    }

    // Sinon → on affiche la bannière
    showBanner();
}


/* ============================================================
   5. GESTION DES ÉVÉNEMENTS
   ============================================================ */

// Clic sur "I like Cookies" → on enregistre et on cache
acceptBtn.addEventListener('click', function () {
    saveConsent();
    hideBanner();
});

// Clic sur "×" → on cache SANS enregistrer
// (l'utilisateur n'a pas donné son consentement, la bannière reviendra)
closeBtn.addEventListener('click', function () {
    hideBanner();
});


/* ============================================================
   6. DÉMARRAGE
   ============================================================ */

// ⚠️ Comme le <script> est à la fin du <body>,
// le DOM est déjà prêt → on peut appeler init() directement.
init();