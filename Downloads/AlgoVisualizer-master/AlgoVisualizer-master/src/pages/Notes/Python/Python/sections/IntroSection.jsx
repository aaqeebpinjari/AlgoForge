import React from "react";

const IntroSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-play-circle"></i> 1. Introduction to Python
      </h2>
      <p>
        Python is a high-level, interpreted, general-purpose programming language
        known for its simplicity and readability. Its clean syntax allows
        developers to write code quickly and efficiently, making it ideal for
        beginners and experts alike.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>
          <strong>Readable and concise syntax:</strong> Emphasizes code readability
        </li>
        <li>
          <strong>Interpreted language:</strong> Executes code line by line
        </li>
        <li>
          <strong>Dynamic typing:</strong> Variables do not require explicit types
        </li>
        <li>
          <strong>Large standard library:</strong> Includes modules for web, data, and more
        </li>
        <li>
          <strong>Cross-platform:</strong> Runs on Windows, macOS, Linux, and more
        </li>
      </ul>

      <div
        style={{
          background: "#eff6ff",
          borderLeft: "4px solid #3b82f6",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Python was created by Guido van Rossum and first
        released in 1991. It has since grown into one of the most popular
        programming languages in the world.
      </div>
    </div>
  </section>
);

export default IntroSection;
