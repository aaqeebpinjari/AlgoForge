// src/pages/DCOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import DCPage from "./DCPage"; // Your divide & conquer visualizer component
import AOS from 'aos';
import 'aos/dist/aos.css';

const DCOverview = () => {
  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span style={{ color: "var(--accent-primary)" }}>Divide & Conquer</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Divide & Conquer is an algorithmic paradigm where a problem is recursively split into smaller subproblems, solved individually, and then combined to form the final solution. 
        It is commonly used for sorting, searching, and optimization problems.
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
        : Efficiently solve complex problems by breaking them into simpler subproblems and combining their solutions.
      </p>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="200">
        <div className="theme-card-header">
          <h3>What is Divide & Conquer?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Divide & Conquer (D&C) works by splitting a problem into smaller independent subproblems, solving each recursively, and merging the results.  
          Classic examples include Merge Sort, Quick Sort, and Binary Search.  
          Many D&C algorithms achieve logarithmic or linearithmic time complexities by efficiently reducing problem sizes at each step.
        </p>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Break problems into independent subproblems</li>
          <li>Solve subproblems recursively</li>
          <li>Combine subproblem solutions to get the final answer</li>
          <li>Often results in O(log N), O(N log N), or O(N²) complexities</li>
          <li>Widely used in sorting, searching, and numerical algorithms</li>
        </ul>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>⚡ Complexity Analysis</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Merge Sort</td>
              <td>O(N log N)</td>
              <td>O(N)</td>
              <td>Splits array recursively, merges sorted subarrays</td>
            </tr>
            <tr>
              <td>Quick Sort</td>
              <td>O(N log N) avg, O(N²) worst</td>
              <td>O(log N) avg recursion stack</td>
              <td>Partition array and recursively sort partitions</td>
            </tr>
            <tr>
              <td>Binary Search</td>
              <td>O(log N)</td>
              <td>O(1) iterative, O(log N) recursive</td>
              <td>Search in sorted array by recursively halving search space</td>
            </tr>
            <tr>
              <td>Closest Pair of Points</td>
              <td>O(N log N)</td>
              <td>O(N)</td>
              <td>Divide points, recursively solve subarrays, merge results</td>
            </tr>
            <tr>
              <td>Matrix Multiplication (Strassen)</td>
              <td>O(N^2.81)</td>
              <td>O(N²)</td>
              <td>Recursive divide & conquer approach to multiply matrices faster</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Include your interactive DC visualizer */}
      <DCPage />
    </div>
  );
};

export default DCOverview;
