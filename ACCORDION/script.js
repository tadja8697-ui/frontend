/* ============================================================
   1. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

const items    = document.querySelectorAll('.accordion-item');
const triggers = document.querySelectorAll('.accordion-trigger');


/* ============================================================
   2. FONCTION POUR FERMER TOUS LES ITEMS
   ============================================================ */

function closeAllItems() {
    items.forEach(function (item) {
        item.classList.remove('is-open');

        // Mettre à jour l'accessibilité
        const trigger = item.querySelector('.accordion-trigger');
        trigger.setAttribute('aria-expanded', 'false');
    });
}


/* ============================================================
   3. FONCTION POUR OUVRIR UN ITEM
   ============================================================ */

function openItem(item) {
    item.classList.add('is-open');

    const trigger = item.querySelector('.accordion-trigger');
    trigger.setAttribute('aria-expanded', 'true');
}


/* ============================================================
   4. GESTION DU CLIC SUR CHAQUE QUESTION
   ============================================================ */

triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
        // On remonte au parent (.accordion-item)
        const item = trigger.closest('.accordion-item');

        // Est-ce que cet item est déjà ouvert ?
        const isOpen = item.classList.contains('is-open');

        // 1. On ferme TOUJOURS tout le monde
        closeAllItems();

        // 2. Si l'item n'était PAS ouvert, on l'ouvre
        // (sinon → il se ferme, comportement "toggle")
        if (!isOpen) {
            openItem(item);
        }
    });
});


/* ============================================================
   5. NAVIGATION CLAVIER (bonus accessibilité)
   ============================================================ */

triggers.forEach(function (trigger) {
    trigger.addEventListener('keydown', function (event) {
        const item = trigger.closest('.accordion-item');
        const index = Array.from(items).indexOf(item);

        let targetIndex = null;

        // Flèche bas → item suivant
        if (event.key === 'ArrowDown') {
            targetIndex = (index + 1) % items.length;
        }
        // Flèche haut → item précédent
        else if (event.key === 'ArrowUp') {
            targetIndex = (index - 1 + items.length) % items.length;
        }
        // Home → premier item
        else if (event.key === 'Home') {
            targetIndex = 0;
        }
        // End → dernier item
        else if (event.key === 'End') {
            targetIndex = items.length - 1;
        }

        if (targetIndex !== null) {
            event.preventDefault();
            const targetTrigger = items[targetIndex].querySelector('.accordion-trigger');
            targetTrigger.focus();
        }
    });
});