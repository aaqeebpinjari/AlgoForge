// src/pages/BacktrackingOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import BacktrackingPage from "./BacktrackingPage"; // Your visualizer component
import AOS from 'aos';
import 'aos/dist/aos.css';

const BacktrackingOverview = () => {
  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Backtracking</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Backtracking is a general algorithmic technique for finding all (or some) solutions to computational problems,
        incrementally building candidates to the solutions and abandoning a candidate as soon as it is determined that it cannot
        lead to a valid solution.
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
        : Explore all possible options efficiently by pruning invalid paths early.
      </p>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="200">
        <div className="theme-card-header">
          <h3>What is Backtracking?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          In DSA, backtracking is a technique for solving problems recursively by trying to build a solution incrementally,
          one piece at a time, removing those solutions that fail to satisfy the constraints of the problem.
          Common applications include combinatorial problems, puzzles, and constraint satisfaction problems like N-Queens or Sudoku.
        </p>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Used for generating all possible solutions</li>
          <li>Prunes paths that cannot lead to a solution</li>
          <li>Commonly applied in puzzles, permutations, combinations, and constraint problems</li>
          <li>Often implemented recursively with backtracking function calls</li>
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
              <td>N-Queens</td>
              <td>O(N!)</td>
              <td>O(N²)</td>
              <td>All placements explored with pruning; N rows, N columns</td>
            </tr>
            <tr>
              <td>Sudoku Solver</td>
              <td>O(9^(N*N))</td>
              <td>O(N²)</td>
              <td>Backtracks on invalid placements; 9 options per empty cell</td>
            </tr>
            <tr>
              <td>Rat in a Maze</td>
              <td>O(2^(N*M))</td>
              <td>O(N*M)</td>
              <td>Explores all paths in a N×M grid; stores path in solution matrix</td>
            </tr>
            <tr>
              <td>Combination Sum</td>
              <td>O(2^N × K)</td>
              <td>O(K)</td>
              <td>Recursively tries all combinations; K is average combination length</td>
            </tr>
            <tr>
              <td>Word Search</td>
              <td>O(M×N×4^L)</td>
              <td>O(L)</td>
              <td>M×N board, L = word length; explores 4 directions recursively</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Include your interactive backtracking visualizer */}
      <BacktrackingPage />
    </div>
  );
};

export default BacktrackingOverview;
