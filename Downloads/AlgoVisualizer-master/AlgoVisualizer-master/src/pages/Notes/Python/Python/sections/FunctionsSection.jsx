import React from "react";

const FunctionsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-cogs"></i> 6. Python Functions
      </h2>
      <p>
        Functions in Python are blocks of reusable code that perform a specific task.
        They help make your code modular, readable, and maintainable.
      </p>

      <h3>Defining a Function</h3>
      <pre>{`def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Output: Hello, Alice!`}</pre>

      <h3>Returning Values</h3>
      <pre>{`def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # Output: 8`}</pre>

      <h3>Default and Keyword Arguments</h3>
      <pre>{`def greet(name="Guest"):
    print(f"Hello, {name}!")

greet()          # Output: Hello, Guest!
greet(name="Bob")  # Output: Hello, Bob!`}</pre>

      <h3>Variable-Length Arguments</h3>
      <pre>{`def add_all(*numbers):
    return sum(numbers)

print(add_all(1, 2, 3, 4))  # Output: 10`}</pre>

      <div
        style={{
          background: "#f0fdf4",
          borderLeft: "4px solid #22c55e",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Functions can also be anonymous using <code>lambda</code>,
        and Python supports first-class functions for passing as arguments.
      </div>
    </div>
  </section>
);

export default FunctionsSection;
