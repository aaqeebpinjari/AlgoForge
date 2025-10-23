import React from "react";
import { FaCopy } from "react-icons/fa";

const IntroSection = ({ copyCode, copiedCode }) => {
  const helloWorldCode = `console.log("Hello, World!");`;

  return (
    <section style={{ marginBottom: "2rem" }}>
      <div className="card">
        <h2>
          <i className="fab fa-js-square" style={{ marginRight: "0.5rem" }}></i>
          Introduction to JavaScript
        </h2>
        <p>
          JavaScript is a high-level, interpreted programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS. It enables interactive web pages and is an essential part of web
          applications.
        </p>
        <h3>Key Features</h3>
        <ul>
          <li><strong>Client-Side Scripting:</strong> Runs directly in the user's browser.</li>
          <li><strong>Asynchronous:</strong> Handles operations like network requests without blocking the main thread.</li>
          <li><strong>Dynamically Typed:</strong> Variable types are determined at runtime.</li>
          <li><strong>Vast Ecosystem:</strong> Huge number of libraries and frameworks (React, Angular, Vue.js).</li>
        </ul>
        <div className="code-container">
          <pre><code>{helloWorldCode}</code></pre>
          <button className={`copy-btn ${copiedCode === "intro" ? "copied" : ""}`} onClick={() => copyCode(helloWorldCode, "intro")}>
            <FaCopy />
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;