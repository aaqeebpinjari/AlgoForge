import React from "react";

const IteratorsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-random"></i> 10. Iterators in Python
      </h2>
      <p>
        Iterators allow you to traverse through all elements of a collection (like lists, tuples, or sets) without using index variables. In Python, an object is an iterator if it implements the <code>__iter__()</code> and <code>__next__()</code> methods.
      </p>

      <h3>1. Using an Iterator with `iter()` and `next()`</h3>
      <pre>{`# Creating a list
numbers = [1, 2, 3]

# Getting an iterator
it = iter(numbers)

print(next(it))  # Output: 1
print(next(it))  # Output: 2
print(next(it))  # Output: 3
# next(it) would raise StopIteration`}</pre>

      <h3>2. Iterating with a `for` Loop</h3>
      <pre>{`for num in numbers:
    print(num)

# Output:
# 1
# 2
# 3`}</pre>

      <h3>3. Custom Iterator Class</h3>
      <pre>{`class CountDown:
    def __init__(self, start):
        self.num = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.num <= 0:
            raise StopIteration
        val = self.num
        self.num -= 1
        return val

for i in CountDown(5):
    print(i)

# Output:
# 5
# 4
# 3
# 2
# 1`}</pre>

      <div
        style={{
          background: "#eef2ff",
          borderLeft: "4px solid #6366f1",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Iterators are memory-efficient since they generate items on the fly and don’t store the entire sequence in memory.
      </div>
    </div>
  </section>
);

export default IteratorsSection;
