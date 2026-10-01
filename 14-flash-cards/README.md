# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Les 5 concepts React à maîtriser :

1. COMPOSANT
   function MonComposant() {
       return <div>...</div>;
   }

2. STATE (useState)
   const [valeur, setValeur] = useState(initial);
   setValeur(nouvelleValeur);   // déclenche un re-rendu

3. PROPS
   <Enfant prop1={valeur1} prop2={valeur2} />
   function Enfant({ prop1, prop2 }) { ... }

4. RENDU CONDITIONNEL
   {condition ? <A /> : <B />}
   {condition && <A />}

5. RENDU DE LISTE
   {items.map(item => <Card key={item.id} {...item} />)}

Règles d'or :
   - NE JAMAIS modifier l'état directement
   - className (pas class)
   - camelCase pour les styles inline
   - Une seule source de vérité par donnée

Pattern "flash card" :
   - 2 états : currentIndex + showAnswer
   - Passer les props au composant FlashCard
   - Re-rendu automatique à chaque setState()

🎯 ÉTAPE 8 : Envoi sur GitHub + Netlify
🔹 8.1 — Vérifier le .gitignore
Vite crée un .gitignore avec node_modules/, dist/, etc. Vérifie qu'il est là.

🔹 8.2 — Build de production
bash
npm run build
→ Vite génère un dossier dist/ optimisé (fichiers minifiés, images compressées).

🔹 8.3 — Push sur GitHub
bash
cd ~/Musique/roadmap/frontend
git add 14-flash-cards/
git commit -m "Ajout exercice 14 : Flash Cards (React + useState)"
git push origin main
🔹 8.4 — Déployer sur Netlify
Option 1 : Netlify Drop

Va sur app.netlify.com/drop.

Glisse-dépose le dossier dist/.

Boom, ton app est en ligne.

Option 2 : Connecter le dépôt GitHub (recommandé)

Va sur netlify.com → "Add new site" → "Import from Git".

Choisis ton dépôt frontend-exercises.

Base directory : 14-flash-cards

Build command : npm run build

Publish directory : dist

Netlify build ton projet à chaque push → URL publique automatique.

💡 Alternative : Vercel (vercel.com) — encore plus simple, détecte Vite automatiquement.

URL finale (exemple) :

text
https://flash-cards-ada.netlify.app

🎯 ÉTAPE 5 : Explication détaillée
🔹 5.1 — useState : le cœur de React
jsx
import { useState } from 'react';

const [currentIndex, setCurrentIndex] = useState(0);
const [showAnswer, setShowAnswer]   = useState(false);
Décomposons cette syntaxe bizarre :

jsx
const [valeur, setValeur] = useState(valeurInitiale);
Élément	Rôle
useState(0)	Déclare un état initialisé à 0
valeur	La valeur actuelle de l'état
setValeur	La fonction pour changer l'état
[..., ...]	Destructuring d'un tableau [valeur, setter]
💡 Règle d'or React :

On ne modifie JAMAIS l'état directement.

❌ currentIndex = currentIndex + 1 (ne fait rien)

✅ setCurrentIndex(currentIndex + 1) (déclenche un re-rendu)

💡 Pourquoi ? Parce que quand tu appelles setCurrentIndex(...), React sait que l'état a changé → il re-rend le composant. Modifier directement la variable ne déclenche rien.

🔹 5.2 — Le "re-rendu" automatique
jsx
function goNext() {
    if (currentIndex < total - 1) {
        setCurrentIndex(currentIndex + 1);   // ← Change l'état
        setShowAnswer(false);
    }
}
💡 Ce qui se passe :

Tu cliques sur "Next".

setCurrentIndex(currentIndex + 1) est appelé.

React re-exécute la fonction App() de haut en bas.

current devient la nouvelle flashcard.

ProgressBar et FlashCard reçoivent les nouvelles props → ils se mettent à jour.

Le DOM est mis à jour automatiquement.

⚠️ Différence fondamentale avec le JS vanilla : tu ne touches jamais au DOM à la main. Tu décris ce que tu veux, React s'occupe du reste.

🔹 5.3 — Les props : communiquer entre composants
jsx
<ProgressBar current={currentIndex + 1} total={total} />
💡 Les props = des paramètres qu'on passe à un composant (comme des arguments de fonction).

jsx
function ProgressBar({ current, total }) {  // ← On les reçoit ici
    // ...
}
Analogie : imagine un composant <Button> :

jsx
<Button label="Envoyer" color="blue" onClick={handleClick} />
C'est comme appeler Button({ label: "Envoyer", color: "blue", onClick: handleClick }).

🔹 5.4 — Le rendu conditionnel
jsx
<p className="flashcard-text">
    {showAnswer ? answer : question}
</p>
💡 condition ? siVrai : siFaux = opérateur ternaire. En JSX, c'est LA façon d'afficher l'un ou l'autre.

Alternatives :

jsx
{showAnswer && <p>{answer}</p>}                    // Affiche si vrai
{showAnswer ? <p>{answer}</p> : <p>{question}</p>} // Sinon
🔹 5.5 — Le bouton toggle dynamique
jsx
<button onClick={onToggle}>
    {showAnswer ? 'Hide Answer' : 'Show Answer'}
</button>
💡 Le texte du bouton change selon l'état. Pas besoin de deux boutons → un seul qui s'adapte.

🔹 5.6 — Les boutons Previous/Next désactivés
jsx
<button disabled={!canGoPrevious}>‹ Previous</button>
<button disabled={!canGoNext}>Next ›</button>
jsx
canGoPrevious={currentIndex > 0}
canGoNext={currentIndex < total - 1}
💡 Logique :

Sur la 1ère carte → Previous désactivé.

Sur la dernière carte → Next désactivé.

⚠️ disabled sur un bouton :

Le bouton devient non-cliquable.

Le bouton ne reçoit pas le focus (accessibilité native).

Le curseur devient not-allowed (via CSS).

🔹 5.7 — La barre de progression dynamique
jsx
const percentage = Math.round((current / total) * 100);

<div
    className="progress-fill"
    style={{ width: `${percentage}%` }}
>
    {percentage}%
</div>
💡 Style dynamique en React : on passe un objet { width: '...' } via la prop style.

⚠️ Différence avec le HTML : en JSX, style prend un objet JavaScript, pas une chaîne. Les propriétés en camelCase (backgroundColor et non background-color).

💡 Exemple :

jsx
style={{ width: `${percentage}%`, backgroundColor: 'red' }}
🔹 5.8 — Pourquoi mettre setShowAnswer(false) dans goNext et goPrevious ?
jsx
function goNext() {
    setCurrentIndex(currentIndex + 1);
    setShowAnswer(false);    // ← On cache la réponse
}
💡 UX : quand on passe à la carte suivante, on veut voir la question, pas la réponse qui traîne.

Sans ça : si l'utilisateur révèle une réponse puis clique sur "Next", la nouvelle carte afficherait directement sa réponse. Mauvais UX.

🔹 5.9 — L'importance d'un composant "présentationnel"
Note comme FlashCard reçoit TOUTES ses données en props :

jsx
<FlashCard
    question={current.question}
    answer={current.answer}
    showAnswer={showAnswer}
    onToggle={toggleAnswer}
    onPrevious={goPrevious}
    onNext={goNext}
    canGoPrevious={currentIndex > 0}
    canGoNext={currentIndex < total - 1}
/>
💡 Ce composant ne sait RIEN de l'état global. Il reçoit tout en props. C'est un composant présentationnel (ou "dumb component").

✅ Avantages :

Réutilisable : tu peux l'utiliser ailleurs avec d'autres données.

Testable : facile à tester unitairement.

Isolé : il ne casse pas si l'app change.

💡 Pattern pro : séparer les composants "conteneur" (qui gèrent l'état) des composants "présentationnels" (qui affichent).

🔹 5.10 — Le "single source of truth"
jsx
const [currentIndex, setCurrentIndex] = useState(0);
💡 L'état currentIndex est LA SEULE source de vérité pour savoir quelle carte on affiche.

Le FlashCard affiche flashcards[currentIndex].

La ProgressBar affiche currentIndex + 1.

Les boutons Previous/Next s'activent selon currentIndex.

Tout découle d'un seul état. C'est ça, la beauté du state management moderne.