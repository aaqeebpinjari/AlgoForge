import React from "react";

const OperatorsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-calculator"></i> 6. Python Operators
      </h2>
      <p>
        Operators in Python are symbols used to perform operations on variables and values. Python supports several types of operators including arithmetic, comparison, logical, assignment, and more.
      </p>

      <h3>Types of Operators</h3>
      <ul>
        <li>
          <strong>Arithmetic:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, <code>//</code>, <code>**</code>
        </li>
        <li>
          <strong>Comparison:</strong> <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>
        </li>
        <li>
          <strong>Logical:</strong> <code>and</code>, <code>or</code>, <code>not</code>
        </li>
        <li>
          <strong>Assignment:</strong> <code>=</code>, <code>+=</code>, <code>-=
</code>, <code>*=</code>, <code>/=</code>
        </li>
        <li>
          <strong>Membership:</strong> <code>in</code>, <code>not in</code>
        </li>
        <li>
          <strong>Identity:</strong> <code>is</code>, <code>is not</code>
        </li>
      </ul>

      <h3>Examples</h3>
      <pre>{`# Arithmetic operators
a = 10
b = 3
print(a + b)   # 13
print(a - b)   # 7
print(a * b)   # 30
print(a / b)   # 3.333...
print(a % b)   # 1
print(a ** b)  # 1000
print(a // b)  # 3

# Logical operators
x = True
y = False
print(x and y) # False
print(x or y)  # True
print(not x)   # False

# Comparison
print(a > b)   # True
print(a == b)  # False`}</pre>

      <div
        style={{
          background: "#f0fdf4",
          borderLeft: "4px solid #22c55e",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Python operators are versatile and work with different data types. Using them correctly can make expressions concise and readable.
      </div>
    </div>
  </section>
);

export default OperatorsSection;
