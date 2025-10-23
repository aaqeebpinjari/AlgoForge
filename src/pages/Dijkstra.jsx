// src/pages/Dijkstra.jsx
import { useState } from "react";
import "./Dijkstra.css"; // You can reuse or create new CSS

export default function DijkstraVisualizer() {
  const [graph, setGraph] = useState({
    A: { B: 4, C: 2 },
    B: { C: 5, D: 10 },
    C: { E: 3 },
    D: { F: 11 },
    E: { D: 4 },
    F: {},
  });
  const [source, setSource] = useState("A");
  const [distances, setDistances] = useState({});

  // ⚙️ Dijkstra’s Algorithm Implementation
  const dijkstra = (graph, src) => {
    const dist = {};
    const visited = {};
    const nodes = Object.keys(graph);

    // Initialize distances
    nodes.forEach((node) => {
      dist[node] = Infinity;
      visited[node] = false;
    });
    dist[src] = 0;

    for (let i = 0; i < nodes.length - 1; i++) {
      // Find unvisited node with smallest distance
      let u = null;
      let minDist = Infinity;
      for (let node of nodes) {
        if (!visited[node] && dist[node] < minDist) {
          minDist = dist[node];
          u = node;
        }
      }

      if (u === null) break;
      visited[u] = true;

      // Update distances for neighbors
      for (let neighbor in graph[u]) {
        const newDist = dist[u] + graph[u][neighbor];
        if (newDist < dist[neighbor]) {
          dist[neighbor] = newDist;
        }
      }
    }

    return dist;
  };

  const handleRun = () => {
    const result = dijkstra(graph, source);
    setDistances(result);
  };

  return (
    <div className="array-container">
      <h1>🚦 Dijkstra’s Shortest Path Algorithm</h1>
      <p className="subtitle">
        Finds the shortest distance from a starting node to all other nodes.
      </p>

      <div className="controls">
        <input
          type="text"
          value={source}
          placeholder="Enter Source Node (e.g. A)"
          onChange={(e) => setSource(e.target.value.toUpperCase())}
        />
        <button onClick={handleRun}>Find Shortest Paths</button>
      </div>

      {/* 🎨 Visualization */}
      <div className="graph-boxes">
        {Object.keys(graph).map((node) => (
          <div key={node} className="graph-node">
            <h3>{node}</h3>
            <p>
              {distances[node] !== undefined && distances[node] !== Infinity
                ? `Distance: ${distances[node]}`
                : "∞"}
            </p>
          </div>
        ))}
      </div>

      <div className="info">
        <h2>🧠 About Dijkstra’s Algorithm</h2>
        <p className="text-blue-500">
          Dijkstra’s algorithm finds the shortest path between nodes in a weighted
          graph with non-negative edge weights.
        </p>

        <h3>⏱️ Time Complexity</h3>
        <table>
          <thead>
            <tr>
              <th>Case</th>
              <th>Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Using Adjacency Matrix</td><td>O(V²)</td></tr>
            <tr><td>Using Min-Heap (Priority Queue)</td><td>O((V + E) log V)</td></tr>
          </tbody>
        </table>

        <h3>💾 Space Complexity</h3>
        <p className="text-red-500">O(V) — for storing distance and visited arrays.</p>
      </div>
    </div>
  );
}
