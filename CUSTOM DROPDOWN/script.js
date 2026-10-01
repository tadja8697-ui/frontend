/* ============================================================
   1. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

const dropdown  = document.getElementById('dropdown');
const trigger   = document.getElementById('dropdown-trigger');
const label     = document.getElementById('dropdown-label');
const menu      = document.getElementById('dropdown-menu');
const items     = Array.from(menu.querySelectorAll('.dropdown-item'));


/* ============================================================
   2. CONSTANTES
   ============================================================ */

const PLACEHOLDER_TEXT = 'Select an Item';


/* ============================================================
   3. STATE
   ============================================================ */

let isOpen        = false;   // Menu ouvert ou fermé
let selectedIndex = -1;      // Index de l'item sélectionné (-1 = aucun)
let focusedIndex  = -1;      // Index de l'item actuellement "focus" (navigation clavier)


/* ============================================================
   4. ACTIONS
   ============================================================ */

/**
 * Ouvre le menu.
 */
function openMenu() {
    isOpen = true;
    dropdown.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');

    // Si un item est sélectionné, on met le focus dessus
    focusedIndex = selectedIndex >= 0 ? selectedIndex : 0;
    updateFocusedItem();
}

/**
 * Ferme le menu.
 */
function closeMenu() {
    isOpen = false;
    dropdown.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');

    // On retire le focus visuel de tous les items
    focusedIndex = -1;
    updateFocusedItem();
}

/**
 * Bascule (toggle) l'état du menu.
 */
function toggleMenu() {
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

/**
 * Sélectionne un item par son index.
 * @param {number} index
 */
function selectItem(index) {
    if (index < 0 || index >= items.length) return;

    // 1. Retirer la classe "selected" de l'ancien item
    items.forEach((item) => {
        item.classList.remove('is-selected');
        item.setAttribute('aria-selected', 'false');
    });

    // 2. Ajouter la classe "selected" au nouvel item
    const selectedItem = items[index];
    selectedItem.classList.add('is-selected');
    selectedItem.setAttribute('aria-selected', 'true');

    // 3. Mettre à jour le label affiché sur le trigger
    label.textContent = selectedItem.textContent.trim();

    // 4. Mettre à jour le state
    selectedIndex = index;

    // 5. Fermer le menu et rendre le focus au trigger
    closeMenu();
    trigger.focus();
}

/**
 * Met à jour l'item "focus" (navigation clavier).
 */
function updateFocusedItem() {
    items.forEach((item, i) => {
        if (i === focusedIndex) {
            item.classList.add('is-focused');
        } else {
            item.classList.remove('is-focused');
        }
    });
}

/**
 * Déplace le focus clavier dans la liste.
 * @param {number} direction -1 (haut) ou +1 (bas)
 */
function moveFocus(direction) {
    if (!isOpen) return;

    // Modulo pour boucler : après le dernier → premier, avant le premier → dernier
    focusedIndex = (focusedIndex + direction + items.length) % items.length;
    updateFocusedItem();
}


/* ============================================================
   5. ÉVÉNEMENTS
   ============================================================ */

// ---------- Clic sur le trigger ----------
trigger.addEventListener('click', function (event) {
    event.stopPropagation();   // Empêche le clic de remonter au document
    toggleMenu();
});

// ---------- Clic sur un item ----------
items.forEach(function (item, index) {
    item.addEventListener('click', function (event) {
        event.stopPropagation();   // Empêche la fermeture immédiate
        selectItem(index);
    });

    // Survol souris → mettre à jour le "focus" pour l'accessibilité
    item.addEventListener('mouseenter', function () {
        focusedIndex = index;
        updateFocusedItem();
    });
});

// ---------- Clic en dehors du dropdown → fermer ----------
document.addEventListener('click', function (event) {
    // Si le clic est EN DEHORS du dropdown → fermer
    if (!dropdown.contains(event.target)) {
        if (isOpen) closeMenu();
    }
});

// ---------- Navigation clavier ----------
trigger.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
            event.preventDefault();
            if (!isOpen) {
                openMenu();
            } else {
                moveFocus(1);
            }
            break;

        case 'ArrowUp':
            event.preventDefault();
            if (!isOpen) {
                openMenu();
            } else {
                moveFocus(-1);
            }
            break;

        case 'Escape':
            if (isOpen) {
                event.preventDefault();
                closeMenu();
            }
            break;
    }
});

// ---------- Navigation clavier quand un item a le focus ----------
menu.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            moveFocus(1);
            break;

        case 'ArrowUp':
            event.preventDefault();
            moveFocus(-1);
            break;

        case 'Enter':
        case ' ':
            event.preventDefault();
            if (focusedIndex >= 0) {
                selectItem(focusedIndex);
            }
            break;

        case 'Escape':
            event.preventDefault();
            closeMenu();
            trigger.focus();   // Rendre le focus au trigger
            break;

        case 'Home':
            event.preventDefault();
            focusedIndex = 0;
            updateFocusedItem();
            break;

        case 'End':
            event.preventDefault();
            focusedIndex = items.length - 1;
            updateFocusedItem();
            break;
    }
});