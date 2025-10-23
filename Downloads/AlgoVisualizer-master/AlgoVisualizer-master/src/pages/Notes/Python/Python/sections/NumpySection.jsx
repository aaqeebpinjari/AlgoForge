import React from "react";

const NumpySection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-chart-bar"></i> 13. NumPy
      </h2>
      <p>
        NumPy is a powerful Python library for numerical computing. It provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions to operate on them efficiently.
      </p>

      <h3>1. Creating Arrays</h3>
      <pre>{`import numpy as np

arr = np.array([1, 2, 3, 4])
print(arr)  # Output: [1 2 3 4]`}</pre>

      <h3>2. Array Operations</h3>
      <pre>{`arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])

print(arr1 + arr2)  # Output: [5 7 9]
print(arr1 * arr2)  # Output: [ 4 10 18]`}</pre>

      <h3>3. Multi-dimensional Arrays</h3>
      <pre>{`matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])
print(matrix.shape)  # Output: (2, 3)`}</pre>

      <h3>4. Useful Functions</h3>
      <pre>{`print(np.zeros(5))      # [0. 0. 0. 0. 0.]
print(np.ones((2,3)))    # [[1. 1. 1.]
                          #  [1. 1. 1.]]
print(np.arange(0, 10, 2)) # [0 2 4 6 8]`}</pre>

      <div
        style={{
          background: "#f0fdf4",
          borderLeft: "4px solid #22c55e",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> NumPy forms the foundation of most scientific computing libraries in Python, including pandas, SciPy, and machine learning frameworks.
      </div>
    </div>
  </section>
);

export default NumpySection;
