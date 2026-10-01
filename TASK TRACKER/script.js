/* ============================================================
   1. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

const form  = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list  = document.getElementById('task-list');


/* ============================================================
   2. STATE (le tableau de tâches)
   ============================================================ */

/**
 * Chaque tâche a la structure :
 * { id: number, description: string, completed: boolean }
 */
let tasks = [
    { id: Date.now() + 1, description: 'New task is created and added to the list', completed: false },
    { id: Date.now() + 2, description: 'Clicking the checkbox toggles the completeness', completed: false },
    { id: Date.now() + 3, description: 'Delete button will delete the task from the list', completed: false },
    { id: Date.now() + 4, description: 'Complete tasks show at the end with strikethrough', completed: true },
    { id: Date.now() + 5, description: 'Marking incomplete will put it back in pending list', completed: true },
];


/* ============================================================
   3. FONCTION DE RENDU (le cœur du pattern)
   ============================================================ */

/**
 * Vide la liste et la reconstruit à partir du tableau `tasks`.
 * C'est LA fonction centrale : à appeler après CHAQUE modification.
 */
function renderTasks() {
    // 1. Vider le DOM
    list.innerHTML = '';

    // 2. Trier : non complétées en premier, complétées à la fin
    //    On trie une COPIE pour ne pas réordonner le tableau original
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

    // 3. Créer et insérer un <li> pour chaque tâche
    sortedTasks.forEach((task) => {
        const li = createTaskElement(task);
        list.appendChild(li);
    });
}


/* ============================================================
   4. CRÉATION D'UN ÉLÉMENT TÂCHE
   ============================================================ */

/**
 * Crée l'élément <li> correspondant à une tâche.
 * @param {{id: number, description: string, completed: boolean}} task
 * @returns {HTMLLIElement}
 */
function createTaskElement(task) {
    // <li class="task-item">
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;   // Pour retrouver la tâche depuis le DOM

    if (task.completed) {
        li.classList.add('is-completed');
    }

    // ---------- Checkbox ----------
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'task-checkbox-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark "${task.description}" as ${task.completed ? 'incomplete' : 'complete'}`);

    const checkboxVisual = document.createElement('span');
    checkboxVisual.className = 'task-checkbox-visual';
    checkboxVisual.setAttribute('aria-hidden', 'true');

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkboxVisual);

    // ---------- Description ----------
    const description = document.createElement('span');
    description.className = 'task-description';
    description.textContent = task.description;   // ⚠️ textContent, pas innerHTML !

    // ---------- Bouton supprimer ----------
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'task-delete';
    deleteBtn.setAttribute('aria-label', `Delete "${task.description}"`);
    deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
        </svg>
    `;

    // ---------- Assemblage ----------
    li.appendChild(checkboxWrapper);
    li.appendChild(description);
    li.appendChild(deleteBtn);

    return li;
}


/* ============================================================
   5. ACTIONS SUR LE STATE
   ============================================================ */

/**
 * Ajoute une nouvelle tâche.
 * @param {string} description
 */
function addTask(description) {
    // Sécurité : on ignore les descriptions vides
    const trimmed = description.trim();
    if (!trimmed) return;

    const newTask = {
        id: Date.now(),       // Id unique basé sur le timestamp
        description: trimmed,
        completed: false,
    };

    tasks.push(newTask);
    renderTasks();
}

/**
 * Bascule l'état "complété" d'une tâche.
 * @param {number} id
 */
function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

/**
 * Supprime une tâche.
 * @param {number} id
 */
function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    renderTasks();
}


/* ============================================================
   6. ÉVÉNEMENTS
   ============================================================ */

// ---------- Soumission du formulaire (Entrée ou clic sur ↵) ----------
form.addEventListener('submit', function (event) {
    event.preventDefault();   // Empêche le rechargement de la page
    addTask(input.value);
    input.value = '';         // Vide le champ
    input.focus();            // Remet le focus pour la prochaine saisie
});

// ---------- DÉLÉGATION D'ÉVÉNEMENTS ----------
// Un SEUL listener sur la <ul>, qui gère TOUTES les tâches (présentes et futures).
list.addEventListener('click', function (event) {
    // On remonte au <li> parent pour récupérer l'id
    const li = event.target.closest('.task-item');
    if (!li) return;

    const id = Number(li.dataset.id);

    // Clic sur la checkbox
    if (event.target.matches('.task-checkbox')) {
        toggleTask(id);
        return;
    }

    // Clic sur le bouton supprimer
    if (event.target.closest('.task-delete')) {
        deleteTask(id);
        return;
    }
});


/* ============================================================
   7. INITIALISATION
   ============================================================ */

// Premier rendu au chargement de la page
renderTasks();