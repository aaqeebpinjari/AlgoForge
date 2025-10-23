// src/pages/PrimPage.jsx
import React, { useState } from "react";
import PrimVisualizer from "../components/PrimVisualizer"; // create similar to GreedyVisualizer
import { primsAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

const PrimPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  const algorithmData = primsAlgorithms.prims || {};

  return (
    <div className="theme-container">
      <h1 className="theme-title">Prim's Algorithm Visualizer</h1>

      {/* Prim's Algorithm Explanation */}
      <div className="theme-card" style={{ marginBottom: '2rem' }}>
        <div className="theme-card-header">
          <h3>Understanding Prim's Algorithm</h3>
        </div>
        <div style={{
          padding: '1.5rem',
          background: 'var(--surface-bg)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🔍 What is Prim's Algorithm?</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Prim's algorithm is a greedy algorithm that finds a Minimum Spanning Tree (MST) for a weighted undirected graph. It starts from an arbitrary vertex and grows the MST by repeatedly adding the smallest edge that connects a vertex in the tree to a vertex outside the tree.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🎯 Key Principle</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                <strong>Greedy Choice Property:</strong> At each step, choose the minimum weight edge that connects the current MST to an unvisited vertex. This ensures the total weight remains minimal.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🛠️ How Prim's Algorithm Works</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 1: Initialization</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Choose an arbitrary starting vertex</li>
                  <li>Initialize MST with this single vertex</li>
                  <li>Create a priority queue of edges from visited vertices</li>
                  <li>Set initial MST cost to 0</li>
                </ul>
              </div>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 2: Growth</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Find minimum weight edge connecting visited to unvisited vertex</li>
                  <li>Add this edge and vertex to MST</li>
                  <li>Update priority queue with new possible edges</li>
                  <li>Repeat until all vertices are included</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--success-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⏱️</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(V²)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Adjacency Matrix</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--warning-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>💾</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(V)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--info-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎯</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>Greedy</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Algorithm Type</div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--theme-primary)', margin: '0 0 0.5rem 0' }}>💡 Key Technical Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Priority Queue Usage</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  Maintains edges from visited to unvisited vertices. Each iteration extracts minimum edge and updates queue with new possibilities.
                </p>
              </div>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Connected Graphs Only</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  Prim's algorithm requires the graph to be connected. For disconnected graphs, it will only span the component containing the start vertex.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ color: 'var(--theme-primary)', margin: '0 0 0.5rem 0' }}>🚀 Real-World Applications</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--accent-bg)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🏗️</div>
                <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)', fontSize: '0.9rem' }}>Network Design</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Minimum cost networks</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--accent-bg)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🗺️</div>
                <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)', fontSize: '0.9rem' }}>Road Networks</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Optimal path planning</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--accent-bg)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>🧬</div>
                <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)', fontSize: '0.9rem' }}>Biology</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Protein networks</div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--accent-bg)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>📊</div>
                <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)', fontSize: '0.9rem' }}>Clustering</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Data analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer Component */}
      <PrimVisualizer />

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }}>
        <div className="theme-card-header">
          <h3>Prim's Algorithm - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>_
            {["java", "python", "cpp", "javascript", "go"].map((lang) => (
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
          <strong>Note:</strong> This is the actual implementation code for Prim's algorithm in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default PrimPage;
