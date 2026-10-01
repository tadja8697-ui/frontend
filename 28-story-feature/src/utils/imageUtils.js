import {
    MAX_IMAGE_WIDTH,
    MAX_IMAGE_HEIGHT,
    JPEG_QUALITY,
} from '../constants.js';

/**
 * Lit un fichier et le convertit en Data URL (base64).
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Erreur de lecture du fichier.'));
        reader.readAsDataURL(file);
    });
}

/**
 * Charge une image depuis une Data URL.
 * @param {string} dataURL
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(dataURL) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Image invalide.'));
        img.src = dataURL;
    });
}

/**
 * Redimensionne une image et la compresse en JPEG.
 * Respecte les dimensions max 1080×1920.
 * @param {File} file
 * @returns {Promise<string>} Data URL compressée
 */
export async function processImage(file) {
    // 1. Vérifier le type
    if (!file.type.startsWith('image/')) {
        throw new Error('Le fichier doit être une image.');
    }

    // 2. Lire en base64
    const originalDataURL = await readFileAsDataURL(file);

    // 3. Charger l'image
    const img = await loadImage(originalDataURL);

    // 4. Calculer les nouvelles dimensions
    let { width, height } = img;

    if (width > MAX_IMAGE_WIDTH || height > MAX_IMAGE_HEIGHT) {
        const ratio = Math.min(
            MAX_IMAGE_WIDTH / width,
            MAX_IMAGE_HEIGHT / height
        );
        width  = Math.round(width  * ratio);
        height = Math.round(height * ratio);
    }

    // 5. Dessiner sur un canvas
    const canvas = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    // 6. Convertir en JPEG compressé
    const compressedDataURL = canvas.toDataURL('image/jpeg', JPEG_QUALITY);

    return compressedDataURL;
}

/**
 * Estime la taille en Ko d'une Data URL base64.
 * @param {string} dataURL
 * @returns {number}
 */
export function estimateSize(dataURL) {
    const base64 = dataURL.split(',')[1] || '';
    return Math.round((base64.length * 3) / 4 / 1024);
}