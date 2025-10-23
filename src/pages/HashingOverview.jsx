// src/pages/HashingOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import HashingPage from "./HashingPage";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HashingOverview = () => {
  return (
    <div
      className="theme-container"
      data-aos="fade-up"
      data-aos-duration="1000"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem 0",
      }}
    >
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to{" "}
        <span style={{ color: "var(--accent-primary)" }}>Hashing</span>
      </h1>

      <p
        style={{
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Hashing is a technique used to map data of arbitrary size to fixed-size values,
        called hash codes, which can then be used for efficient data storage,
        retrieval, and lookup.
      </p>

      <p
        style={{
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
        : Enable fast insertion, deletion, and search operations with minimal collisions.
      </p>

      <div
        className="theme-card"
        style={{ width: "80%", maxWidth: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="theme-card-header">
          <h3>What is Hashing?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Hashing is widely used in data structures like hash tables, sets, and maps to
          allow constant time lookup, insertion, and deletion. Collisions, which occur
          when multiple keys map to the same hash, are resolved using techniques such as
          chaining or open addressing. Rolling hashes are used in string matching
          algorithms like Rabin-Karp.
        </p>
      </div>

      <div
        className="theme-card"
        style={{ width: "80%", maxWidth: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points" style={{ textAlign: "left" }}>
          <li>Provides O(1) average time complexity for search, insert, and delete operations</li>
          <li>Handles collisions using chaining or open addressing</li>
          <li>Rolling hash enables efficient substring matching</li>
          <li>Widely used in sets, maps, frequency counting, and problem-solving (e.g., Two-sum, Subarray sums)</li>
        </ul>
      </div>

      <div
        className="theme-card"
        style={{ width: "80%", maxWidth: "1300px" }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="theme-card-header">
          <h3>⚡ Complexity Analysis</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Algorithm / Structure</th>
              <th>Average Time Complexity</th>
              <th>Worst-case Time Complexity</th>
              <th>Space Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hash Table (Chaining)</td>
              <td>O(1)</td>
              <td>O(N)</td>
              <td>O(N + M) (N = elements, M = table size)</td>
            </tr>
            <tr>
              <td>Hash Table (Open Addressing)</td>
              <td>O(1)</td>
              <td>O(N)</td>
              <td>O(M)</td>
            </tr>
            <tr>
              <td>Rolling Hash / Rabin-Karp</td>
              <td>O(N + M) (string matching)</td>
              <td>O(N × M)</td>
              <td>O(1)</td>
            </tr>
            <tr>
              <td>Set / Map Operations</td>
              <td>O(1)</td>
              <td>O(N)</td>
              <td>O(N)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Hashing Visualizer */}
      <HashingPage />
    </div>
  );
};

export default HashingOverview;
