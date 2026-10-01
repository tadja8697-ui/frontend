/* ============================================================
   1. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

const textarea   = document.getElementById('message');
const wrapper    = textarea.closest('.textarea-wrapper');
const currentEl  = document.getElementById('char-current');
const maxEl      = document.getElementById('char-max');


/* ============================================================
   2. LIRE LA CONFIGURATION
   ============================================================ */

// On lit la limite depuis l'attribut data-max-length de la textarea
// → pour changer la limite, on modifie seulement le HTML.
const MAX_LENGTH = parseInt(textarea.dataset.maxLength, 10) || 250;

// On affiche la limite dans le compteur
maxEl.textContent = MAX_LENGTH;


/* ============================================================
   3. FONCTION PRINCIPALE : MISE À JOUR DU COMPTEUR
   ============================================================ */

function updateCounter() {
    // ÉTAPE 1 : Récupérer le texte actuel
    let value = textarea.value;
    let length = value.length;

    // ÉTAPE 2 : Sécurité — bloquer si on dépasse la limite
    // (utile pour le copier-coller et l'autocomplétion)
    if (length > MAX_LENGTH) {
        textarea.value = value.slice(0, MAX_LENGTH);
        length = MAX_LENGTH;
    }

    // ÉTAPE 3 : Mettre à jour le compteur
    currentEl.textContent = length;

    // ÉTAPE 4 : Ajouter / retirer la classe "limite atteinte"
    if (length >= MAX_LENGTH) {
        wrapper.classList.add('is-limit-reached');
    } else {
        wrapper.classList.remove('is-limit-reached');
    }
}


/* ============================================================
   4. ÉCOUTER LA SAISIE UTILISATEUR
   ============================================================ */

// Événement "input" = à chaque modification (frappe, coller, etc.)
textarea.addEventListener('input', updateCounter);


/* ============================================================
   5. INITIALISATION
   ============================================================ */

// Au chargement, on met le compteur à jour
// (utile si le navigateur a restauré un ancien brouillon)
updateCounter();