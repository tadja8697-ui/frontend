# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Exercice 21 : GitHub Random Repository Finder

## 🎯 Objectif

Créer une application qui sélectionne un **dépôt GitHub aléatoire** selon un langage choisi par l'utilisateur.

L'app utilise l'**API GitHub Repository Search** pour :
- Récupérer une liste de dépôts pour un langage donné.
- En choisir un au hasard.
- Afficher ses infos : nom, description, étoiles, forks, issues ouvertes.
- Permettre de rafraîchir pour obtenir un autre dépôt.

**Le vrai défi de cet exercice** : gérer proprement les **4 états d'une UI asynchrone**.

---

## 📚 Compétences travaillées

### React
- **4 états UI** : `empty` (initial), `loading`, `error`, `success`.
- **`useState`** pour chaque état (`repo`, `isLoading`, `error`, `language`).
- **`useEffect`** pour fetch automatique au changement de langage.
- **Rendu conditionnel** : chaque état affiche un composant différent.
- **Composants séparés** par état (`EmptyState`, `LoadingState`, `ErrorState`, `RepoCard`).

### API & async
- **GitHub Search API** : `GET /search/repositories?q=language:X&sort=stars&order=desc`.
- **`fetch` + `async/await`** avec `try/catch/finally`.
- **`encodeURIComponent`** pour les langages avec espaces ("C#" → "C%23").
- **Gestion des erreurs HTTP** (403 rate limit, 422 invalid query, 5xx).
- **Sélection aléatoire** dans un tableau (`Math.random()`).

### UX
- **Empty state** : guide l'utilisateur (ne rien afficher de vide).
- **Loading state** : feedback visuel pendant l'attente.
- **Error state** : message clair + bouton retry.
- **Success state** : carte du dépôt + bouton Refresh.
- **`aria-live`** pour annoncer les changements d'état.

---

## 📂 Structure des fichiers

Le pattern "4 états d'une UI asynchrone" :

1. EMPTY (initial)
   → Guider l'utilisateur
   → "Sélectionne un langage"

2. LOADING
   → Feedback visuel (spinner)
   → "Loading, please wait..."

3. ERROR
   → Message clair + ACTION
   → "Rate limit... [Click to retry]"

4. SUCCESS
   → Afficher les données + Refresh
   → Carte + bouton

Règles d'or :
   - try / catch / FINALLY (toujours)
   - Encoder les entrées utilisateur (encodeURIComponent)
   - Gérer les codes HTTP spécifiques (403, 422, 5xx)
   - target="_blank" + rel="noopener noreferrer"
   - aria-live="polite" sur la zone dynamique

Erreur n°1 à éviter :
   fetchRandomRepo dans les deps du useEffect → BOUCLE INFINIE


🧠 ÉTAPE 5 : Explication détaillée
🔹 5.1 — Les 4 états de l'UI
Chaque état est exclusif (un seul à la fois) :

État	Condition	Composant
Empty	!language && !isLoading && !error	<EmptyState />
Loading	isLoading	<LoadingState />
Error	!isLoading && error	<ErrorState />
Success	!isLoading && !error && repo	<RepoCard />
💡 Pourquoi c'est crucial : ne JAMAIS afficher une page vide sans explication. L'utilisateur doit toujours savoir ce qui se passe.

🔹 5.2 — Le fetch automatique sur changement de langage
jsx
useEffect(() => {
    if (language) {
        fetchRandomRepo(language);
    } else {
        setRepo(null);
        setError(null);
    }
}, [language]);
💡 Avantage : l'utilisateur n'a pas besoin de cliquer sur un bouton → il choisit un langage, ça charge tout seul. UX fluide.

⚠️ Attention : si on met fetchRandomRepo dans les dépendances, ça boucle. On met seulement [language].

🔹 5.3 — La sélection aléatoire
jsx
const randomIndex = Math.floor(Math.random() * data.items.length);
const randomRepo = data.items[randomIndex];
Décomposons :

Math.random() → nombre décimal entre 0 et 1 (ex: 0.724).

* data.items.length → entre 0 et N (ex: 0.724 * 30 = 21.72).

Math.floor(...) → entier entre 0 et N-1 (ex: 21).

💡 Résultat : un index aléatoire valide dans le tableau.

🔹 5.4 — Le encodeURIComponent pour le langage
jsx
const url = `${GITHUB_API}?q=language:${encodeURIComponent(lang)}&...`;
Pourquoi ? Certains langages ont des caractères spéciaux :

C# → C%23

C++ → C%2B%2B

F# → F%23

Sans encodage, l'URL serait invalide et l'API renverrait une erreur 422.

💡 Règle : dès qu'une valeur vient de l'utilisateur, on l'encode.

🔹 5.5 — La gestion des erreurs HTTP
jsx
if (response.status === 403) throw new Error('Rate limit reached...');
if (response.status === 422) throw new Error('Invalid language query...');
throw new Error(`Failed to fetch (HTTP ${response.status}).`);
Code	Signification	Message
403	Rate limit dépassé	"Attends une minute"
422	Query invalide	"Change de langage"
5xx	Erreur serveur GitHub	"Réessaie plus tard"
💡 Un bon message d'erreur dit QUOI FAIRE, pas juste "erreur". L'utilisateur doit savoir comment se sortir de là.

🔹 5.6 — Le finally (rappel)
jsx
try {
    // ...
} catch (err) {
    setError(err.message);
} finally {
    setIsLoading(false);   // ← TOUJOURS exécuté
}
💡 finally s'exécute dans tous les cas : succès, échec, exception. Idéal pour remettre isLoading à false.

🔹 5.7 — target="_blank" + rel="noopener noreferrer"
jsx
<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
Attribut	Rôle
target="_blank"	Ouvre dans un nouvel onglet
rel="noopener"	Empêche la page ouverte de manipuler window.opener
rel="noreferrer"	N'envoie pas le referer (vie privée)
⚠️ Sans noopener : un site malveillant pourrait rediriger ton onglet d'origine vers une page de phishing. Faille de sécurité réelle.

🔹 5.8 — aria-live="polite" sur la zone de contenu
jsx
<section className="content" aria-live="polite">
💡 aria-live="polite" : quand l'état change (loading → success), le lecteur d'écran annonce automatiquement le changement de contenu. Essentiel pour l'accessibilité.

🔹 5.9 — La fonction formatNumber
jsx
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
}
Exemples :

24000 → "24k"

1500 → "1.5k"

1000 → "1k"

500 → "500"

💡 .replace('.0', '') : enlève le .0 inutile pour les milliers ronds.

🔹 5.10 — Le token GitHub (bonus optionnel)
Pour augmenter le rate limit (10 → 30 req/min), tu peux ajouter un token :

jsx
const url = `https://api.github.com/search/repositories?...`;

const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
    }
});
Et dans .env :

env
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxx
⚠️ Attention : un token dans le frontend est visible. Pour un vrai projet, il faut passer par un backend. Pour cet exercice, c'est acceptable mais à documenter comme limitation.