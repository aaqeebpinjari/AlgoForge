import React from "react";

const ObjectsSection = ({ copyCode, copiedCode }) => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div className="card">
        <h2><i className="fas fa-cube"></i> 4. Objects & Arrays</h2>
        
        <h3>Objects</h3>
        <p>Objects are collections of key-value pairs, perfect for storing related data:</p>
        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "objects" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Creating objects
const person = {
    name: "Alice",
    age: 30,
    city: "New York",
    isStudent: false
};

// Accessing object properties
console.log(person.name);        // "Alice"
console.log(person["age"]);      // 30

// Adding new properties
person.email = "alice@email.com";
person.hobbies = ["reading", "coding"];

// Object methods
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    // ES6 method shorthand
    multiply(a, b) {
        return a * b;
    }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.multiply(4, 6)); // 24`, "objects")}
          >
            {copiedCode === "objects" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Creating objects
const person = {
    name: "Alice",
    age: 30,
    city: "New York",
    isStudent: false
};

// Accessing object properties
console.log(person.name);        // "Alice"
console.log(person["age"]);      // 30

// Adding new properties
person.email = "alice@email.com";
person.hobbies = ["reading", "coding"];

// Object methods
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    // ES6 method shorthand
    multiply(a, b) {
        return a * b;
    }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.multiply(4, 6)); // 24`}</pre>
        </div>

        <h3>Arrays</h3>
        <p>Arrays are ordered lists of values, great for storing collections:</p>
        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "arrays" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Creating arrays
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true, null];

// Accessing array elements
console.log(fruits[0]);          // "apple"
console.log(numbers.length);     // 5

// Array methods
fruits.push("grape");            // Add to end
console.log(fruits);             // ["apple", "banana", "orange", "grape"]

const firstFruit = fruits.shift(); // Remove from start
console.log(firstFruit);         // "apple"

// Array iteration
numbers.forEach(num => {
    console.log(num * 2);        // 2, 4, 6, 8, 10
});

// Array transformation
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((total, n) => total + n, 0);

console.log(doubled);            // [2, 4, 6, 8, 10]
console.log(evens);              // [2, 4]
console.log(sum);                // 15`, "arrays")}
          >
            {copiedCode === "arrays" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Creating arrays
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true, null];

// Accessing array elements
console.log(fruits[0]);          // "apple"
console.log(numbers.length);     // 5

// Array methods
fruits.push("grape");            // Add to end
console.log(fruits);             // ["apple", "banana", "orange", "grape"]

const firstFruit = fruits.shift(); // Remove from start
console.log(firstFruit);         // "apple"

// Array iteration
numbers.forEach(num => {
    console.log(num * 2);        // 2, 4, 6, 8, 10
});

// Array transformation
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((total, n) => total + n, 0);

console.log(doubled);            // [2, 4, 6, 8, 10]
console.log(evens);              // [2, 4]
console.log(sum);                // 15`}</pre>
        </div>

        <h3>Destructuring</h3>
        <p>ES6 destructuring makes it easy to extract values from objects and arrays:</p>
        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "destructuring" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Object destructuring
const user = {
    name: "John",
    age: 25,
    email: "john@example.com"
};

const { name, age } = user;
console.log(name);  // "John"
console.log(age);   // 25

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first);   // "red"
console.log(second);  // "green"

// Function parameter destructuring
function displayUser({ name, age }) {
    console.log(\`\${name} is \${age} years old\`);
}

displayUser(user);  // "John is 25 years old"`, "destructuring")}
          >
            {copiedCode === "destructuring" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Object destructuring
const user = {
    name: "John",
    age: 25,
    email: "john@example.com"
};

const { name, age } = user;
console.log(name);  // "John"
console.log(age);   // 25

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first);   // "red"
console.log(second);  // "green"

// Function parameter destructuring
function displayUser({ name, age }) {
    console.log(\`\${name} is \${age} years old\`);
}

displayUser(user);  // "John is 25 years old"`}</pre>
        </div>
      </div>
    </section>
  );
};

export default ObjectsSection;