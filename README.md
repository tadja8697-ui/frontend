# 🚀 Frontend Exercises — Mon parcours d'apprentissage

Bienvenue dans mon dépôt d'apprentissage du développement web frontend !
Ce dépôt regroupe **tous mes exercices pratiques** — du HTML pur jusqu'à React avec API, en passant par le CSS moderne et le JavaScript vanilla.

Chaque exercice est **autonome**, **documenté** et **déployé** sur GitHub Pages ou Vercel/Netlify.

---

## 📊 Vue d'ensemble

| Statistique | Valeur |
|---|---|
| **Nombre d'exercices** | 29 |
| **Technologies** | HTML5, CSS3, JavaScript ES6+, React |
| **Bibliothèques** | Luxon, Flatpickr, Framer Motion, Vite |
| **APIs utilisées** | Reddit, GitHub, Visual Crossing Weather |
| **Thèmes abordés** | Sémantique, Accessibilité (a11y), Responsive, State management, API REST |

---

## 📂 Liste complète des exercices

### 🟢 Partie 1 — Les fondations HTML

| N° | Exercice | Technologies | Difficulté |
|----|----------|--------------|------------|
| 01 | [Single Page CV](#01--single-page-cv) | HTML | ⭐ |
| 02 | [Basic HTML Website](#02--basic-html-website-multi-pages) | HTML | ⭐⭐ |
| 15 | [Pricing Comparison Table](#15--pricing-comparison-table) | HTML (tableau accessible) | ⭐⭐ |
| 16 | [Blog Post Page](#16--blog-post-page) | HTML (sémantique long-format) | ⭐⭐ |
| 17 | [Contact Form](#17--contact-form) | HTML (formulaire accessible) | ⭐⭐⭐ |
| 18 | [Photo Showcase](#18--photo-showcase) | HTML (médias) | ⭐⭐ |

### 🟡 Partie 2 — CSS Moderne

| N° | Exercice | Technologies | Difficulté |
|----|----------|--------------|------------|
| 03 | [Changelog Component](#03--changelog-component) | HTML, CSS (Grid) | ⭐⭐ |
| 04 | [Testimonial Cards](#04--testimonial-cards) | HTML, CSS (Grid + Flex) | ⭐⭐⭐ |
| 05 | [Datepicker UI](#05--datepicker-ui) | HTML, CSS (position absolute) | ⭐⭐⭐ |
| 06 | [Accessible Form UI](#06--accessible-form-ui) | HTML, CSS (a11y) | ⭐⭐⭐⭐ |
| 07 | [Image Grid Layout](#07--image-grid-layout) | HTML, CSS (Grid) | ⭐⭐ |
| 08 | [Tooltip UI](#08--tooltip-ui) | HTML, CSS (position, transitions) | ⭐⭐ |
| 19 | [Pricing Cards](#19--pricing-cards) | HTML, CSS (Flexbox) | ⭐⭐⭐ |
| 28 | [Theme Switcher](#28--theme-switcher) | HTML, CSS (variables, `:has()`) | ⭐⭐⭐ |

### 🟠 Partie 3 — JavaScript Vanilla

| N° | Exercice | Technologies | Difficulté |
|----|----------|--------------|------------|
| 09 | [Tabs Component](#09--tabs-component) | HTML, CSS, JS (DOM) | ⭐⭐⭐ |
| 10 | [Cookie Consent](#10--cookie-consent) | HTML, CSS, JS (localStorage) | ⭐⭐⭐ |
| 11 | [Restricted Textarea](#11--restricted-textarea) | HTML, CSS, JS (events) | ⭐⭐ |
| 12 | [Accordion](#12--accordion) | HTML, CSS, JS (animations) | ⭐⭐⭐ |
| 22 | [Custom Dropdown](#22--custom-dropdown) | HTML, CSS, JS (ARIA) | ⭐⭐⭐⭐ |
| 23 | [Task Tracker](#23--task-tracker) | HTML, CSS, JS (state + render) | ⭐⭐⭐⭐ |
| 25 | [Temperature Converter](#25--temperature-converter) | HTML, CSS, JS (validation) | ⭐⭐ |

### 🔵 Partie 4 — React & Écosystème moderne

| N° | Exercice | Technologies | Difficulté |
|----|----------|--------------|------------|
| 13 | [Age Calculator](#13--age-calculator) | npm, Luxon, Flatpickr | ⭐⭐⭐ |
| 14 | [Flash Cards](#14--flash-cards) | React (useState) | ⭐⭐⭐ |
| 20 | [Quiz App](#20--quiz-app) | React (state machine, custom hooks) | ⭐⭐⭐⭐ |
| 21 | [Weather Web App](#21--weather-web-app) | React + API + async/await | ⭐⭐⭐⭐ |
| 24 | [GitHub Random Repository](#24--github-random-repository) | React + GitHub API | ⭐⭐⭐⭐ |
| 26 | [Pomodoro Timer](#26--pomodoro-timer) | React (timers, Web Audio) | ⭐⭐⭐⭐⭐ |
| 27 | [Reddit Client](#27--reddit-client) | React + API + localStorage | ⭐⭐⭐⭐⭐ |
| 29 | [24hr Story Feature](#29--24hr-story-feature) | React + canvas + localStorage | ⭐⭐⭐⭐⭐ |

---

## 🟢 Partie 1 — Les fondations HTML

### 01 — Single Page CV

**Objectif** : Créer un CV sur une seule page en HTML sémantique pur.

**Compétences travaillées** :
- HTML sémantique (`<header>`, `<main>`, `<section>`, `<article>`)
- Meta tags SEO (`description`, `keywords`, `author`)
- Open Graph tags (partage réseaux sociaux)
- Favicon
- Balises sémantiques (`<address>`, `<time>`)

**📁 Dossier** : [`01-single-page-cv/`](./01-single-page-cv/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/01-single-page-cv/)

---

### 02 — Basic HTML Website (multi-pages)

**Objectif** : Créer un site multi-pages avec navigation identique sur chaque page.

**Compétences travaillées** :
- Structure multi-pages (`index.html`, `projects.html`, `articles.html`, `contact.html`)
- Navigation avec `aria-current="page"`
- `<header>`, `<nav>`, `<main>`, `<footer>`
- Formulaire de contact basique

**📁 Dossier** : [`02-basic-html-website/`](./02-basic-html-website/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/02-basic-html-website/)

---

### 15 — Pricing Comparison Table

**Objectif** : Tableau HTML accessible avec `caption`, `thead`, `tbody`, `scope`.

**Compétences travaillées** :
- `<table>`, `<caption>`, `<thead>`, `<tbody>`
- `scope="col"` et `scope="row"`
- `colspan` pour les lignes fusionnées
- Accessibilité des tableaux (lecteurs d'écran)

**📁 Dossier** : [`15-pricing-table/`](./15-pricing-table/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/15-pricing-table/)

---

### 16 — Blog Post Page

**Objectif** : Article long-format sémantique avec titres, listes, citations, code.

**Compétences travaillées** :
- Hiérarchie des titres (`<h1>` → `<h2>` → `<h3>`)
- `<blockquote>` + `<cite>`
- `<code>` et `<pre><code>`
- `<figure>` + `<figcaption>`
- `<time datetime>`
- Liens descriptifs

**📁 Dossier** : [`16-blog-post/`](./16-blog-post/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/16-blog-post/)

---

### 17 — Contact Form

**Objectif** : Formulaire de contact accessible avec validation HTML5.

**Compétences travaillées** :
- `<form action method="post">`
- Labels associés (`for` + `id`)
- `<input>`, `<select>`, `<textarea>`
- Radio buttons dans `<fieldset>` + `<legend>`
- Checkbox avec `value`
- Validation HTML5 (`required`, `minlength`, `type="email"`)
- Test Network tab (voir la requête HTTP)

**📁 Dossier** : [`17-contact-form/`](./17-contact-form/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/17-contact-form/)

---

### 18 — Photo Showcase

**Objectif** : Galerie photos avec alt, figure, captions et vidéo.

**Compétences travaillées** :
- `alt` descriptif vs `<figcaption>`
- `width` + `height` (anti-CLS)
- `loading="lazy"`
- `alt=""` pour images décoratives
- `<video controls poster>` + fallback

**📁 Dossier** : [`18-photo-showcase/`](./18-photo-showcase/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/18-photo-showcase/)

---

## 🟡 Partie 2 — CSS Moderne

### 03 — Changelog Component

**Objectif** : Composant changelog avec timeline verticale.

**Compétences travaillées** :
- CSS Grid : `grid-template-columns: 1fr auto 1fr`
- Position absolute pour la ligne verticale
- Pseudo-élément `::before`
- Responsive (mobile / desktop)

**📁 Dossier** : [`03-changelog-component/`](./03-changelog-component/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/03-changelog-component/)

---

### 04 — Testimonial Cards

**Objectif** : Cartes de témoignages avec 4 layouts différents.

**Compétences travaillées** :
- Bulle de dialogue (triangle en CSS pur)
- `justify-content: space-between` pour aligner en bas
- CSS Grid pour les splits
- Pattern BEM (`.card--bubble`)

**📁 Dossier** : [`04-testimonial-cards/`](./04-testimonial-cards/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/04-testimonial-cards/)

---

### 05 — Datepicker UI

**Objectif** : UI de datepicker avec calendrier.

**Compétences travaillées** :
- `position: relative` + `position: absolute`
- `grid-template-columns: repeat(7, 1fr)`
- `aspect-ratio: 1 / 1`
- `:focus-within`
- SVG inline

**📁 Dossier** : [`05-datepicker-ui/`](./05-datepicker-ui/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/05-datepicker-ui/)

---

### 06 — Accessible Form UI

**Objectif** : Formulaire accessible avec ARIA, focus et états d'erreur.

**Compétences travaillées** :
- `<label for>` associés
- `aria-invalid`, `aria-describedby`, `aria-required`
- `role="alert"` pour les erreurs
- `:focus-visible`
- Contraste WCAG
- Bouton toggle password accessible

**📁 Dossier** : [`06-accessible-form-ui/`](./06-accessible-form-ui/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/06-accessible-form-ui/)

---

### 07 — Image Grid Layout

**Objectif** : Galerie d'images en grille asymétrique.

**Compétences travaillées** :
- `grid-template-areas`
- `grid-template-rows: repeat(5, 1fr)`
- `object-fit: cover`
- Responsive (1 → 2 → 3 colonnes)

**📁 Dossier** : [`07-image-grid-layout/`](./07-image-grid-layout/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/07-image-grid-layout/)

---

### 08 — Tooltip UI

**Objectif** : Tooltip au survol avec animation.

**Compétences travaillées** :
- `position: absolute` + `bottom: calc(100% + X)`
- Triangle en CSS (`::after` + bordures)
- `opacity` + `pointer-events: none`
- `:focus-visible` (a11y clavier)
- 3 variantes d'animation (fade, slide, scale)

**📁 Dossier** : [`08-tooltip-ui/`](./08-tooltip-ui/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/08-tooltip-ui/)

---

### 19 — Pricing Cards

**Objectif** : Rangée de 3 cartes tarifaires avec une mise en avant.

**Compétences travaillées** :
- Flexbox : `align-items: stretch` + `margin-top: auto`
- `gap` (pas `margin`)
- Hiérarchie typographique
- États `:hover`, `:focus-visible`, `:active`
- Pattern BEM (`card--featured`)
- Badge en position absolue

**📁 Dossier** : [`19-pricing-cards/`](./19-pricing-cards/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/19-pricing-cards/)

---

### 28 — Theme Switcher

**Objectif** : Switcher de thème **sans JavaScript**, uniquement CSS.

**Compétences travaillées** :
- Design tokens (`:root` avec variables)
- Override de tokens par thème
- `:has()` sur `:root`
- Radios cachés mais accessibles
- `prefers-reduced-motion`

**📁 Dossier** : [`28-theme-switcher/`](./28-theme-switcher/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/28-theme-switcher/)

---

## 🟠 Partie 3 — JavaScript Vanilla

### 09 — Tabs Component

**Objectif** : Composant d'onglets interactif avec ARIA.

**Compétences travaillées** :
- `querySelectorAll` / `addEventListener`
- `classList.add` / `.remove`
- `dataset` (data-attributes)
- Pattern ARIA tabs (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- Navigation clavier (← →)

**📁 Dossier** : [`09-tabs-component/`](./09-tabs-component/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/09-tabs-component/)

---

### 10 — Cookie Consent

**Objectif** : Bannière de consentement cookies avec persistance.

**Compétences travaillées** :
- `localStorage.setItem/getItem`
- `try/catch` autour de localStorage
- Pattern `hidden` + classe `.is-visible`
- `requestAnimationFrame` pour les transitions
- `setTimeout` synchronisé avec CSS

**📁 Dossier** : [`10-cookie-consent/`](./10-cookie-consent/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/10-cookie-consent/)

---

### 11 — Restricted Textarea

**Objectif** : Textarea avec compteur en temps réel et limite.

**Compétences travaillées** :
- Événement `input` (pas `keydown`)
- `.slice()` pour bloquer le dépassement
- Classe CSS `.is-limit-reached`
- `aria-live="polite"` pour le compteur
- `sr-only` pour le label

**📁 Dossier** : [`11-restricted-textarea/`](./11-restricted-textarea/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/11-restricted-textarea/)

---

### 12 — Accordion

**Objectif** : Accordéon FAQ avec un seul item ouvert à la fois.

**Compétences travaillées** :
- `max-height` animable (0 → 500px)
- Rotation du chevron (`rotate(180deg)`)
- Logique "closeAll then open" (toggle)
- `<button aria-expanded aria-controls>`
- Navigation clavier (↑ ↓ Home End)

**📁 Dossier** : [`12-accordion/`](./12-accordion/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/12-accordion/)

---

### 22 — Custom Dropdown

**Objectif** : Dropdown custom accessible avec pattern listbox ARIA.

**Compétences travaillées** :
- `position: absolute` pour le menu
- `visibility: hidden` + `opacity: 0`
- `event.stopPropagation()`
- Détection de clic extérieur (`dropdown.contains()`)
- `role="listbox"`, `role="option"`, `aria-selected`
- Navigation circulaire avec modulo

**📁 Dossier** : [`22-custom-dropdown/`](./22-custom-dropdown/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/22-custom-dropdown/)

---

### 23 — Task Tracker

**Objectif** : To-do list avec ajout, toggle, suppression.

**Compétences travaillées** :
- Pattern **"State + Render"** (tableau d'objets + `renderTasks()`)
- Tri stable (`[...tasks].sort()`)
- **Délégation d'événements** (un seul listener sur la `<ul>`)
- `event.target.closest()`
- `textContent` (pas `innerHTML`)
- `aria-live="polite"`
- `:empty::after` pour l'état vide

**📁 Dossier** : [`23-task-tracker/`](./23-task-tracker/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/23-task-tracker/)

---

### 25 — Temperature Converter

**Objectif** : Convertisseur de température avec validation en temps réel.

**Compétences travaillées** :
- Validation : `input.value.trim() !== ''` (piège du `"0"`)
- Conversion via **pivot Celsius** (2 fonctions au lieu de 6)
- `Number.isNaN()` (strict)
- `Number.toFixed(2)` + `parseFloat` pour le formatage
- `input` + `change` sur les selects

**📁 Dossier** : [`25-temperature-converter/`](./25-temperature-converter/)
**🌐 Demo** : [Voir en ligne](https://tadja8697-ui.github.io/frontend-exercises/25-temperature-converter/)

---

## 🔵 Partie 4 — React & Écosystème moderne

### 13 — Age Calculator

**Objectif** : Calculateur d'âge précis avec Luxon et Flatpickr.

**Compétences travaillées** :
- **npm** : `npm init`, `npm install`
- **Vite** : `npm create vite`, `npm run dev`
- **Luxon** : `DateTime.now().diff()`
- **Flatpickr** : datepicker custom
- Variables d'environnement `.env` (`VITE_*`)
- Validation (date future, année < 1900)

**📁 Dossier** : [`13-age-calculator/`](./13-age-calculator/)

---

### 14 — Flash Cards

**Objectif** : App de flashcards avec questions/réponses.

**Compétences travaillées** :
- **React** : composants, props, state
- `useState` (currentIndex, showAnswer)
- Composants présentationnels (`FlashCard`, `ProgressBar`)
- Rendu conditionnel (ternaire)
- `setShowAnswer(false)` à chaque changement

**📁 Dossier** : [`14-flash-cards/`](./14-flash-cards/)

---

### 20 — Quiz App

**Objectif** : Quiz interactif avec score et écran de résultats.

**Compétences travaillées** :
- **State machine** : `status` (start / playing / finished)
- Multiples états (`currentIndex`, `score`, `answers`, `selectedIndex`)
- **Updater functions** : `setScore((s) => s + 1)`
- **Custom hook** : `useCountdown`
- `useCallback` pour éviter les boucles
- `role="status"` pour le feedback

**📁 Dossier** : [`20-quiz-app/`](./20-quiz-app/)

---

### 21 — Weather Web App

**Objectif** : App météo avec API Visual Crossing.

**Compétences travaillées** :
- **`fetch` + `async/await` + `try/catch/finally`**
- Gestion des 3 états : `isLoading`, `error`, `data`
- **Custom hook** : `useWeather`
- Variables d'env Vite (`import.meta.env.VITE_*`)
- **Framer Motion** (animations)
- Géolocalisation (`navigator.geolocation`)
- Protection de la clé API (`.env` + `.gitignore`)

**📁 Dossier** : [`21-weather-app/`](./21-weather-app/)

---

### 24 — GitHub Random Repository

**Objectif** : Trouveur de dépôts GitHub aléatoires.

**Compétences travaillées** :
- **4 états UI** : empty, loading, error, success
- **GitHub API** : `/search/repositories`
- Gestion des erreurs HTTP (403 rate limit, 422 invalid query)
- `encodeURIComponent` pour les langages avec caractères spéciaux
- **`Promise.all`** pour paralléliser
- `formatNumber` (24000 → "24k")

**📁 Dossier** : [`24-github-random-repo/`](./24-github-random-repo/)

---

### 26 — Pomodoro Timer

**Objectif** : Timer Pomodoro avec sessions de travail et pauses.

**Compétences travaillées** :
- **`setInterval` dans `useEffect`** (deps `[isRunning]` uniquement)
- **Cleanup** `clearInterval`
- Callback stocké dans **`useRef`** (éviter les boucles)
- **Web Audio API** (bip sans fichier mp3)
- `MODE_CLASSES` pour changer de couleur selon le mode
- `font-variant-numeric: tabular-nums` (chiffres stables)

**📁 Dossier** : [`26-pomodoro-timer/`](./26-pomodoro-timer/)

---

### 27 — Reddit Client

**Objectif** : Client multi-lanes pour subreddits.

**Compétences travaillées** :
- **CORS Proxy** (allorigins.win) — comprendre les limites du navigateur
- **State par lane** (`isLoading`, `error` individuels)
- **`Promise.all`** pour fetch parallèle
- **Menu contextuel** (`getBoundingClientRect()`)
- **Modale** avec `role="dialog"`
- **localStorage** : sauvegarder uniquement la config
- **Délégation d'événements** sur le conteneur

**📁 Dossier** : [`27-reddit-client/`](./27-reddit-client/)

---

### 29 — 24hr Story Feature

**Objectif** : Clone d'Instagram Stories avec upload et expiration 24h.

**Compétences travaillées** :
- **`FileReader`** + **`<canvas>`** pour redimensionner/compresser en JPEG
- Max 1080×1920 px
- **localStorage** + filtrage par timestamp (`expiresAt`)
- **Swipe** (`touchstart` + `touchend`)
- **2 timers** : `setInterval` (progress) + `setTimeout` (next)
- Progress bar multi-segments
- Cleanup de tous les timers

**📁 Dossier** : [`29-story-feature/`](./29-story-feature/)

---

## 🛠️ Technologies utilisées

### Langages
- **HTML5** — sémantique, accessibilité, formulaires, médias
- **CSS3** — Grid, Flexbox, variables, animations, `:has()`, `:focus-visible`
- **JavaScript ES6+** — `let/const`, arrow functions, destructuring, spread, `async/await`
- **JSX** — avec React

### Frameworks & libs
- **React 18+** — `useState`, `useEffect`, `useRef`, `useCallback`, custom hooks
- **Vite** — bundler, dev server, hot reload
- **Luxon** — manipulation de dates
- **Flatpickr** — datepicker
- **Framer Motion** — animations

### APIs externes
- **Reddit JSON API** — posts des subreddits
- **GitHub Search API** — dépôts aléatoires
- **Visual Crossing Weather API** — météo

### Outils
- **Git** & **GitHub** — versioning
- **GitHub Pages** — déploiement
- **Vercel / Netlify** — déploiement React
- **npm** — gestion des dépendances
- **Chrome DevTools** — debugging
- **Axe DevTools** & **Lighthouse** — accessibilité

---

## 🎓 Compétences transversales acquises

### HTML
- ✅ Structure sémantique (`header`, `main`, `footer`, `section`, `article`, `aside`)
- ✅ Accessibilité (ARIA, `role`, `aria-*`, `scope` sur les tableaux)
- ✅ Formulaires (labels, validation HTML5, `<fieldset>`)
- ✅ Médias (alt vs figcaption, video, `loading="lazy"`)

### CSS
- ✅ Box model (`box-sizing: border-box`)
- ✅ Flexbox (alignements, `gap`, `margin-top: auto`)
- ✅ CSS Grid (`grid-template-areas`, `grid-column: span`, `repeat()`)
- ✅ Positionnement (`relative` + `absolute`)
- ✅ Variables CSS et design tokens
- ✅ États (`:hover`, `:focus-visible`, `:active`, `:has()`, `:empty`)
- ✅ Responsive (mobile-first, `min-width`, `prefers-reduced-motion`)

### JavaScript
- ✅ DOM (querySelector, addEventListener, classList, dataset)
- ✅ Événements (click, input, change, submit, keydown, touch)
- ✅ Délégation d'événements
- ✅ Array methods (map, filter, sort, reduce, find)
- ✅ Async (fetch, async/await, Promise.all, try/catch/finally)
- ✅ localStorage (setItem, getItem, JSON)
- ✅ Canvas API (redimensionnement d'images)
- ✅ Web Audio API (bip sonore)
- ✅ Date & Timers (setInterval, setTimeout, Date.now)

### React
- ✅ Composants fonctionnels
- ✅ Props et state (`useState`)
- ✅ Effets (`useEffect`, cleanup)
- ✅ `useRef` pour les valeurs persistantes
- ✅ `useCallback` pour les fonctions stables
- ✅ Custom hooks (useTimer, useWeather, useStories)
- ✅ State machine (status: start / playing / finished)
- ✅ Rendu conditionnel
- ✅ Listes avec `key`

### Accessibilité (a11y)
- ✅ HTML sémantique
- ✅ ARIA (roles, states, properties)
- ✅ Focus visible (`:focus-visible`)
- ✅ Navigation clavier complète
- ✅ Contraste des couleurs (WCAG)
- ✅ `prefers-reduced-motion`
- ✅ `sr-only` (cacher visuellement mais pas aux lecteurs d'écran)

### Architecture
- ✅ Pattern "State + Render"
- ✅ Séparation présentation / logique
- ✅ Custom hooks réutilisables
- ✅ Gestion d'erreurs (API, localStorage, edge cases)
- ✅ Organisation en dossiers par exercice

---

## 📦 Structure du dépôt

```
frontend-exercises/
├── README.md                    ← Ce fichier
├── .gitignore
│
├── 01-single-page-cv/
├── 02-basic-html-website/
├── 03-changelog-component/
├── 04-testimonial-cards/
├── 05-datepicker-ui/
├── 06-accessible-form-ui/
├── 07-image-grid-layout/
├── 08-tooltip-ui/
├── 09-tabs-component/
├── 10-cookie-consent/
├── 11-restricted-textarea/
├── 12-accordion/
├── 13-age-calculator/          ← projet npm
├── 14-flash-cards/             ← projet React
├── 15-pricing-table/
├── 16-blog-post/
├── 17-contact-form/
├── 18-photo-showcase/
├── 19-pricing-cards/
├── 20-quiz-app/                ← projet React
├── 21-weather-app/             ← projet React + API
├── 22-custom-dropdown/
├── 23-task-tracker/
├── 24-github-random-repo/      ← projet React + API
├── 25-temperature-converter/
├── 26-pomodoro-timer/          ← projet React
├── 27-reddit-client/           ← projet React + API
├── 28-theme-switcher/
└── 29-story-feature/           ← projet React + canvas
```

Chaque dossier projet contient son propre `README.md` avec les détails.

---

## 🚀 Déploiement

### Exercices HTML/CSS/JS purs — GitHub Pages

URLs : `https://tadja8697-ui.github.io/frontend-exercises/<dossier>/`

### Projets React — Vercel / Netlify

Chaque projet React est déployé séparément (config : build `npm run build`, dossier `dist`).

---

## 📝 Ce que j'ai appris au global

### 🔑 Les 5 règles d'or

1. **HTML sémantique d'abord.** Un site sans CSS doit rester lisible.
2. **Accessibilité dès le début.** Pas en "après-coup".
3. **CSS moderne** : `:has()`, variables, Grid, Flexbox. Oublie `float`.
4. **JS : state + render.** Ne jamais modifier le DOM directement.
5. **React : le state est la SEULE source de vérité.**

### ⚠️ Les pièges qui m'ont marqué

- **`if (input.value)`** est faux pour `"0"` → toujours `!== ''`.
- **localStorage** peut être bloqué → toujours `try/catch`.
- **CORS** bloque les APIs externes → proxy ou backend.
- **`setInterval`** sans cleanup → fuite mémoire.
- **`display: none`** sur les radios → accessibilité cassée.
- **`innerHTML`** avec input utilisateur → faille XSS.
- **`sort()`** modifie le tableau en place → `[...arr].sort()`.

### 🎯 Les patterns à retenir

- **State + Render** (Task Tracker)
- **State machine** (Quiz App)
- **Custom hooks** (useTimer, useWeather)
- **Délégation d'événements** (Task Tracker, Dropdown)
- **Design tokens** (Theme Switcher)
- **Position absolute** (Tooltip, Dropdown, Datepicker)
- **Canvas + FileReader** (Story Feature)

---

## 👤 Auteur

- **Nom** — [GitHub](https://github.com/tadja8697-ui) | [LinkedIn](#)

---

## 📚 Ressources utilisées

- [MDN Web Docs](https://developer.mozilla.org/fr/)
- [JavaScript.info](https://fr.javascript.info/)
- [React Docs (FR)](https://fr.react.dev)
- [CSS-Tricks](https://css-tricks.com)
- [WebAIM](https://webaim.org)
- [A11y Project](https://www.a11yproject.com)
- [Roadmap.sh](https://roadmap.sh)

---

📌 *Dépôt créé dans le cadre de mon apprentissage du développement web frontend.*
*Progression : HTML → CSS → JavaScript → React → API → Architecture.*