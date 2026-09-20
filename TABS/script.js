/* ============================================================
   1. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

// On récupère TOUS les onglets (boutons)
const tabs = document.querySelectorAll('.tab');

// On récupère TOUS les panneaux de contenu
const panels = document.querySelectorAll('.tab-panel');


/* ============================================================
   2. FONCTION POUR ACTIVER UN ONGLET
   ============================================================ */

function activateTab(clickedTab) {
    // ÉTAPE 1 : Désactiver TOUS les onglets
    tabs.forEach(function (tab) {
        tab.classList.remove('is-active');
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
    });

    // ÉTAPE 2 : Cacher TOUS les panneaux
    panels.forEach(function (panel) {
        panel.classList.remove('is-active');
        panel.setAttribute('hidden', '');
    });

    // ÉTAPE 3 : Activer l'onglet cliqué
    clickedTab.classList.add('is-active');
    clickedTab.setAttribute('aria-selected', 'true');
    clickedTab.setAttribute('tabindex', '0');

    // ÉTAPE 4 : Afficher le panneau correspondant
    // On lit l'attribut data-tab pour trouver l'ID du panneau
    const targetId = clickedTab.dataset.tab;
    const targetPanel = document.getElementById(targetId);

    if (targetPanel) {
        targetPanel.classList.add('is-active');
        targetPanel.removeAttribute('hidden');
    }
}


/* ============================================================
   3. ÉCOUTER LES CLICS SUR CHAQUE ONGLET
   ============================================================ */

tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
        activateTab(tab);
    });
});


/* ============================================================
   4. NAVIGATION AU CLAVIER (bonus accessibilité)
   ============================================================ */

tabs.forEach(function (tab, index) {
    tab.addEventListener('keydown', function (event) {
        // Flèche droite → onglet suivant
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextIndex = (index + 1) % tabs.length;
            tabs[nextIndex].focus();
            activateTab(tabs[nextIndex]);
        }

        // Flèche gauche → onglet précédent
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevIndex = (index - 1 + tabs.length) % tabs.length;
            tabs[prevIndex].focus();
            activateTab(tabs[prevIndex]);
        }
    });
});