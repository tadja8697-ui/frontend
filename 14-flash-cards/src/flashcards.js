// Liste des 20 flashcards JavaScript
// (Tu peux en ajouter/retirer, l'app s'adapte automatiquement)

export const flashcards = [
  {
    id: 1,
    question: "What is the difference between var, let, and const?",
    answer: "In JavaScript, var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified."
  },
  {
    id: 2,
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to variables from its outer (enclosing) scope even after the outer function has returned."
  },
  {
    id: 3,
    question: "What is the difference between == and ===?",
    answer: "== compares values after type coercion, while === compares both value and type without coercion. === is generally preferred."
  },
  {
    id: 4,
    question: "What is hoisting in JavaScript?",
    answer: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope before execution. var declarations are hoisted (undefined), but let/const are in a temporal dead zone."
  },
  {
    id: 5,
    question: "What is the event loop?",
    answer: "The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded, by offloading operations to the system and picking up their callbacks when ready."
  },
  {
    id: 6,
    question: "What is the difference between null and undefined?",
    answer: "undefined means a variable has been declared but not assigned a value. null is an explicit assignment representing 'no value'."
  },
  {
    id: 7,
    question: "What is a Promise?",
    answer: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation, with three states: pending, fulfilled, or rejected."
  },
  {
    id: 8,
    question: "What is async/await?",
    answer: "async/await is syntactic sugar on top of Promises that lets you write asynchronous code that looks synchronous, using the async keyword before a function and await before a Promise."
  },
  {
    id: 9,
    question: "What is the difference between map, filter, and reduce?",
    answer: "map transforms each element and returns a new array; filter returns a new array with elements that pass a test; reduce accumulates all elements into a single value."
  },
  {
    id: 10,
    question: "What is the DOM?",
    answer: "The DOM (Document Object Model) is a programming interface that represents the HTML document as a tree of objects, allowing JavaScript to modify structure, style, and content."
  },
  {
    id: 11,
    question: "What is the difference between an arrow function and a regular function?",
    answer: "Arrow functions don't have their own this, arguments, or super. They inherit this from the enclosing scope, making them unsuitable for methods that need their own this."
  },
  {
    id: 12,
    question: "What is a higher-order function?",
    answer: "A higher-order function is a function that takes one or more functions as arguments, returns a function, or both. Examples: map, filter, reduce."
  },
  {
    id: 13,
    question: "What is destructuring?",
    answer: "Destructuring is a syntax that lets you extract values from arrays or properties from objects into distinct variables, e.g., const { name } = user;"
  },
  {
    id: 14,
    question: "What is the spread operator?",
    answer: "The spread operator (...) expands an iterable (array, object) into individual elements. Useful for copying, merging, or passing arguments."
  },
  {
    id: 15,
    question: "What is the difference between localStorage and sessionStorage?",
    answer: "localStorage persists data until explicitly cleared, while sessionStorage clears when the browser tab is closed. Both store key-value pairs as strings."
  },
  {
    id: 16,
    question: "What is event delegation?",
    answer: "Event delegation is a technique where you attach a single event listener to a parent element instead of multiple children, relying on event bubbling to handle events efficiently."
  },
  {
    id: 17,
    question: "What is the difference between call, apply, and bind?",
    answer: "call and apply invoke a function with a specified this (apply takes an array of args); bind returns a new function with this bound, without invoking it."
  },
  {
    id: 18,
    question: "What is a module in JavaScript?",
    answer: "A module is a file that exports values (functions, objects, etc.) using export, and other files can import them using import. Modules keep code organized and scoped."
  },
  {
    id: 19,
    question: "What is currying?",
    answer: "Currying is the technique of transforming a function that takes multiple arguments into a sequence of functions that each take a single argument."
  },
  {
    id: 20,
    question: "What is memoization?",
    answer: "Memoization is an optimization technique where you cache the results of expensive function calls and return the cached result when the same inputs occur again."
  }
];