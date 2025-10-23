import React, { useState, useEffect } from "react";

/**
 * Python Environment Manager - Handles Pyodide initialization and execution
 */
class PythonEnvironment {
  constructor() {
    this.pyodide = null;
    this.isReady = false;
  }

  async initialize(onStatusChange) {
    if (this.isReady) return this.pyodide;
    
    onStatusChange?.("Loading Python environment...");
    this.pyodide = await window.loadPyodide();
    this.isReady = true;
    onStatusChange?.("");
    
    return this.pyodide;
  }

  async runCode(code) {
    if (!this.isReady || !this.pyodide) {
      throw new Error("Python environment not ready");
    }
    
    const result = await this.pyodide.runPythonAsync(code);
    return result ?? "Code executed successfully!";
  }
}

/**
 * Code Utilities - Helper functions for code operations
 */
const CodeUtils = {
  getDefaultPythonCode: () => `# Python Algorithm Example
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original:", numbers)
sorted_numbers = bubble_sort(numbers.copy())
print("Sorted:", sorted_numbers)`,

  runJavaScript: (code) => {
    let result = "";
    const log = console.log;
    console.log = (msg) => { result += msg + "\n"; };
    eval(code);
    console.log = log;
    return result || "Code executed successfully!";
  }
};

// CodeRunner component for running JS or Python
const CodeRunner = ({ language = "javascript", defaultCode = "" }) => {
  const [code, setCode] = useState(defaultCode || (language === "python" ? CodeUtils.getDefaultPythonCode() : ""));
  const [output, setOutput] = useState("");
  const [pythonEnv] = useState(() => new PythonEnvironment());

  // Initialize Python environment
  useEffect(() => {
    if (language === "python") {
      pythonEnv.initialize(setOutput);
    }
  }, [language, pythonEnv]);

  // Run code function
  const runCode = async () => {
    try {
      if (language === "javascript") {
        const result = CodeUtils.runJavaScript(code);
        setOutput(result);
      } else if (language === "python") {
        const result = await pythonEnv.runCode(code);
        setOutput(result);
      }
    } catch (err) {
      setOutput(err.message);
    }
  };

  return (
    <div className="code-runner">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-input"
        rows={8}
        style={{ width: "100%", fontFamily: "monospace", fontSize: "14px", padding: "8px" }}
      />
      <button onClick={runCode} className="run-btn">
        Run {language === "python" ? "Python" : "JS"}
      </button>
      <pre className="output">{output}</pre>
    </div>
  );
};

export default CodeRunner;
