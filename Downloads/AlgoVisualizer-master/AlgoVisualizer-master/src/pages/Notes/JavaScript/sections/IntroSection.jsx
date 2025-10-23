import React from "react";

const IntroSection = ({ copyCode, copiedCode }) => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div className="card">
        <h2><i className="fas fa-play-circle"></i> 1. Introduction to JavaScript</h2>
        <p>JavaScript is a versatile, high-level programming language that powers the modern web. Originally created for web browsers, it's now used for servers, mobile apps, desktop applications, and more.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li><strong>Dynamic:</strong> Variables can change types at runtime</li>
          <li><strong>Interpreted:</strong> No compilation step needed</li>
          <li><strong>Event-driven:</strong> Responds to user interactions</li>
          <li><strong>Cross-platform:</strong> Runs everywhere - browsers, servers, mobile</li>
          <li><strong>Object-oriented:</strong> Supports objects and classes</li>
        </ul>

        <h3>Your First JavaScript Program</h3>
        <p>Let's start with a simple "Hello, World!" program:</p>
        <div className="code-container">
          <button 
            className={`copy-btn ${copiedCode === "intro" ? "copied" : ""}`} 
            onClick={() => copyCode(`// Your first JavaScript program
console.log("Hello, World!");

// Variables and basic operations
let name = "JavaScript";
let year = 2024;
let isAwesome = true;

console.log("Welcome to " + name + "!");
console.log("Current year: " + year);
console.log("Is JavaScript awesome? " + isAwesome);`, "intro")}
          >
            {copiedCode === "intro" ? "Copied!" : "Copy"}
          </button>
          <pre>{`// Your first JavaScript program
console.log("Hello, World!");

// Variables and basic operations
let name = "JavaScript";
let year = 2024;
let isAwesome = true;

console.log("Welcome to " + name + "!");
console.log("Current year: " + year);
console.log("Is JavaScript awesome? " + isAwesome);`}</pre>
        </div>

        <h3>Where JavaScript Runs</h3>
        <ul>
          <li><strong>Web Browsers:</strong> Chrome, Firefox, Safari, Edge</li>
          <li><strong>Servers:</strong> Node.js for backend development</li>
          <li><strong>Mobile Apps:</strong> React Native, Ionic</li>
          <li><strong>Desktop Apps:</strong> Electron (VS Code, Discord)</li>
        </ul>
      </div>
    </section>
  );
};

export default IntroSection;