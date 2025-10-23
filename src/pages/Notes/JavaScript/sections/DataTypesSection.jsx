import React from "react";

const DataTypesSection = ({ copyCode, copiedCode }) => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div className="card">
        <h2><i className="fas fa-database"></i> 2. Data Types & Variables</h2>
        
        <h3>Variable Declaration</h3>
        <p>JavaScript has three ways to declare variables:</p>
        <ul>
          <li><strong>let:</strong> Block-scoped, can be reassigned</li>
          <li><strong>const:</strong> Block-scoped, cannot be reassigned</li>
          <li><strong>var:</strong> Function-scoped (avoid in modern JS)</li>
        </ul>

        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "variables" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Variable declarations
let age = 25;           // Can be changed
const name = "Alice";   // Cannot be changed
var city = "New York";  // Old way (avoid)

// Reassignment
age = 26;              // ✅ Works
// name = "Bob";       // ❌ Error! const cannot be reassigned

console.log(age, name, city);`, "variables")}
          >
            {copiedCode === "variables" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Variable declarations
let age = 25;           // Can be changed
const name = "Alice";   // Cannot be changed
var city = "New York";  // Old way (avoid)

// Reassignment
age = 26;              // ✅ Works
// name = "Bob";       // ❌ Error! const cannot be reassigned

console.log(age, name, city);`}</pre>
        </div>

        <h3>Primitive Data Types</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th style={{ padding: "0.75rem 1rem", border: "1px solid #dee2e6" }}>Type</th>
              <th style={{ padding: "0.75rem 1rem", border: "1px solid #dee2e6" }}>Example</th>
              <th style={{ padding: "0.75rem 1rem", border: "1px solid #dee2e6" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Number", "42, 3.14", "Integers and floating-point numbers"],
              ["String", '"Hello", \'World\'', "Text data"],
              ["Boolean", "true, false", "True or false values"],
              ["Undefined", "undefined", "Variable declared but not assigned"],
              ["Null", "null", "Intentionally empty value"],
              ["Symbol", "Symbol('id')", "Unique identifier"],
              ["BigInt", "123n", "Large integers"]
            ].map(([type, example, desc]) => (
              <tr key={type} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "0.75rem 1rem" }}><code>{type}</code></td>
                <td style={{ padding: "0.75rem 1rem" }}><code>{example}</code></td>
                <td style={{ padding: "0.75rem 1rem" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Data Types Example</h3>
        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "datatypes" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Primitive data types
let num = 42;                    // Number
let pi = 3.14159;               // Number (float)
let message = "Hello, World!";   // String
let isActive = true;            // Boolean
let data;                       // Undefined
let empty = null;               // Null
let id = Symbol('user');        // Symbol
let bigNumber = 123456789n;     // BigInt

// Check types
console.log(typeof num);        // "number"
console.log(typeof message);    // "string"
console.log(typeof isActive);   // "boolean"
console.log(typeof data);       // "undefined"
console.log(typeof empty);      // "object" (quirk!)
console.log(typeof id);         // "symbol"
console.log(typeof bigNumber);  // "bigint"`, "datatypes")}
          >
            {copiedCode === "datatypes" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Primitive data types
let num = 42;                    // Number
let pi = 3.14159;               // Number (float)
let message = "Hello, World!";   // String
let isActive = true;            // Boolean
let data;                       // Undefined
let empty = null;               // Null
let id = Symbol('user');        // Symbol
let bigNumber = 123456789n;     // BigInt

// Check types
console.log(typeof num);        // "number"
console.log(typeof message);    // "string"
console.log(typeof isActive);   // "boolean"
console.log(typeof data);       // "undefined"
console.log(typeof empty);      // "object" (quirk!)
console.log(typeof id);         // "symbol"
console.log(typeof bigNumber);  // "bigint"`}</pre>
        </div>
      </div>
    </section>
  );
};

export default DataTypesSection;