import React from "react";
import { FaCopy } from "react-icons/fa";

const ModernJavaScriptSection = ({ copyCode, copiedCode }) => {
  const codeExamples = {
    letConst: `// 'var' is function-scoped and can be re-declared.
var name = 'John';
var name = 'Jane'; // No error

// 'let' is block-scoped.
let age = 30;
// let age = 31; // This would cause a SyntaxError.
age = 31; // This is fine.

// 'const' is block-scoped and cannot be re-assigned.
const birthYear = 1990;
// birthYear = 1991; // This would cause a TypeError.`,
    arrowFunctions: `// Traditional function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function
const subtract = (a, b) => {
  return a - b;
};

// Arrow function with implicit return (for single expressions)
const multiply = (a, b) => a * b;

// Arrow function with a single parameter
const square = num => num * num;`,
    destructuring: `// Object destructuring
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30
};
const { firstName, age } = person;
console.log(firstName, age); // John 30

// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, , fourth] = numbers;
console.log(first, second, fourth); // 1 2 4`,
    spreadRest: `// Spread operator (...)
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Rest operator (...)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10`,
  };

  return (
    <div className="card">
      <h2>
        <i className="fas fa-rocket" style={{ marginRight: "0.5rem" }}></i>
        Modern JavaScript (ES6+)
      </h2>
      <p>
        ECMAScript 2015 (ES6) and subsequent versions introduced many new
        features that make JavaScript more powerful and easier to write.
      </p>

      <h3>
        <code>let</code> and <code>const</code>
      </h3>
      <p>
        These are new ways to declare variables that offer block-scoping,
        which is more predictable than <code>var</code>.
      </p>
      <div className="code-container">
        <pre><code>{codeExamples.letConst}</code></pre>
        <button className={`copy-btn ${copiedCode === "letConst" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.letConst, "letConst")}>
          <FaCopy />
        </button>
      </div>

      <h3>Arrow Functions</h3>
      <p>A more concise syntax for writing function expressions.</p>
      <div className="code-container">
        <pre><code>{codeExamples.arrowFunctions}</code></pre>
        <button className={`copy-btn ${copiedCode === "arrowFunctions" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.arrowFunctions, "arrowFunctions")}>
          <FaCopy />
        </button>
      </div>

      <h3>Destructuring Assignment</h3>
      <p>
        A syntax that makes it possible to unpack values from arrays, or
        properties from objects, into distinct variables.
      </p>
      <div className="code-container">
        <pre><code>{codeExamples.destructuring}</code></pre>
        <button className={`copy-btn ${copiedCode === "destructuring" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.destructuring, "destructuring")}>
          <FaCopy />
        </button>
      </div>

      <h3>Spread and Rest Operators</h3>
      <p>The <code>...</code> syntax can be used to expand iterables or collect multiple arguments.</p>
      <div className="code-container">
        <pre><code>{codeExamples.spreadRest}</code></pre>
        <button className={`copy-btn ${copiedCode === "spreadRest" ? "copied" : ""}`} onClick={() => copyCode(codeExamples.spreadRest, "spreadRest")}>
          <FaCopy />
        </button>
      </div>
    </div>
  );
};

export default ModernJavaScriptSection;