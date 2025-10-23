import React, { useState } from "react";
import AStarVisualizer from "../components/AStarVisualizer";
import { graphAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

const GraphAStar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  return (
    <div className="theme-container">
      <h1 className="theme-title">A* Pathfinding Algorithm</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Visualize the A* pathfinding algorithm on a grid. Click to set start and end points, draw walls, and watch the algorithm find the shortest path.
      </p>

      {/* Informative Description Section */}
      <div className="theme-card" style={{ marginBottom: '2rem' }}>
        <div className="theme-card-header">
          <h3>What is A* Pathfinding?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          A* (A-star) is a popular pathfinding algorithm used in many applications like video games, robotics, and GPS navigation.
          It finds the shortest path between two points while considering both the cost to reach a node and the estimated cost to reach the goal.
        </p>
        <div className="complexity-grid">
          <div className="complexity-item">
            <span className="complexity-label">Time Complexity:</span>
            <span className="complexity-value">O(b^d)</span>
          </div>
          <div className="complexity-item">
            <span className="complexity-label">Space Complexity:</span>
            <span className="complexity-value">O(b^d)</span>
          </div>
          <div className="complexity-item">
            <span className="complexity-label">Optimality:</span>
            <span className="complexity-value">Guaranteed (with admissible heuristic)</span>
          </div>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6, marginTop: "1rem" }}>
          <strong>How it works:</strong> A* uses a heuristic function to estimate the cost from any node to the goal.
          It maintains two sets: open (nodes to be evaluated) and closed (already evaluated nodes).
          At each step, it selects the node with the lowest f-score (g + h) from the open set.
        </p>
      </div>

      {/* A* Visualizer */}
      <div style={{ marginBottom: '2rem' }}>
        <AStarVisualizer />
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }}>
        <div className="theme-card-header">
          <h3>A* Algorithm - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {["java", "python", "cpp", "javascript", "go"].map(lang => (
              <button
                key={lang}
                className={`btn ${selectedLanguage === lang ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage(lang)}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{
          background: 'var(--code-bg)',
          borderRadius: '8px',
          padding: '1.5rem',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          <pre style={{
            margin: 0,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            color: 'var(--code-text)',
            background: 'var(--code-bg)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            <code>
              {graphAlgorithms.astar && graphAlgorithms.astar[selectedLanguage]
                ? graphAlgorithms.astar[selectedLanguage]
                : `// A* Pathfinding Algorithm implementation in ${selectedLanguage.toUpperCase()} coming soon!`
              }
            </code>
          </pre>
        </div>
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'var(--accent-warning-bg)',
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>Note:</strong> This is the actual implementation code for A* Pathfinding Algorithm in {selectedLanguage.toUpperCase()}.
          You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default GraphAStar;
