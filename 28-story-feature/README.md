# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

💡 Astuce de prof
Ce projet est impressionnant en portfolio parce qu'il combine :

UX avancée (swipe, progress bar, transitions).

Technique (canvas, FileReader, localStorage, timers).

Contraintes réelles (quota, expiration, responsive).

Les 3 règles à graver :
1. Toujours redimensionner les images avant de les stocker. Sans ça, ton app est cassée.

2. Cleanup TOUS les timers. Sinon fuite mémoire.

3. Le filtrage au render > les timeouts. Plus robuste.

Le test mental ultime :
Uploade 15 photos de ton téléphone.

Si l'app plante → redimensionnement manquant.

Si l'app rame → trop de re-renders.

Si l'app marche → tu as tout bon. ✅

Pour aller plus loin :
Canvas API : developer.mozilla.org/fr/docs/Web/API/Canvas_API

Touch events : developer.mozilla.org/fr/docs/Web/API/Touch_events

IndexedDB : developer.mozilla.org/fr/docs/Web/API/IndexedDB_API

Quota localStorage : developer.mozilla.org/fr/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria

Le pattern "Story Feature" :

1. STORAGE (localStorage)
   - Image convertie en base64
   - REDIMENSIONNÉE (canvas) + COMPRESSÉE (JPEG 0.8)
   - Max 1080×1920
   - Expiration : createdAt + 24h

2. EXPIRATION
   - Filtrage au chargement (loadStories)
   - Filtrage périodique (setInterval 60s)

3. VISIONNEUSE
   - 2 timers : setInterval (progress) + setTimeout (next)
   - Progress bar multi-segments
   - Swipe : touchstart + touchend + seuil
   - Clavier : ← → Échap

4. UPLOAD
   - <input type="file" accept="image/*" class="sr-only">
   - Bouton custom → input.click()
   - RESET input.value après upload

5. COMPRESSION (le point clé)
   - FileReader → DataURL
   - Image + Canvas → resize
   - toDataURL('image/jpeg', 0.8)

RÈGLES D'OR :
   - TOUJOURS redimensionner (quota localStorage)
   - TOUJOURS cleanup les timers
   - TOUJOURS reset input.value
   - TOUJOURS try/catch autour de localStorage
   - Seuil de swipe (50px minimum)

🎯 ÉTAPE 4 : Explication détaillée
🔹 4.1 — La conversion et compression d'image
javascript
export async function processImage(file) {
    const dataURL = await readFileAsDataURL(file);
    const img = await loadImage(dataURL);

    // Calcul du ratio
    let { width, height } = img;
    if (width > MAX_IMAGE_WIDTH || height > MAX_IMAGE_HEIGHT) {
        const ratio = Math.min(
            MAX_IMAGE_WIDTH / width,
            MAX_IMAGE_HEIGHT / height
        );
        width  = Math.round(width  * ratio);
        height = Math.round(height * ratio);
    }

    // Canvas + JPEG
    const canvas = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL('image/jpeg', 0.8);
}
Décomposons :

FileReader : lit le fichier en Data URL base64.

new Image() : charge l'image en mémoire pour connaître ses dimensions.

Ratio : on calcule le facteur pour rentrer dans 1080×1920.

<canvas> : on dessine l'image redimensionnée.

toDataURL('image/jpeg', 0.8) : convertit en JPEG compressé à 80% de qualité.

💡 Résultat :

Photo 4000×3000 (5 MB) → 1080×810 JPEG (200 KB).

25× plus léger !

🔹 4.2 — L'expiration automatique
javascript
// Au chargement : filtrer
const validStories = parsed.filter((s) => s.expiresAt > Date.now());

// Nettoyage périodique
setInterval(() => {
    setStories((prev) => prev.filter((s) => s.expiresAt > Date.now()));
}, 60_000);
💡 Double sécurité :

Au chargement → on ignore les expirées (même si localStorage les a).

Toutes les 60s → on les retire activement.

Pourquoi pas juste un setTimeout par story ?

Fragile : si l'utilisateur ferme l'onglet, le timeout est perdu.

Redondant : après reload, il faudrait recréer tous les timeouts.

Le filtrage au render est plus fiable. ✅

🔹 4.3 — Le swipe
javascript
function handleTouchStart(e) {
    touchStartXRef.current = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (deltaX < -SWIPE_THRESHOLD) goNext();
    if (deltaX >  SWIPE_THRESHOLD) goPrevious();
}
Décomposons :

touchstart : on enregistre la position X de départ.

touchend : on calcule le delta.

Swipe gauche (deltaX < -50) → story suivante.

Swipe droite (deltaX > 50) → story précédente.

⚠️ Seuil de 50px : évite de déclencher sur un simple tap ou scroll.

🔹 4.4 — Les 2 timers dans StoryViewer
javascript
useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    // Timer 1 : progression (toutes les 50ms)
    const id = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setProgress(Math.min((elapsed / STORY_DURATION_MS) * 100, 100));
    }, 50);

    // Timer 2 : passage à la story suivante (3000ms)
    const timeoutId = setTimeout(() => {
        goNext();
    }, STORY_DURATION_MS);

    return () => {
        clearInterval(id);
        clearTimeout(timeoutId);
    };
}, [currentIndex]);
💡 Pourquoi 2 timers ?

setInterval → met à jour la progress bar en douceur.

setTimeout → déclenche le changement de story.

Alternative : utiliser uniquement setInterval et vérifier elapsed >= 3000 à chaque tick. Moins propre.

⚠️ Cleanup obligatoire : on nettoie les 2 pour éviter les fuites.

🔹 4.5 — La progress bar multi-segments
jsx
{stories.map((story, index) => {
    let width = 0;
    if (index < currentIndex) width = 100;              // Passées
    if (index === currentIndex) width = progress;        // Actuelle
    // index > currentIndex → 0                            // Futures

    return (
        <div key={story.id} className="story-progress-segment">
            <div style={{ width: `${width}%` }} />
        </div>
    );
})}
💡 Logique :

Index < currentIndex → 100% (déjà vues).

Index === currentIndex → progress (en cours).

Index > currentIndex → 0% (pas encore vues).

Résultat : on voit le défilement comme sur Instagram.

🔹 4.6 — La mise en pause sur Échap
javascript
if (e.key === 'Escape') onClose();
💡 On ne met PAS en pause ici, on ferme. Pour une vraie app, on pourrait ajouter :

javascript
// Sauvegarder le temps écoulé
// Arrêter les timers
// Reprendre après un délai
Pour ce projet, fermer suffit.

🔹 4.7 — Le bouton "+" et l'input file
jsx
<input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="sr-only"
/>

<button onClick={handleAddClick}>+</button>
javascript
function handleAddClick() {
    fileInputRef.current?.click();
}
💡 Pattern classique :

L'input est caché (sr-only, accessible mais invisible).

Le bouton déclenche input.click().

Résultat : design custom + comportement natif.

⚠️ accept="image/*" : filtre les fichiers sur mobile (ouvre la galerie ou l'appareil photo).

🔹 4.8 — Le reset de l'input
javascript
if (fileInputRef.current) fileInputRef.current.value = '';
💡 Pourquoi ? Sans ce reset, ré-uploader la même image ne déclenche pas onChange (car la valeur n'a pas changé). Bug classique.

🔹 4.9 — L'accès localStorage avec try/catch
javascript
try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    return true;
} catch (err) {
    console.warn('Impossible de sauvegarder :', err);
    return false;
}
💡 Pourquoi ? localStorage.setItem peut lancer une QuotaExceededError si :

Le stockage est plein (5-10 MB atteints).

L'utilisateur est en navigation privée stricte.

On renvoie true/false pour informer l'appelant.

🔹 4.10 — L'ordre des stories (plus récente en premier)
javascript
setStories((prev) => [newStory, ...prev]);
💡 [newStory, ...prev] : la nouvelle story est en tête. Comme sur Instagram. ✅

Alternative : ajouter à la fin et trier au render. Moins efficace.


