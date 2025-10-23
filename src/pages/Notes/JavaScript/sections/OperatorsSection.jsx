import React from "react";
import { FaCopy } from "react-icons/fa";

const OperatorsSection = ({ copyCode, copiedCode }) => {
  const codeExamples = {
    arithmetic: `let a = 10;
let b = 5;

console.log(a + b); // 15 (Addition)
console.log(a - b); // 5 (Subtraction)
console.log(a * b); // 50 (Multiplication)
console.log(a / b); // 2 (Division)
console.log(a % b); // 0 (Modulus)
console.log(a ** b); // 100000 (Exponentiation - ES6)

let c = 5;
c++; // c is now 6 (Increment)
c--; // c is now 5 (Decrement)`,
    assignment: `let x = 10;

x += 5; // equivalent to x = x + 5; (x is 15)
x -= 5; // equivalent to x = x - 5; (x is 10)
x *= 2; // equivalent to x = x * 2; (x is 20)
x /= 4; // equivalent to x = x / 4; (x is 5)`,
    comparison: `let val1 = 5;
let val2 = '5';

console.log(val1 == val2);  // true (loose equality, type coercion)
console.log(val1 === val2); // false (strict equality, no type coercion)

console.log(val1 != val2);  // false
console.log(val1 !== val2); // true

console.log(10 > 5);  // true
console.log(10 < 5);  // false
console.log(10 >= 10); // true`,
    logical: `let isAdult = true;
let hasLicense = false;

// AND (&&) - both must be true
console.log(isAdult && hasLicense); // false

// OR (||) - at least one must be true
console.log(isAdult || hasLicense); // true

// NOT (!) - inverts the boolean value
console.log(!isAdult); // false`,
    ternary: `const age = 18;
const canVote = (age >= 18) ? 'Yes, can vote' : 'No, cannot vote';

console.log(canVote); // "Yes, can vote"`,
  };

  return (
    <div className="card">
      <h2>
        <i className="fas fa-calculator" style={{ marginRight: "0.5rem" }}></i>
        Operators
      </h2>
      <p>
        Operators are symbols that perform operations on operands (values and
        variables).
      </p>

      <h3>Arithmetic Operators</h3>
      <p>Used for mathematical calculations.</p>
      <div className="code-container">
        <pre>
          <code>{codeExamples.arithmetic}</code>
        </pre>
        <button
          className={`copy-btn ${
            copiedCode === "arithmetic" ? "copied" : ""
          }`}
          onClick={() => copyCode(codeExamples.arithmetic, "arithmetic")}
        >
          <FaCopy />
        </button>
      </div>

      <h3>Assignment Operators</h3>
      <p>Used to assign values to variables.</p>
      <div className="code-container">
        <pre>
          <code>{codeExamples.assignment}</code>
        </pre>
        <button
          className={`copy-btn ${
            copiedCode === "assignment" ? "copied" : ""
          }`}
          onClick={() => copyCode(codeExamples.assignment, "assignment")}
        >
          <FaCopy />
        </button>
      </div>

      <h3>Comparison Operators</h3>
      <p>Used to compare two values and return a boolean result.</p>
      <div className="code-container">
        <pre>
          <code>{codeExamples.comparison}</code>
        </pre>
        <button
          className={`copy-btn ${
            copiedCode === "comparison" ? "copied" : ""
          }`}
          onClick={() => copyCode(codeExamples.comparison, "comparison")}
        >
          <FaCopy />
        </button>
      </div>

      <h3>Logical Operators</h3>
      <p>Used to combine or invert boolean values.</p>
      <div className="code-container">
        <pre>
          <code>{codeExamples.logical}</code>
        </pre>
        <button
          className={`copy-btn ${copiedCode === "logical" ? "copied" : ""}`}
          onClick={() => copyCode(codeExamples.logical, "logical")}
        >
          <FaCopy />
        </button>
      </div>

      <h3>Ternary Operator</h3>
      <p>A shortcut for an <code>if-else</code> statement.</p>
      <div className="code-container">
        <pre>
          <code>{codeExamples.ternary}</code>
        </pre>
        <button
          className={`copy-btn ${copiedCode === "ternary" ? "copied" : ""}`}
          onClick={() => copyCode(codeExamples.ternary, "ternary")}
        >
          <FaCopy />
        </button>
      </div>
    </div>
  );
};

export default OperatorsSection;