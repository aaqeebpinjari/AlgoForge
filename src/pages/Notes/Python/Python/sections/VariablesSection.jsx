import React from "react";

const VariablesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-pencil-alt"></i> 5. Python Variables
      </h2>
      <p>
        Variables in Python are used to store data values. Python is dynamically typed, which means you do not need to declare the type explicitly. The variable type is inferred from the value assigned.
      </p>

      <h3>Variable Rules</h3>
      <ul>
        <li>Names must start with a letter or underscore (<code>_</code>).</li>
        <li>Names can contain letters, digits, and underscores.</li>
        <li>Variable names are case-sensitive (<code>name</code> ≠ <code>Name</code>).</li>
        <li>Cannot use Python keywords as variable names.</li>
      </ul>

      <h3>Examples</h3>
      <pre>{`# Assigning values to variables
name = "Alice"        # string
age = 25              # int
height = 5.7          # float
is_student = True     # boolean

# Multiple assignment
x, y, z = 1, 2, 3

# Swapping variables
a, b = 10, 20
a, b = b, a  # a = 20, b = 10`}</pre>

      <div
        style={{
          background: "#eff6ff",
          borderLeft: "4px solid #3b82f6",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Python variables do not require explicit declaration, making code concise and readable. Assigning multiple variables in one line is a Pythonic practice.
      </div>
    </div>
  </section>
);

export default VariablesSection;
