// src/pages/GraphBellmanFord.jsx

import React, { useState } from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import InputPanel from "../components/InputPanel";
import { graphAlgorithms } from "../data/allCodes";
import { getSampleData, getValidationRule } from "../data/sampleData";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const GraphBellmanFord = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [customGraph, setCustomGraph] = useState(null);
  const [inputText, setInputText] = useState("");

  const handleGraphDataLoaded = (graphData) => {
    setCustomGraph(graphData);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleLoadCustomGraph = () => {
    try {
      const parsed = JSON.parse(inputText);
      if (!parsed.nodes || !parsed.edges) {
        alert("Invalid graph format. Must contain 'nodes' and 'edges'.");
        return;
      }
      setCustomGraph(parsed);
    } catch (err) {
      alert("Invalid JSON format.");
    }
  };

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Bellman–Ford Algorithm</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Visualize the Bellman–Ford algorithm for shortest path finding in graphs with negative weights. Load a graph or use the default.
      </p>

      {/* Input Panel */}
      <InputPanel
        dataType="graph"
        placeholder='Enter graph JSON: {"nodes":[{"id": 0, "label": "A"}, {"id": 1, "label": "B"}], "edges":[{"id": "0-1", "from": 0, "to": 1, "weight": -1}]}'
        acceptedFormats={['json']}
        sampleData={getSampleData('graph', 'bellman')}
        validationRules={getValidationRule('graph')}
        onDataLoaded={handleGraphDataLoaded}
        className="graph-input-panel"
      />

      {/* Legacy Input */}
      <div style={{
        background: 'var(--surface-bg)',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }} data-aos="fade-up" data-aos-delay="200">
        <label style={{ fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
          Legacy Text Input:
        </label>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter graph JSON: {"nodes":[...], "edges":[...]}'
          style={{
            width: '100%',
            minHeight: '120px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid var(--border-primary)',
            marginBottom: '0.5rem',
            resize: 'vertical'
          }}
        />
        <button
          onClick={handleLoadCustomGraph}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--accent-primary-bg)',
            color: 'var(--text-on-accent)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Load Graph (Legacy)
        </button>
      </div>

      {/* Graph Visualizer */}
      <div data-aos="fade-up" data-aos-delay="300">
        <GraphVisualizer
          defaultAlgorithm="BellmanFord"
          autoLoadExample={!customGraph}
          customGraph={customGraph}
        />
      </div>

      {/* Code Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }} data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>Bellman–Ford - Code Implementation</h3>
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
              {graphAlgorithms.bellmanFord && graphAlgorithms.bellmanFord[selectedLanguage]
                ? graphAlgorithms.bellmanFord[selectedLanguage]
                : `// Bellman–Ford implementation in ${selectedLanguage.toUpperCase()} coming soon!`
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
          <strong>Note:</strong> This is the actual implementation code for Bellman–Ford in {selectedLanguage.toUpperCase()}.
        </div>
      </div>
    </div>
  );
};

export default GraphBellmanFord;
