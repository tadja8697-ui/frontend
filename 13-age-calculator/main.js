/* ============================================================
   1. IMPORTS
   ============================================================ */

// Luxon : pour manipuler les dates
import { DateTime } from 'luxon';

// Flatpickr : pour le datepicker
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';   // Les styles de Flatpickr


/* ============================================================
   2. INITIALISATION DU DATEPICKER
   ============================================================ */

const birthdateInput = document.getElementById('birthdate');

const picker = flatpickr(birthdateInput, {
    dateFormat: 'd/m/Y',           // Format affiché : 21/11/2002
    maxDate: 'today',              // Impossible de choisir une date future
    defaultDate: null,
    disableMobile: true,           // Force le picker custom sur mobile
    locale: {
        firstDayOfWeek: 1,         // Lundi en premier
    },
});


/* ============================================================
   3. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

const form         = document.getElementById('age-form');
const errorMessage = document.getElementById('error-message');
const resultEl     = document.getElementById('result');


/* ============================================================
   4. FONCTIONS UTILITAIRES
   ============================================================ */

/**
 * Affiche un message d'erreur sous le champ.
 * @param {string} message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    birthdateInput.setAttribute('aria-invalid', 'true');
}

/**
 * Cache le message d'erreur.
 */
function hideError() {
    errorMessage.textContent = '';
    errorMessage.hidden = true;
    birthdateInput.removeAttribute('aria-invalid');
}

/**
 * Efface le résultat affiché.
 */
function clearResult() {
    resultEl.textContent = '';
}

/**
 * Affiche le résultat formaté.
 * @param {number} years
 * @param {number} months
 * @param {number} days
 */
function showResult(years, months, days) {
    // Construction du texte avec accords singulier/pluriel
    const yearLabel  = years  === 1 ? 'year'  : 'years';
    const monthLabel = months === 1 ? 'month' : 'months';
    const dayLabel   = days   === 1 ? 'day'   : 'days';

    // On met en gras la partie "X years Y months"
    resultEl.innerHTML = `You are <strong>${years} ${yearLabel} ${months} ${monthLabel}</strong> old`;

    // Bonus : afficher aussi les jours
    console.log(`Âge exact : ${years} ans, ${months} mois, ${days} jours`);
}


/* ============================================================
   5. GESTION DE LA SOUMISSION
   ============================================================ */

form.addEventListener('submit', function (event) {
    event.preventDefault();
    hideError();
    clearResult();

    // ÉTAPE 1 : Récupérer la valeur du champ
    const selectedDate = picker.selectedDates[0];

    // ÉTAPE 2 : Vérifier qu'une date est sélectionnée
    if (!selectedDate) {
        showError('Please select your birth date.');
        return;
    }

    // ÉTAPE 3 : Convertir en Luxon DateTime
    const birthDate = DateTime.fromJSDate(selectedDate);
    const now       = DateTime.now();

    // ÉTAPE 4 : Validation supplémentaire
    if (birthDate > now) {
        showError('Birth date cannot be in the future.');
        return;
    }

    if (birthDate.year < 1900) {
        showError('Please enter a realistic birth date.');
        return;
    }

    // ÉTAPE 5 : Calcul de l'âge avec Luxon
    const diff = now.diff(birthDate, ['years', 'months', 'days']).toObject();

    // ÉTAPE 6 : Affichage
    const years  = Math.floor(diff.years  || 0);
    const months = Math.floor(diff.months || 0);
    const days   = Math.floor(diff.days   || 0);

    showResult(years, months, days);
});


/* ============================================================
   6. RÉINITIALISER L'ERREUR À LA SAISIE
   ============================================================ */

// Quand l'utilisateur choisit une nouvelle date, on efface l'erreur
birthdateInput.addEventListener('input', hideError);