// src/pages/TreeOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import TreePage from "./TreePage"; // Tree visualizer page

const TreeOverview = () => {
  return (
    <div className="theme-container">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Tree Algorithms</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Tree algorithms are fundamental in computer science for traversing, searching, and manipulating hierarchical data structures.
        Traversal methods systematically visit all nodes, enabling operations like searching, insertion, deletion, and processing.
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
        : Learn how to traverse trees and understand the behavior of different traversal and BST algorithms.
      </p>

      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header">
          <h3>What are Tree Algorithms?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Tree algorithms operate on tree data structures to traverse or search nodes efficiently.
          Common traversals include Inorder, Preorder, Postorder, and Level Order (BFS).
          These algorithms are widely used in binary trees, binary search trees (BSTs), heaps, and hierarchical data representations.
        </p>
      </div>

      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Tree traversals allow systematic access to all nodes</li>
          <li>Inorder, Preorder, Postorder are depth-first traversals (DFS)</li>
          <li>Level Order Traversal uses breadth-first search (BFS)</li>
          <li>Recursive and iterative implementations are common</li>
          <li>Essential for binary search trees, heaps, and hierarchical data</li>
        </ul>
      </div>

      <div className="theme-card" style={{ maxWidth: "1300px" }}>
        <div className="theme-card-header">
          <h3>⚡ Complexity Analysis</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Traversal / Operation</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inorder / Preorder / Postorder</td>
              <td>O(N)</td>
              <td>O(H) recursive stack, H = tree height</td>
              <td>DFS traversal; visits each node once</td>
            </tr>
            <tr>
              <td>Level Order</td>
              <td>O(N)</td>
              <td>O(W) queue, W = max nodes at any level</td>
              <td>BFS traversal using a queue</td>
            </tr>
            <tr>
              <td>BST Operations (Insert, Search, Delete)</td>
              <td>O(H)</td>
              <td>O(H) recursive stack</td>
              <td>H = height of the BST; operations depend on tree balance</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive tree visualizer */}
      <TreePage />
    </div>
  );
};

export default TreeOverview;
