import React from "react";

const ExamplesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-code"></i> 8. Python Examples
      </h2>
      <p>
        Here are some practical Python examples demonstrating basic concepts and commonly used patterns.
      </p>

      <h3>1. Fibonacci Sequence</h3>
      <pre>{`def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=" ")
        a, b = b, a + b

fibonacci(10)
# Output: 0 1 1 2 3 5 8 13 21 34`}</pre>

      <h3>2. Factorial (Recursive)</h3>
      <pre>{`def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n-1)

print(factorial(5))  # Output: 120`}</pre>

      <h3>3. List Comprehensions</h3>
      <pre>{`squares = [x**2 for x in range(1, 6)]
print(squares)  # Output: [1, 4, 9, 16, 25]`}</pre>

      <h3>4. Dictionary Iteration</h3>
      <pre>{`student_scores = {"Alice": 90, "Bob": 85, "Charlie": 92}
for name, score in student_scores.items():
    print(f"{name}: {score}")
# Output:
# Alice: 90
# Bob: 85
# Charlie: 92`}</pre>

      <h3>5. File I/O</h3>
      <pre>{`with open("example.txt", "w") as file:
    file.write("Hello, Python!")

with open("example.txt", "r") as file:
    print(file.read())
# Output: Hello, Python!`}</pre>

      <div
        style={{
          background: "#ecfdf5",
          borderLeft: "4px solid #10b981",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Practicing small examples like these helps reinforce Python fundamentals
        and prepares you for building more complex programs.
      </div>
    </div>
  </section>
);

export default ExamplesSection;
