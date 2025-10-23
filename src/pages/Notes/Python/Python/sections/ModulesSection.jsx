import React from "react";

const ModulesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-cubes"></i> 11. Modules in Python
      </h2>
      <p>
        Modules in Python are files containing Python code (functions, classes, variables) that can be imported and reused in other programs. They help organize code into manageable, reusable pieces.
      </p>

      <h3>1. Importing a Module</h3>
      <pre>{`# Import the math module
import math

print(math.sqrt(16))  # Output: 4.0
print(math.pi)        # Output: 3.141592653589793`}</pre>

      <h3>2. Importing Specific Functions</h3>
      <pre>{`# Import only the sqrt function
from math import sqrt

print(sqrt(25))  # Output: 5.0`}</pre>

      <h3>3. Creating Your Own Module</h3>
      <pre>{`# In file mymodule.py
def greet(name):
    return f"Hello, {name}!"

# In another file
import mymodule

print(mymodule.greet("Alice"))  # Output: Hello, Alice!`}</pre>

      <div
        style={{
          background: "#ecfdf5",
          borderLeft: "4px solid #10b981",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Python comes with a rich standard library of modules, and you can also install external modules using <code>pip</code>.
      </div>
    </div>
  </section>
);

export default ModulesSection;
