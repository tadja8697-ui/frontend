// Banque de questions
// Structure : { id, question, options, correctIndex }
// - options : tableau de 4 réponses
// - correctIndex : index (0-3) de la bonne réponse dans `options`

export const quizInfo = {
    title: 'JavaScript Basics',
    description: 'Test your knowledge of JavaScript fundamentals.',
    timePerQuestion: 60,    // secondes (0 = pas de timer)
};

export const questions = [
    {
        id: 1,
        question: "What is the difference between `let` and `const`?",
        options: [
            "There is no difference",
            "`let` allows reassignment, `const` does not",
            "`const` is function-scoped, `let` is block-scoped",
            "`let` is deprecated in modern JavaScript",
        ],
        correctIndex: 1,
    },
    {
        id: 2,
        question: "What does the `===` operator do?",
        options: [
            "Assigns a value",
            "Compares values only",
            "Compares values AND types",
            "Checks if a variable is defined",
        ],
        correctIndex: 2,
    },
    {
        id: 3,
        question: "What is a closure?",
        options: [
            "A way to close a browser tab",
            "A function that has access to its outer scope even after it returns",
            "A method to end a loop",
            "A syntax error",
        ],
        correctIndex: 1,
    },
    {
        id: 4,
        question: "What is the output of `typeof null`?",
        options: [
            "'null'",
            "'undefined'",
            "'object'",
            "'number'",
        ],
        correctIndex: 2,
    },
    {
        id: 5,
        question: "Which method adds an element to the END of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()",
        ],
        correctIndex: 0,
    },
    {
        id: 6,
        question: "What does `Array.prototype.map()` return?",
        options: [
            "The original array modified",
            "A new array with transformed elements",
            "A single value",
            "undefined",
        ],
        correctIndex: 1,
    },
    {
        id: 7,
        question: "What is a Promise?",
        options: [
            "A guarantee that code runs synchronously",
            "An object representing the eventual result of an async operation",
            "A type of loop",
            "A CSS property",
        ],
        correctIndex: 1,
    },
    {
        id: 8,
        question: "What is the event loop?",
        options: [
            "A loop that listens for keyboard events",
            "A mechanism that allows non-blocking async operations in single-threaded JS",
            "A deprecated React hook",
            "A way to loop through DOM elements",
        ],
        correctIndex: 1,
    },
    {
        id: 9,
        question: "What is destructuring?",
        options: [
            "Deleting properties from an object",
            "Extracting values from arrays or objects into variables",
            "A way to destroy the DOM",
            "A syntax error",
        ],
        correctIndex: 1,
    },
    {
        id: 10,
        question: "What does `useState` return?",
        options: [
            "Just the current value",
            "Just the setter function",
            "An array with the value and its setter",
            "An object with get/set methods",
        ],
        correctIndex: 2,
    },
];