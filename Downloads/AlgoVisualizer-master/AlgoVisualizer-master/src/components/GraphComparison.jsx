import React, { useState } from "react";
import algorithmsData from "../algorithms/algorithms.json";
import GraphVisualizer from "../components/GraphVisualizer";
import "../styles/global-theme.css";

export default function GraphComparison() {
  const graphAlgos = algorithmsData.filter((a) => a.type === "graph");
  const fallbackGraphAlgos = [
    { name: "BFS", type: "graph" },
    { name: "DFS", type: "graph" },
    { name: "Dijkstra", type: "graph" }
  ];
  const options = graphAlgos.length > 0 ? graphAlgos : fallbackGraphAlgos;

  const [algo1, setAlgo1] = useState(options[0].name);
  const [algo2, setAlgo2] = useState(options[1].name);

  // ✅ Separate custom graphs for each visualizer
  const [customGraph1, setCustomGraph1] = useState(null);
  const [customGraph2, setCustomGraph2] = useState(null);
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");

  const handleLoadCustomGraph1 = () => {
    try {
      const parsed = JSON.parse(inputText1);
      if (!parsed.nodes || !parsed.edges) {
        alert("Invalid graph format for Graph 1. Must contain 'nodes' and 'edges'.");
        return;
      }
      setCustomGraph1(parsed);
    } catch (err) {
      alert("Invalid JSON format for Graph 1.");
    }
  };

  const handleLoadCustomGraph2 = () => {
    try {
      const parsed = JSON.parse(inputText2);
      if (!parsed.nodes || !parsed.edges) {
        alert("Invalid graph format for Graph 2. Must contain 'nodes' and 'edges'.");
        return;
      }
      setCustomGraph2(parsed);
    } catch (err) {
      alert("Invalid JSON format for Graph 2.");
    }
  };

  return (
    <div className="theme-container">
      <h1 className="theme-title">Graph Algorithms Comparison</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "-1rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Compare two graph algorithms side by side. Load default graphs or create your own for each visualizer.
      </p>

      {/* Custom Input Section for Graph 1 */}
      <div style={{
        background: 'var(--surface-bg)',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }}>
        <label style={{ fontWeight: 500 }}>Custom Graph 1:</label>
        <textarea
          value={inputText1}
          onChange={(e) => setInputText1(e.target.value)}
          placeholder='Enter graph JSON: {"nodes":[...], "edges":[...]}'
          style={{
            width: '100%',
            minHeight: '100px',
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
          onClick={handleLoadCustomGraph1}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--accent-primary-bg)',
            color: 'var(--text-on-accent)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Load Graph 1
        </button>
      </div>

      {/* Custom Input Section for Graph 2 */}
      <div style={{
        background: 'var(--surface-bg)',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }}>
        <label style={{ fontWeight: 500 }}>Custom Graph 2:</label>
        <textarea
          value={inputText2}
          onChange={(e) => setInputText2(e.target.value)}
          placeholder='Enter graph JSON: {"nodes":[...], "edges":[...]}'
          style={{
            width: '100%',
            minHeight: '100px',
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
          onClick={handleLoadCustomGraph2}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--accent-primary-bg)',
            color: 'var(--text-on-accent)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Load Graph 2
        </button>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div className="flex flex-col w-64">
          <label className="mb-2 font-medium text-gray-700">Algorithm 1:</label>
          <select
            value={algo1}
            onChange={(e) => setAlgo1(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {options.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-64">
          <label className="mb-2 font-medium text-gray-700">Algorithm 2:</label>
          <select
            value={algo2}
            onChange={(e) => setAlgo2(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {options.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side by side visualizers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "1.5rem",
          alignItems: "start",
          overflowX: "auto",
        }}
      >
        <div className="p-4 rounded-2xl shadow-lg" style={{ overflow: "auto" }}>
          <h2 className="text-xl font-semibold mb-4 text-center">{algo1}</h2>
          <GraphVisualizer
            defaultAlgorithm={algo1}
            autoLoadExample={!customGraph1}
            customGraph={customGraph1}
            canvasWidth={640}
            canvasHeight={420}
          />
        </div>
        <div className="p-4 rounded-2xl shadow-lg" style={{ overflow: "auto" }}>
          <h2 className="text-xl font-semibold mb-4 text-center">{algo2}</h2>
          <GraphVisualizer
            defaultAlgorithm={algo2}
            autoLoadExample={!customGraph2}
            customGraph={customGraph2}
            canvasWidth={640}
            canvasHeight={420}
          />
        </div>
      </div>
    </div>
  );
}
