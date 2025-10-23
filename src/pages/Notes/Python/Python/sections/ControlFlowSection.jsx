import React from "react";

const ControlFlowSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-random"></i> 5. Python Control Flow
      </h2>
      <p>
        Control flow statements allow you to dictate the order in which Python
        executes code. They include conditional statements, loops, and
        exception handling.
      </p>

      <h3>Conditional Statements</h3>
      <pre>{`x = 10
if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")`}</pre>

      <h3>Loops</h3>
      <p><strong>For Loop:</strong> Iterates over a sequence.</p>
      <pre>{`fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)`}</pre>

      <p><strong>While Loop:</strong> Repeats as long as a condition is True.</p>
      <pre>{`count = 0
while count < 3:
    print(count)
    count += 1`}</pre>

      <h3>Break and Continue</h3>
      <pre>{`for i in range(5):
    if i == 3:
        break      # Exit the loop
    if i == 1:
        continue   # Skip this iteration
    print(i)`}</pre>

      <div
        style={{
          background: "#f0f9ff",
          borderLeft: "4px solid #3b82f6",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Tip:</strong> Proper use of control flow statements can make
        your code more readable and efficient.
      </div>
    </div>
  </section>
);

export default ControlFlowSection;
