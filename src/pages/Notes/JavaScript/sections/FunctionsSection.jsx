import React from "react";

const FunctionsSection = ({ copyCode, copiedCode }) => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div className="card">
        <h2><i className="fas fa-code"></i> 3. Functions</h2>
        <p>Functions are reusable blocks of code that perform specific tasks. They're fundamental to JavaScript programming.</p>
        
        <h3>Function Declaration</h3>
        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "declaration" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Function call
console.log(greet("Alice"));  // "Hello, Alice!"
console.log(greet("Bob"));    // "Hello, Bob!"

// Function with multiple parameters
function add(a, b) {
    return a + b;
}

console.log(add(5, 3));       // 8`, "declaration")}
          >
            {copiedCode === "declaration" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Function call
console.log(greet("Alice"));  // "Hello, Alice!"
console.log(greet("Bob"));    // "Hello, Bob!"

// Function with multiple parameters
function add(a, b) {
    return a + b;
}

console.log(add(5, 3));       // 8`}</pre>
        </div>

        <h3>Arrow Functions (ES6)</h3>
        <p>Arrow functions provide a shorter syntax for writing functions:</p>
        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "arrow" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Arrow function syntax
const multiply = (a, b) => {
    return a * b;
};

// Shorter arrow function (single expression)
const square = x => x * x;

// Arrow function with no parameters
const sayHello = () => "Hello, World!";

// Examples
console.log(multiply(4, 5));  // 20
console.log(square(6));       // 36
console.log(sayHello());      // "Hello, World!"

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);         // [2, 4, 6, 8, 10]`, "arrow")}
          >
            {copiedCode === "arrow" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Arrow function syntax
const multiply = (a, b) => {
    return a * b;
};

// Shorter arrow function (single expression)
const square = x => x * x;

// Arrow function with no parameters
const sayHello = () => "Hello, World!";

// Examples
console.log(multiply(4, 5));  // 20
console.log(square(6));       // 36
console.log(sayHello());      // "Hello, World!"

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);         // [2, 4, 6, 8, 10]`}</pre>
        </div>

        <h3>Function Scope & Closures</h3>
        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "scope" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Function scope
function outerFunction(x) {
    // This is the outer function's scope
    
    function innerFunction(y) {
        // This is the inner function's scope
        // It can access variables from outer scope
        return x + y;
    }
    
    return innerFunction;
}

// Creating a closure
const addFive = outerFunction(5);
console.log(addFive(3));  // 8 (5 + 3)

// Practical closure example - counter
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3`, "scope")}
          >
            {copiedCode === "scope" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Function scope
function outerFunction(x) {
    // This is the outer function's scope
    
    function innerFunction(y) {
        // This is the inner function's scope
        // It can access variables from outer scope
        return x + y;
    }
    
    return innerFunction;
}

// Creating a closure
const addFive = outerFunction(5);
console.log(addFive(3));  // 8 (5 + 3)

// Practical closure example - counter
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3`}</pre>
        </div>
      </div>
    </section>
  );
};

export default FunctionsSection;