// src/pages/DPOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import DPPage from "./DPPage"; // Your dynamic programming visualizer component
import AOS from 'aos';
import 'aos/dist/aos.css';

const DPOverview = () => {
  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Dynamic Programming</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Dynamic Programming (DP) is an algorithmic technique used to solve problems by breaking them down into simpler overlapping subproblems
        and storing the results to avoid redundant computations. It is widely used for optimization problems.
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
        : Efficiently solve problems by reusing results of subproblems to reduce time complexity.
      </p>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="200">
        <div className="theme-card-header">
          <h3>What is Dynamic Programming?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          DP is used to solve problems where solutions can be constructed from solutions to overlapping subproblems.  
          Common applications include optimization problems like Knapsack, Fibonacci numbers, Longest Common Subsequence, and Minimum Path Sum.  
          DP typically comes in two approaches: <b>Top-down (Memoization)</b> and <b>Bottom-up (Tabulation)</b>.
        </p>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Break problems into smaller overlapping subproblems</li>
          <li>Store subproblem results to avoid redundant calculations</li>
          <li>Two approaches: Top-down (recursion + memoization) and Bottom-up (iterative tabulation)</li>
          <li>Commonly applied in optimization, counting, and pathfinding problems</li>
          <li>Reduces exponential time complexity to polynomial in many cases</li>
        </ul>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>⚡ Complexity Analysis</h3>
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
              <td>Fibonacci Sequence</td>
              <td>O(N)</td>
              <td>O(N)</td>
              <td>Stores results of all previous numbers; can optimize to O(1) space</td>
            </tr>
            <tr>
              <td>0/1 Knapsack</td>
              <td>O(N×W)</td>
              <td>O(N×W)</td>
              <td>Builds DP table using weights and values; N items, W capacity</td>
            </tr>
            <tr>
              <td>Coin Change</td>
              <td>O(N×Amount)</td>
              <td>O(Amount)</td>
              <td>Iteratively computes minimum coins for each amount up to target</td>
            </tr>
            <tr>
              <td>Longest Common Subsequence</td>
              <td>O(M×N)</td>
              <td>O(M×N)</td>
              <td>M, N are string lengths; builds DP table to store LCS lengths</td>
            </tr>
            <tr>
              <td>Matrix Chain Multiplication</td>
              <td>O(N³)</td>
              <td>O(N²)</td>
              <td>Uses DP table to compute minimum cost of multiplying matrices</td>
            </tr>
            <tr>
              <td>Minimum Path Sum in Grid</td>
              <td>O(M×N)</td>
              <td>O(M×N)</td>
              <td>Stores cumulative sums in DP table to find minimum path</td>
            </tr>
            <tr>
              <td>Subset Sum</td>
              <td>O(N×Sum)</td>
              <td>O(N×Sum)</td>
              <td>Uses DP table to check if subset with given sum exists</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Include your interactive DP visualizer */}
      <DPPage />
    </div>
  );
};

export default DPOverview;
