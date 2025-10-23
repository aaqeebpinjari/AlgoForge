// src/pages/Kadane.jsx
import { useState } from "react";
import "./Kadane.css";

/**
 * ⚡ Kadane’s Algorithm Visualization Component
 *
 * A step-by-step visual explanation of Kadane’s Algorithm
 * for finding the maximum subarray sum.
 *
 * @component
 * @returns {JSX.Element} Kadane’s Algorithm visualization component
 */
export default function KadaneVisualizer() {
  const [inputArray, setInputArray] = useState([1, -3, 2, 1, -1, 3, -2, 3]);
  const [currentSum, setCurrentSum] = useState(0);
  const [maxSum, setMaxSum] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  // 🎬 Step-by-step Kadane Visualization
  const handleRunKadane = async () => {
    setIsRunning(true);
    let maxSoFar = Number.NEGATIVE_INFINITY;
    let current = 0;

    for (let i = 0; i < inputArray.length; i++) {
      setHighlightIndex(i);
      current += inputArray[i];
      if (current > maxSoFar) maxSoFar = current;
      if (current < 0) current = 0;

      setCurrentSum(current);
      setMaxSum(maxSoFar);
      await new Promise((r) => setTimeout(r, 800)); // small delay for animation
    }

    setIsRunning(false);
    setHighlightIndex(-1);
  };

  // 🧮 Reset the visualization
  const handleReset = () => {
    setCurrentSum(0);
    setMaxSum(0);
    setHighlightIndex(-1);
    setIsRunning(false);
  };

  // 🔢 Update array input
  const handleInputChange = (e) => {
    const values = e.target.value.split(",").map(Number);
    setInputArray(values.filter((v) => !isNaN(v)));
  };

  return (
    <div className="kadane-container">
      <h1>⚡ Kadane’s Algorithm Visualization</h1>
      <p className="subtitle">
        Find the <b>maximum subarray sum</b> using Kadane’s Algorithm.
      </p>

      {/* 🎛️ Input Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Enter numbers (e.g. 1, -3, 2, 1, -1)"
          onChange={handleInputChange}
          disabled={isRunning}
        />
        <button onClick={handleRunKadane} disabled={isRunning}>
          {isRunning ? "Running..." : "Run Kadane"}
        </button>
        <button onClick={handleReset} disabled={isRunning}>
          Reset
        </button>
      </div>

      {/* 🎨 Array Visualization */}
      <div className="array-boxes">
        {inputArray.map((num, idx) => (
          <div
            key={idx}
            className={`array-box ${
              idx === highlightIndex ? "highlight" : ""
            }`}
          >
            <span>{num}</span>
            <small>Index {idx}</small>
          </div>
        ))}
      </div>

      {/* 📊 Display Current State */}
      <div className="status">
        <p>Current Sum: <b>{currentSum}</b></p>
        <p>Max Sum So Far: <b>{maxSum}</b></p>
      </div>

      {/* 📘 Educational Section */}
      <div className="info">
        <h2>About Kadane’s Algorithm</h2>
        <p>
          Kadane’s Algorithm efficiently finds the <b>maximum sum of a contiguous subarray</b>
          in linear time. It works by keeping track of the current subarray sum and resetting it
          when it becomes negative.
        </p>

        <h3>⏱️ Time Complexity</h3>
        <table>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Time Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Finding Maximum Subarray</td><td>O(n)</td></tr>
            <tr><td>Space Complexity</td><td>O(1)</td></tr>
          </tbody>
        </table>

        <h3>🧠 Formula</h3>
        <pre>
{`currentSum = max(arr[i], currentSum + arr[i]);
maxSum = max(maxSum, currentSum);`}
        </pre>
      </div>
    </div>
  );
}
