// Les 3 modes de session
export const MODES = {
    WORK: 'work',
    SHORT_BREAK: 'shortBreak',
    LONG_BREAK: 'longBreak',
};

// Configuration par défaut (en minutes)
export const DEFAULT_CONFIG = {
    work: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4,
};

// Labels pour l'affichage
export const MODE_LABELS = {
    [MODES.WORK]: 'Work',
    [MODES.SHORT_BREAK]: 'Short Break',
    [MODES.LONG_BREAK]: 'Long Break',
};

// Couleurs par mode (utilisées dans le CSS via une classe)
export const MODE_CLASSES = {
    [MODES.WORK]: 'mode--work',
    [MODES.SHORT_BREAK]: 'mode--short-break',
    [MODES.LONG_BREAK]: 'mode--long-break',
};