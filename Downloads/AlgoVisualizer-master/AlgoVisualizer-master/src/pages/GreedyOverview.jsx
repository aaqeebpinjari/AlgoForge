// src/pages/GreedyOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import GreedyPage from "./GreedyPage"; // Your greedy visualizer component

const GreedyOverview = () => {
  return (
    <div className="theme-container">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Greedy Algorithms</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Greedy algorithms are a problem-solving paradigm where the best choice is made at each step 
        with the hope of finding the global optimum. They are widely used in optimization problems 
        where local choices lead to a globally optimal solution.
      </p>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--text-color)",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "var(--accent-primary)",
          }}
        >
          Goal
        </span>{" "}
        : Solve optimization problems efficiently by making locally optimal choices.
      </p>

      <div className="theme-card" style={{ width: "1300px" }}>
        <div className="theme-card-header">
          <h3>What are Greedy Algorithms?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Greedy algorithms construct solutions iteratively by choosing the option that appears best 
          at the moment. Common applications include Activity Selection, Fractional Knapsack, Huffman 
          Encoding, Job Scheduling, and Minimum Spanning Trees. Greedy algorithms do not always guarantee 
          the optimal solution for every problem, but they are highly efficient when applicable.
        </p>
      </div>

      <div className="theme-card" style={{ width: "1300px" }}>
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Make the best local choice at each step</li>
          <li>Efficient and simple approach for optimization problems</li>
          <li>Solution may not always be globally optimal</li>
          <li>Commonly used in scheduling, resource allocation, and graph-based problems</li>
          <li>Often faster and easier to implement than dynamic programming</li>
        </ul>
      </div>

      <div className="theme-card" style={{ width: "1300px" }}>
        <div className="theme-card-header">
          <h3>⚡ Complexity Analysis (Typical)</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Activity Selection</td>
              <td>O(N log N)</td>
              <td>O(N)</td>
              <td>Sort by end times, pick non-overlapping activities</td>
            </tr>
            <tr>
              <td>Fractional Knapsack</td>
              <td>O(N log N)</td>
              <td>O(N)</td>
              <td>Sort by value/weight ratio, take fractions if necessary</td>
            </tr>
            <tr>
              <td>Huffman Encoding</td>
              <td>O(N log N)</td>
              <td>O(N)</td>
              <td>Construct Huffman tree using a min-heap based on frequency</td>
            </tr>
            <tr>
              <td>Job Scheduling (Weighted)</td>
              <td>O(N log N)</td>
              <td>O(N)</td>
              <td>Sort by end time, use DP to include compatible jobs</td>
            </tr>
            <tr>
              <td>Minimum Spanning Tree (Prim/Kruskal)</td>
              <td>O(E log V)</td>
              <td>O(V+E)</td>
              <td>Select edges with minimum weight without forming cycles</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Include your interactive Greedy visualizer */}
      <GreedyPage />
    </div>
  );
};

export default GreedyOverview;
