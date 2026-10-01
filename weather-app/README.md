# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


🧠 ÉTAPE 5 : Explication des concepts clés
5.1. Le custom hook useWeather
Ce hook encapsule toute la logique de fetch. Il expose { weatherData, isLoading, error, fetchWeather }. Cela permet au composant App de rester simple et de se concentrer sur l'affichage.

5.2. Gestion des états asynchrones
L'application gère trois états principaux pour l'interface :

isLoading : true pendant la requête. Affiche le Loader.

error : Contient un message si la requête échoue. Affiche un message d'erreur.

weatherData : Contient les données si la requête réussit. Affiche les résultats.

5.3. Animations avec Framer Motion
<AnimatePresence> : Permet d'animer l'entrée et la sortie des composants. On l'utilise pour le Loader, les erreurs et les résultats. mode="wait" attend qu'un composant finisse son animation de sortie avant de faire entrer le suivant.

<motion.div> : Le composant de base de Framer Motion. On lui passe des props comme initial, animate, et exit pour définir les états de l'animation.

5.4. Affichage des données
WeatherCard : Affiche les currentConditions renvoyées par l'API.

HourlyForecast : Affiche les hours du premier jour (data.days[0].hours). On calcule l'index de l'heure actuelle pour centrer la vue.

5.5. Géolocalisation
Au chargement de l'application, le hook useWeather tente d'obtenir la position de l'utilisateur via navigator.geolocation.getCurrentPosition(). Si l'utilisateur accepte, les coordonnées sont utilisées pour récupérer la météo locale.


# Exercice 20 : Weather Web App

## 🎯 Objectif

Construire une application météo qui :
- Récupère et affiche la météo d'une localisation saisie par l'utilisateur.
- Utilise une **API externe** (Visual Crossing Weather API).
- Affiche les conditions actuelles + les prévisions sur 24h.
- Peut être rafraîchie par l'utilisateur.
- **(Optionnel)** Utilise la position actuelle de l'utilisateur par défaut.
- **(Optionnel)** Utilise Framer Motion pour des animations de chargement.

---

## 📚 Compétences travaillées

### React
- **Custom hook** `useWeather` pour isoler la logique de fetch.
- **`useState`** pour gérer `weatherData`, `isLoading`, `error`.
- **`useEffect`** pour le fetch initial (géolocalisation).
- **`useCallback`** pour mémoriser la fonction de fetch.
- Rendu conditionnel : `isLoading ? <Loader /> : <Results />`.

### JavaScript asynchrone
- **`async` / `await`** pour les appels réseau.
- **`fetch`** avec `encodeURIComponent` pour encoder la localisation.
- **`try/catch/finally`** pour gérer les erreurs ET l'état de chargement.
- Gestion des **codes HTTP** (400 → "location not found", 401 → "invalid key").

### API & données
- Consommation de l'**API Visual Crossing**.
- Variables d'environnement **`.env`** avec préfixe `VITE_`.
- Manipulation de données JSON imbriquées (`data.currentConditions`, `data.days[0].hours`).
- **Mapping** des icônes API → emojis.

### UX & Accessibilité
- **Framer Motion** pour les animations (`AnimatePresence`, `motion.div`).
- **Géolocalisation** via `navigator.geolocation`.
- **`aria-label`** sur le bouton refresh.
- **`sr-only`** pour le label du champ de recherche (caché visuellement mais accessible).
- **`role="status"`** sur les feedbacks (rappel exercice précédent).

---

## 📂 Structure des fichiers



---

## 🔑 Configuration préalable

### 1. Obtenir une clé API Visual Crossing

1. Crée un **compte gratuit** sur [visualcrossing.com/sign-up](https://www.visualcrossing.com/sign-up/).
2. Va sur ta **page de compte** → copie ta **clé API**.
3. Plan gratuit : **1000 requêtes/jour**, largement suffisant pour ce projet.

### 2. Créer le fichier `.env`

À la racine du projet (`20-weather-app/.env`) :

```env
VITE_WEATHER_API_KEY=TA_CLE_API_ICI


---

## 🎯 Comment l'utiliser

### 1️⃣ Crée le fichier

Dans `20-weather-app/`, crée un fichier `README.md` et colle tout le contenu ci-dessus.

### 2️⃣ Personnalise
- Remplace `Ton Nom` par ton vrai nom.
- Ajoute ton LinkedIn si tu en as un.

### 3️⃣ Vérifie ton `.gitignore`

**Le plus important** : ton `.gitignore` **DOIT** contenir `.env`. Sinon, ta clé API sera visible publiquement sur GitHub.

```gitignore
# .gitignore
node_modules/
dist/
.env          ← INDISPENSABLE
.DS_Store
*.log