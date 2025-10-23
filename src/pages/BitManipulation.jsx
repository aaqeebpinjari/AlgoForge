// src/pages/BitManipulation.jsx
import { useState } from "react";
import "./BitManipulation.css";

/**
 * 💡 Bit Manipulation Visualization Component
 *
 * Interactive visualization and learning tool for bit operations like
 * set, clear, toggle, and check using binary representation.
 *
 * @component
 * @returns {JSX.Element} Bit Manipulation learning page
 */
export default function BitManipulation() {
  const [number, setNumber] = useState(29); // default number (11101)
  const [bit, setBit] = useState(0);
  const [binary, setBinary] = useState(number.toString(2));
  const [showCode, setShowCode] = useState(null);

  /** 🧮 Helper - Update Binary Display */
  const updateBinary = (val) => setBinary(val.toString(2));

  /** 🔢 Set Bit - make ith bit 1 */
  const setBitFunc = () => {
    const result = number | (1 << bit);
    setNumber(result);
    updateBinary(result);
  };

  /** ❌ Clear Bit - make ith bit 0 */
  const clearBitFunc = () => {
    const result = number & ~(1 << bit);
    setNumber(result);
    updateBinary(result);
  };

  /** 🔄 Toggle Bit - flip ith bit */
  const toggleBitFunc = () => {
    const result = number ^ (1 << bit);
    setNumber(result);
    updateBinary(result);
  };

  /** ✅ Check Bit - see if ith bit is 1 or 0 */
  const checkBitFunc = () => {
    const isSet = (number & (1 << bit)) !== 0;
    alert(`Bit ${bit} is ${isSet ? "SET (1)" : "NOT SET (0)"}`);
  };

  /** 🧹 Reset */
  const reset = () => {
    setNumber(0);
    updateBinary(0);
    setBit(0);
  };

  return (
    <div className="bit-page">
      {/* 🏷️ Header */}
      <header className="page-header">
        <h1>Bit Manipulation</h1>
        <p className="page-subtitle">
          Learn and visualize bit-level operations like set, clear, toggle, and check.
        </p>
      </header>

      {/* 🎮 Controls */}
      <section className="controls-panel">
        <div className="input-group">
          <input
            type="number"
            value={number}
            onChange={(e) => {
              const val = parseInt(e.target.value || 0);
              setNumber(val);
              updateBinary(val);
            }}
            className="bit-input"
            placeholder="Enter number"
          />
          <input
            type="number"
            value={bit}
            onChange={(e) => setBit(parseInt(e.target.value || 0))}
            className="bit-input"
            placeholder="Bit position"
          />
        </div>

        <div className="operation-buttons">
          <button onClick={setBitFunc} className="control-btn set-btn">
            Set Bit
          </button>
          <button onClick={clearBitFunc} className="control-btn clear-btn">
            Clear Bit
          </button>
          <button onClick={toggleBitFunc} className="control-btn toggle-btn">
            Toggle Bit
          </button>
          <button onClick={checkBitFunc} className="control-btn check-btn">
            Check Bit
          </button>
          <button onClick={reset} className="control-btn reset-btn">
            Reset
          </button>
        </div>
      </section>

      {/* 💻 Visualization */}
      <section className="binary-visualization">
        <h3>Binary Representation</h3>
        <div className="binary-display">
          {binary.split("").map((bitVal, i) => (
            <div
              key={i}
              className={`bit-box ${
                binary.length - i - 1 === bit ? "highlight" : ""
              }`}
              title={`Bit position: ${binary.length - i - 1}`}
            >
              {bitVal}
            </div>
          ))}
        </div>
        <p className="decimal-value">Decimal: {number}</p>
      </section>

      {/* 📘 Theory */}
      <section className="documentation-section">
        <article className="ds-info">
          <h2>About Bit Manipulation</h2>
          <p>
            <strong>Bit Manipulation</strong> is the act of algorithmically
            manipulating bits or binary digits, which are the most basic form of data in computing.
            It allows optimization of space and time, especially in competitive programming.
          </p>

          <h3>Common Operations</h3>
          <ul>
            <li><code>Set Bit</code>: <code>num | (1 &lt;&lt; i)</code></li>
            <li><code>Clear Bit</code>: <code>num & ~ (1 &lt;&lt; i)</code></li>
            <li><code>Toggle Bit</code>: <code>num ^ (1 &lt;&lt; i)</code></li>
            <li><code>Check Bit</code>: <code>(num & (1 &lt;&lt; i)) != 0</code></li>
          </ul>

          <h3>Pseudocode</h3>
          <pre className="pseudocode">{`setBit(num, i):
  return num | (1 << i)

clearBit(num, i):
  return num & ~(1 << i)

toggleBit(num, i):
  return num ^ (1 << i)

checkBit(num, i):
  return (num & (1 << i)) != 0`}</pre>

          <h3>Time & Space Complexity</h3>
          <table className="complexity-table">
            <thead>
              <tr>
                <th>Operation</th>
                <th>Time</th>
                <th>Space</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Set Bit</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Clear Bit</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Toggle Bit</td><td>O(1)</td><td>O(1)</td></tr>
              <tr><td>Check Bit</td><td>O(1)</td><td>O(1)</td></tr>
            </tbody>
          </table>

          <h3>Applications</h3>
          <ul className="applications-list">
            <li>Subset generation using bitmasking</li>
            <li>Checking parity (odd/even)</li>
            <li>Optimized space usage</li>
            <li>Low-level graphics & embedded systems</li>
            <li>Competitive programming problems</li>
          </ul>

          <h3>Code Snippets</h3>
          <div className="code-snippets-container">
            {[
              { operation: "Set Bit", code: "num | (1 << i);" },
              { operation: "Clear Bit", code: "num & ~(1 << i);" },
              { operation: "Toggle Bit", code: "num ^ (1 << i);" },
              { operation: "Check Bit", code: "(num & (1 << i)) != 0;" },
            ].map(({ operation, code }) => (
              <div key={operation} className="code-snippet">
                <button
                  className="code-toggle-button"
                  onClick={() =>
                    setShowCode(showCode === operation ? null : operation)
                  }
                >
                  <span className="operation-name">{operation}</span>
                  <span className="toggle-icon">
                    {showCode === operation ? "▲" : "▼"}
                  </span>
                </button>
                {showCode === operation && (
                  <div className="code-content">
                    <pre className="implementation-code">{code}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* 💡 Quick Tips */}
      <aside className="usage-tips">
        <h3>💡 Quick Tips</h3>
        <ul>
          <li>Use bit shifting for power of 2 calculations.</li>
          <li>Always start counting bits from 0 (LSB).</li>
          <li>Useful for subset, mask problems, and toggling flags.</li>
          <li>Efficient alternative to arithmetic operations.</li>
        </ul>
      </aside>
    </div>
  );
}
