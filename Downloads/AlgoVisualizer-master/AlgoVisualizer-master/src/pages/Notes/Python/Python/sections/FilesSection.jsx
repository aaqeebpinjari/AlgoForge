import React from "react";

const FilesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-folder-open"></i> 9. File Handling in Python
      </h2>
      <p>
        Python provides built-in functions to handle files efficiently. You can read, write, and manipulate files using simple syntax.
      </p>

      <h3>1. Writing to a File</h3>
      <pre>{`# Writing text to a file
with open("example.txt", "w") as file:
    file.write("Hello, Python!\n")
    file.write("This is a sample file.")`}</pre>

      <h3>2. Reading from a File</h3>
      <pre>{`# Reading entire content
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# Output:
# Hello, Python!
# This is a sample file.`}</pre>

      <h3>3. Reading Line by Line</h3>
      <pre>{`with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())

# Output:
# Hello, Python!
# This is a sample file.`}</pre>

      <h3>4. Appending to a File</h3>
      <pre>{`with open("example.txt", "a") as file:
    file.write("\\nAdding a new line.")`}</pre>

      <h3>5. Using `with` Statement</h3>
      <p>
        Using <code>with</code> ensures that the file is properly closed after its suite finishes, even if an error occurs.
      </p>

      <div
        style={{
          background: "#f0f9ff",
          borderLeft: "4px solid #3b82f6",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Python also supports binary files, file modes ('r', 'w', 'a', 'rb', 'wb'), and exception handling
        to handle errors while working with files.
      </div>
    </div>
  </section>
);

export default FilesSection;
