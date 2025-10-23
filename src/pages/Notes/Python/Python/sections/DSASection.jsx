import React from "react";

const DSASection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-database"></i> 12. Data Structures & Algorithms (DSA)
      </h2>
      <p>
        Data Structures organize and store data efficiently, while Algorithms provide step-by-step procedures to perform computations or solve problems. Python provides built-in structures like lists, tuples, sets, and dictionaries, and supports implementing custom data structures.
      </p>

      <h3>1. Lists</h3>
      <pre>{`# List example
numbers = [1, 2, 3, 4, 5]
numbers.append(6)
print(numbers)  # Output: [1, 2, 3, 4, 5, 6]`}</pre>

      <h3>2. Dictionaries</h3>
      <pre>{`# Dictionary example
student = {"name": "Alice", "age": 20}
print(student["name"])  # Output: Alice
student["grade"] = "A"`}</pre>

      <h3>3. Simple Algorithm: Linear Search</h3>
      <pre>{`def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

print(linear_search([10, 20, 30], 20))  # Output: 1`}</pre>

      <h3>4. Simple Algorithm: Bubble Sort</h3>
      <pre>{`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# Output: [11, 12, 22, 25, 34, 64, 90]`}</pre>

      <div
        style={{
          background: "#f0f9ff",
          borderLeft: "4px solid #3b82f6",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Understanding DSA is crucial for problem-solving, competitive programming, and building efficient software.
      </div>
    </div>
  </section>
);

export default DSASection;
