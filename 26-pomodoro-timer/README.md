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
Le Pomodoro Timer est LE projet parfait pour ton portfolio. Pourquoi ?

Utile au quotidien → tu vas t'en servir.

Impressionnant visuellement → couleurs qui changent, animations.

Technique → timers, state, accessibilité, audio.

Universel → tout le monde connaît la méthode Pomodoro.

Les 3 règles à graver :
1. isRunning seul dans les deps du useEffect. Sinon l'interval se recrée chaque seconde.

2. Callback dans useRef. Sinon boucle infinie de re-renders.

3. aria-label sur le timer, PAS aria-live. Sinon le lecteur d'écran parle chaque seconde.

Le test mental ultime :
Tape 25:00, attends 5 secondes, tape pause.

Le timer doit être à 24:55 exactement. ✅

Si tu vois 24:54 ou 24:56 → il y a un problème de précision.

Si tu vois 24:59 → l'interval ne tourne pas vraiment.

Pour aller plus loin :
MDN setInterval : developer.mozilla.org/fr/docs/Web/API/setInterval

Web Audio API : developer.mozilla.org/fr/docs/Web/API/Web_Audio_API

Notification API : developer.mozilla.org/fr/docs/Web/API/Notifications_API

Pomofocus (inspiration) : pomofocus.io

Le pattern "Pomodoro Timer" :

1. STATE (dans useTimer)
   { mode, timeLeft, isRunning, sessionsCompleted, config }

2. setInterval DANS useEffect
   useEffect(() => {
       if (!isRunning) return;
       const id = setInterval(() => {
           setTimeLeft((prev) => prev <= 1 ? 0 : prev - 1);
       }, 1000);
       return () => clearInterval(id);
   }, [isRunning]);   ← isRunning SEULEMENT

3. FIN DE SESSION (effet séparé)
   if (timeLeft === 0 && isRunning) {
       setIsRunning(false);
       playBeep();
       if (mode === WORK) {
           nextSessions = sessionsCompleted + 1;
           nextMode = (nextSessions % 4 === 0) ? LONG : SHORT;
       } else {
           nextMode = WORK;
       }
       setMode(nextMode);
       setTimeLeft(config[nextMode] * 60);
   }

4. CALLBACK DANS useRef
   const cbRef = useRef(onSessionEnd);
   useEffect(() => { cbRef.current = onSessionEnd; }, [onSessionEnd]);

5. SON via Web Audio API
   const osc = ctx.createOscillator();
   osc.frequency.value = 880;
   osc.start(); osc.stop(t + 0.15);

6. COULEURS PAR MODE
   .app.mode--work        { background: red; }
   .app.mode--short-break { background: green; }
   .app.mode--long-break  { background: blue; }

RÈGLES D'OR :
   - isRunning SEUL dans les deps du useEffect (pas timeLeft)
   - Callback dans useRef pour éviter les boucles
   - clearInterval TOUJOURS dans le cleanup
   - padStart(2, '0') pour le format
   - tabular-nums pour la stabilité visuelle
   - aria-label sur le timer (PAS aria-live)

🎯 ÉTAPE 4 : Explication détaillée
🔹 4.1 — Le setInterval dans un useEffect
javascript
useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
        setTimeLeft((prev) => prev <= 1 ? 0 : prev - 1);
    }, 1000);

    return () => clearInterval(id);
}, [isRunning]);
💡 Points clés :

Le useEffect se déclenche quand isRunning change.

Si isRunning === false, on sort immédiatement (pas d'interval).

Cleanup : clearInterval quand le composant change ou se démonte → pas de fuite.

Updater function (prev) => prev - 1 → toujours la bonne valeur, même sur plusieurs ticks.

⚠️ Piège : si on met [isRunning, timeLeft] en dépendances → l'interval est recréé chaque seconde → inefficace. On ne met que [isRunning].

🔹 4.2 — L'effet de fin de session
javascript
useEffect(() => {
    if (timeLeft !== 0 || !isRunning) return;

    setIsRunning(false);
    onSessionEndRef.current?.();

    // Calcul du prochain mode
    let nextMode;
    let nextSessions = sessionsCompleted;

    if (mode === MODES.WORK) {
        nextSessions = sessionsCompleted + 1;
        setSessionsCompleted(nextSessions);
        nextMode = (nextSessions % config.sessionsBeforeLongBreak === 0)
            ? MODES.LONG_BREAK
            : MODES.SHORT_BREAK;
    } else {
        nextMode = MODES.WORK;
    }

    setMode(nextMode);
    setTimeLeft(config[nextMode] * 60);
}, [timeLeft, isRunning, mode, sessionsCompleted, config]);
Décomposons la logique :

On ne fait rien si timeLeft !== 0 ou si pas en cours.

On arrête le timer.

On joue le son.

Si on était en WORK :

On incrémente sessionsCompleted.

Si sessionsCompleted % 4 === 0 → LONG_BREAK.

Sinon → SHORT_BREAK.

Si on était en BREAK → retour au WORK.

On reset timeLeft à la nouvelle durée.

🔹 4.3 — Le onSessionEndRef (pattern avancé)
javascript
const onSessionEndRef = useRef(onSessionEnd);
useEffect(() => {
    onSessionEndRef.current = onSessionEnd;
}, [onSessionEnd]);
💡 Pourquoi ce pattern ?

Si on met onSessionEnd directement dans les deps du useEffect, chaque re-render du parent recrée la fonction → l'effet se redéclenche → boucle infinie.

Solution : on stocke la fonction dans une ref (qui ne change pas) et on la lit au moment voulu.

C'est un pattern très répandu dans les libs React (React Query, React Table...).

🔹 4.4 — Le son via Web Audio API
javascript
const oscillator = ctx.createOscillator();
oscillator.frequency.value = 880;
oscillator.type = 'sine';
oscillator.start();
oscillator.stop(ctx.currentTime + 0.15);
💡 Décomposons :

AudioContext : moteur audio du navigateur.

OscillatorNode : génère une onde sonore (sinus, carré, triangle).

GainNode : contrôle le volume.

frequency.value : la note (880 Hz = La 4).

start() / stop() : début et fin.

3 bips = 3 oscillateurs démarrés à 0s, 0.2s, 0.4s.

⚠️ Politique navigateur : AudioContext démarre en pause jusqu'à une interaction utilisateur. On fait ctx.resume() au moment du clic sur Start.

🔹 4.5 — Les classes de mode (couleurs)
css
.app.mode--work        { background-color: #dc2626; }  /* Rouge */
.app.mode--short-break { background-color: #16a34a; }  /* Vert */
.app.mode--long-break  { background-color: #2563eb; }  /* Bleu */
💡 Dans App.jsx :

jsx
<div className={`app ${MODE_CLASSES[timer.mode]}`}>
Résultat : quand on passe de Work à Short Break, tout le fond change avec une transition de 0.4s. Effet visuel très satisfaisant. 🎨

🔹 4.6 — Le formatage du temps
javascript
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
Exemples :

1500 → "25:00" ✅

65 → "01:05" ✅

5 → "00:05" ✅

💡 padStart(2, '0') : ajoute un zéro devant si nécessaire. Essentiel pour un affichage propre.

🔹 4.7 — font-variant-numeric: tabular-nums
css
.timer-time {
    font-variant-numeric: tabular-nums;
}
💡 Sans ça : les chiffres ont des largeurs différentes → le timer "saute" visuellement chaque seconde.

Avec : tous les chiffres ont la même largeur → le timer reste stable. Détail qui change tout. ✨

🔹 4.8 — L'accessibilité du timer
jsx
<p
    className="timer-time"
    aria-label={`Time left: ${Math.floor(timeLeft / 60)} minutes and ${timeLeft % 60} seconds`}
>
    {formattedTime}
</p>
💡 Pourquoi aria-label ? Un lecteur d'écran lirait "25:00" comme "25 deux points 00". Avec aria-label, il lit "Time left: 25 minutes and 0 seconds". Bien plus clair.

⚠️ Piège : ne pas mettre aria-live sur le timer. Sinon, le lecteur d'écran annonce chaque seconde → enfer auditif. 🚫

🔹 4.9 — La modale accessible
jsx
<div role="dialog" aria-modal="true" aria-labelledby="settings-title">
💡 Pattern standard pour une modale :

role="dialog" : annonce une boîte de dialogue.

aria-modal="true" : bloque le reste de la page.

aria-labelledby : lie le titre à la modale.

Bonus à ajouter : focus trap (garder le focus dans la modale) + Échap pour fermer + retour du focus au bouton d'origine.

🔹 4.10 — prefers-reduced-motion
css
@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
        animation: none !important;
    }
}
💡 Accessibilité : certains utilisateurs souffrent de troubles vestibulaires et désactivent les animations dans leur OS. Ce media query respecte leur choix.

C'est une exigence WCAG 2.1 (niveau AA). ✅