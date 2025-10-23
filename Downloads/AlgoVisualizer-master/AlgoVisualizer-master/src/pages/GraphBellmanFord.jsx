// src/pages/GraphBellmanFord.jsx
import React, { useState } from "react";

const BellmanFordPage = () => {
  const [result, setResult] = useState([]);

  const graph = [
    [0, -1, 4, 0, 0],
    [0, 0, 3, 2, 2],
    [0, 0, 0, 0, 0],
    [0, 1, 5, 0, 0],
    [0, 0, 0, -3, 0],
  ];
  const vertices = 5;

  const bellmanFord = (src) => {
    const dist = Array(vertices).fill(Infinity);
    dist[src] = 0;

    for (let i = 0; i < vertices - 1; i++) {
      for (let u = 0; u < vertices; u++) {
        for (let v = 0; v < vertices; v++) {
          if (graph[u][v] !== 0 && dist[u] + graph[u][v] < dist[v]) {
            dist[v] = dist[u] + graph[u][v];
          }
        }
      }
    }
    setResult(dist);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bellman-Ford Algorithm</h1>
      <p className="mb-4">
        Click the button below to compute shortest paths from vertex 0.
      </p>
      <button
        onClick={() => bellmanFord(0)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Run Bellman-Ford
      </button>

      {result.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Shortest Distances:</h2>
          <ul>
            {result.map((d, i) => (
              <li key={i}>Vertex {i}: {d === Infinity ? "∞" : d}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BellmanFordPage;
