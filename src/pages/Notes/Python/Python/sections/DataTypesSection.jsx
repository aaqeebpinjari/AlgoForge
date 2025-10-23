import React from "react";

const DataTypesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-database"></i> 4. Python Data Types
      </h2>
      <p>
        Python has built-in data types to store different kinds of data. These include numbers, sequences, mappings, sets, and more. Python is dynamically typed, so variables can hold values of any type without explicit declaration.
      </p>

      <h3>Common Data Types</h3>
      <ul>
        <li>
          <strong>Numeric Types:</strong> <code>int</code>, <code>float</code>, <code>complex</code>
          <pre>{`x = 10      # int
y = 3.14    # float
z = 2 + 3j  # complex`}</pre>
        </li>
        <li>
          <strong>String:</strong> Immutable text data
          <pre>{`name = "Alice"
greeting = 'Hello, World!'`}</pre>
        </li>
        <li>
          <strong>Boolean:</strong> <code>True</code> or <code>False</code>
          <pre>{`is_active = True
has_access = False`}</pre>
        </li>
        <li>
          <strong>List:</strong> Ordered, mutable sequence
          <pre>{`numbers = [1, 2, 3, 4]
fruits = ["apple", "banana", "cherry"]`}</pre>
        </li>
        <li>
          <strong>Tuple:</strong> Ordered, immutable sequence
          <pre>{`coordinates = (10.0, 20.0)`}</pre>
        </li>
        <li>
          <strong>Dictionary:</strong> Key-value mapping
          <pre>{`person = {"name": "Alice", "age": 25}`}</pre>
        </li>
        <li>
          <strong>Set:</strong> Unordered collection of unique elements
          <pre>{`unique_numbers = {1, 2, 3, 4}`}</pre>
        </li>
      </ul>

      <div
        style={{
          background: "#ecfdf5",
          borderLeft: "4px solid #10b981",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Use the right data type for efficiency and clarity. Python allows
        easy type conversion between compatible types when needed.
      </div>
    </div>
  </section>
);

export default DataTypesSection;
