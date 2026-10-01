/* ============================================================
   1. SÉLECTION DES ÉLÉMENTS
   ============================================================ */

const form             = document.getElementById('converter-form');
const temperatureInput = document.getElementById('temperature');
const fromSelect       = document.getElementById('from-unit');
const toSelect         = document.getElementById('to-unit');
const convertBtn       = document.getElementById('convert-btn');
const resultEl         = document.getElementById('result');


/* ============================================================
   2. LIBELLÉS POUR L'AFFICHAGE
   ============================================================ */

const UNIT_LABELS = {
    celsius:    'Celsius',
    fahrenheit: 'Fahrenheit',
    kelvin:     'Kelvin',
};


/* ============================================================
   3. VALIDATION
   ============================================================ */

/**
 * Vérifie si les 3 champs sont remplis.
 * @returns {boolean}
 */
function isFormValid() {
    const temp = temperatureInput.value.trim();
    const from = fromSelect.value;
    const to   = toSelect.value;

    return temp !== '' && from !== '' && to !== '';
}

/**
 * Active/désactive le bouton selon la validité du formulaire.
 */
function updateButtonState() {
    convertBtn.disabled = !isFormValid();
}


/* ============================================================
   4. CONVERSIONS (via Celsius comme pivot)
   ============================================================ */

/**
 * Convertit une valeur d'une unité vers Celsius.
 * @param {number} value
 * @param {string} unit - 'celsius' | 'fahrenheit' | 'kelvin'
 * @returns {number} La valeur en Celsius
 */
function toCelsius(value, unit) {
    switch (unit) {
        case 'celsius':    return value;
        case 'fahrenheit': return (value - 32) * 5 / 9;
        case 'kelvin':     return value - 273.15;
        default:           throw new Error(`Unité inconnue : ${unit}`);
    }
}

/**
 * Convertit une valeur en Celsius vers une autre unité.
 * @param {number} celsius
 * @param {string} unit - 'celsius' | 'fahrenheit' | 'kelvin'
 * @returns {number} La valeur dans l'unité cible
 */
function fromCelsius(celsius, unit) {
    switch (unit) {
        case 'celsius':    return celsius;
        case 'fahrenheit': return celsius * 9 / 5 + 32;
        case 'kelvin':     return celsius + 273.15;
        default:           throw new Error(`Unité inconnue : ${unit}`);
    }
}

/**
 * Convertit une valeur entre deux unités quelconques.
 * @param {number} value
 * @param {string} fromUnit
 * @param {string} toUnit
 * @returns {number}
 */
function convertTemperature(value, fromUnit, toUnit) {
    const inCelsius = toCelsius(value, fromUnit);
    return fromCelsius(inCelsius, toUnit);
}


/* ============================================================
   5. AFFICHAGE
   ============================================================ */

/**
 * Formate un nombre : max 2 décimales, sans zéros inutiles.
 * Ex: 93.20 → "93.2"   |   34.00 → "34"
 * @param {number} num
 * @returns {string}
 */
function formatNumber(num) {
    return parseFloat(num.toFixed(2)).toString();
}

/**
 * Affiche le résultat de la conversion.
 */
function showResult(value, fromUnit, toUnit, converted) {
    const fromLabel = UNIT_LABELS[fromUnit];
    const toLabel   = UNIT_LABELS[toUnit];

    resultEl.textContent =
        `${formatNumber(value)} ${fromLabel} is ${formatNumber(converted)} ${toLabel}`;
}

/**
 * Efface le résultat.
 */
function clearResult() {
    resultEl.textContent = '';
}


/* ============================================================
   6. HANDLERS
   ============================================================ */

// ---------- Mise à jour du bouton à CHAQUE frappe/change ----------
temperatureInput.addEventListener('input',  updateButtonState);
fromSelect.addEventListener('change',       updateButtonState);
toSelect.addEventListener('change',         updateButtonState);

// ---------- Soumission du formulaire ----------
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Sécurité : re-vérifier la validité
    if (!isFormValid()) return;

    // 1. Récupérer les valeurs
    const rawValue = temperatureInput.value.trim();
    const value    = parseFloat(rawValue);
    const fromUnit = fromSelect.value;
    const toUnit   = toSelect.value;

    // 2. Vérifier que c'est bien un nombre valide
    if (Number.isNaN(value)) {
        resultEl.textContent = 'Please enter a valid number.';
        resultEl.style.color = 'var(--color-btn-disabled)';
        return;
    }

    // 3. Convertir
    const converted = convertTemperature(value, fromUnit, toUnit);

    // 4. Afficher
    resultEl.style.color = '';   // Reset au vert par défaut (CSS)
    showResult(value, fromUnit, toUnit, converted);
});


/* ============================================================
   7. INITIALISATION
   ============================================================ */

updateButtonState();