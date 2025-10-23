import React from "react";

const SyntaxSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-code"></i> 3. Python Syntax
      </h2>
      <p>
        Python syntax is designed to be clean and readable. Indentation is crucial
        as it defines code blocks instead of curly braces. Python uses
        dynamic typing, and statements do not require semicolons.
      </p>

      <h3>Basic Syntax Rules</h3>
      <ul>
        <li>
          <strong>Indentation:</strong> Use 4 spaces per indentation level. Example:
          <pre>
{`if True:
    print("Hello, Python!")`}
          </pre>
        </li>
        <li>
          <strong>Comments:</strong> Use <code>#</code> for single-line and triple quotes for multi-line comments.
          <pre>
{`# This is a single-line comment
"""
This is a
multi-line comment
"""`}
          </pre>
        </li>
        <li>
          <strong>Variables:</strong> Python variables do not require declaration keywords.
          <pre>{`x = 5
name = "Alice"`}</pre>
        </li>
        <li>
          <strong>Statements:</strong> One statement per line, or use semicolon to separate multiple.
          <pre>{`a = 5; b = 10; print(a + b)`}</pre>
        </li>
        <li>
          <strong>Functions:</strong> Defined using <code>def</code> keyword.
          <pre>
{`def greet():
    print("Hello!")`}
          </pre>
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
        <strong>Note:</strong> Python enforces readability. Proper indentation and consistent syntax
        help prevent errors and improve maintainability.
      </div>
    </div>
  </section>
);

export default SyntaxSection;
