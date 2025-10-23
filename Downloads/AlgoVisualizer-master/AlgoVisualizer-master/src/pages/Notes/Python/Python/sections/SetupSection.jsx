import React from "react";

const SetupSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-cogs"></i> 2. Python Setup
      </h2>
      <p>
        To start programming in Python, you need to install Python on your system.
        Python comes with an interactive shell (REPL) and supports multiple
        development environments, including text editors and IDEs.
      </p>

      <h3>Steps to Set Up Python</h3>
      <ol>
        <li>
          <strong>Download Python:</strong> Visit{" "}
          <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer">
            python.org/downloads
          </a>{" "}
          and download the latest stable version.
        </li>
        <li>
          <strong>Install Python:</strong> Run the installer and check the box 
          <em> "Add Python to PATH"</em> on Windows.
        </li>
        <li>
          <strong>Verify installation:</strong> Open terminal/command prompt and run
          <code> python --version </code> or <code> python3 --version</code>.
        </li>
        <li>
          <strong>Choose an IDE:</strong> Options include VS Code, PyCharm, or Jupyter Notebook.
        </li>
        <li>
          <strong>Optional - Virtual environment:</strong> Create isolated environments using
          <code> python -m venv myenv </code>.
        </li>
      </ol>

      <div
        style={{
          background: "#ecfdf5",
          borderLeft: "4px solid #10b981",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Tip:</strong> Always keep Python updated and use virtual environments
        for each project to avoid dependency conflicts.
      </div>
    </div>
  </section>
);

export default SetupSection;
