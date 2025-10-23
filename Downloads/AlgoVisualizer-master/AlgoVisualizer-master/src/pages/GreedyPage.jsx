// src/pages/GreedyPage.jsx
import React, { useState } from "react";
import GreedyVisualizer from "../components/GreedyVisualizer"; // create similar to DPVisualizer
import { greedyAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

const GreedyPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("activitySelection");

  const algorithmData = greedyAlgorithms[selectedAlgorithm] || {};

  // Default problem sizes for visualizer
  const defaultSizes = {
    activitySelection: 5,
    fractionalKnapsack: 5,
    huffmanEncoding: 5,
    jobScheduling: 5,
    primKruskalMST: 5
  };

  // Friendly names for buttons
  const displayName = {
    activitySelection: "Activity Selection",
    fractionalKnapsack: "Fractional Knapsack",
    huffmanEncoding: "Huffman Encoding",
    jobScheduling: "Job Scheduling",
    primKruskalMST: "Minimum Spanning Tree (Prim/Kruskal)"
  };

  return (
    <div className="theme-container">
      <h1 className="theme-title">Greedy Algorithms Visualizer</h1>
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '-2rem auto 2rem auto',
        color: 'var(--theme-text-secondary)'
      }}>
        Explore how greedy algorithms work step-by-step. Visualize decision-making at each step, and try your own examples.
      </p>

      {/* Visualizer Component */}
      <GreedyVisualizer
        defaultAlgorithm={selectedAlgorithm}
        problemSize={defaultSizes[selectedAlgorithm] || 5}
        autoLoadExample={true}
      />

      {/* Algorithm Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '1rem 0', flexWrap: 'wrap' }}>
        {Object.keys(greedyAlgorithms).map((algo) => (
          <button
            key={algo}
            className={`btn ${selectedAlgorithm === algo ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedAlgorithm(algo)}
          >
            {displayName[algo] || algo}
          </button>
        ))}
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }}>
        <div className="theme-card-header">
          <h3>Greedy Algorithm - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {["java", "python", "cpp", "javascript"].map((lang) => (
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
          background: 'var(--surface-bg)',
          borderRadius: '8px',
          padding: '1.5rem',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          <pre style={{
            margin: 0,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            <code>
              {algorithmData[selectedLanguage]}
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
          <strong>Note:</strong> This is the actual implementation code for the <strong>{displayName[selectedAlgorithm]}</strong> algorithm in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default GreedyPage;
