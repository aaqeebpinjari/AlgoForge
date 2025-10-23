import React from "react";
import GraphVisualizer from "../components/GraphVisualizer";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Graph = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Graph Algorithms Visualization</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 2rem auto', color: 'var(--theme-text-secondary)' }}>
        Create your own graph by adding nodes and edges, and visualize graph
        traversal algorithms.
      </p>

      {/* Informative Description Section */}
      <div className="theme-card" data-aos="fade-up" data-aos-delay="200">
        <div className="theme-card-header">
          {/* ❌ REMOVE: style={{ color: "#66ccff" }} */}
          <h3>What is a Graph?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          A graph is a non-linear data structure consisting of a set of vertices
          (or nodes) and a set of edges connecting these vertices. Graphs are
          used to model relationships between objects and are fundamental in
          computer science for solving a wide variety of problems.
        </p>
        <div className="complexity-grid">
          <div className="complexity-item">
            <span className="complexity-label">Vertices (Nodes):</span>
            <span className="complexity-value" style={{ fontFamily: 'Inter, sans-serif' }}>
              The fundamental units of which graphs are formed.
            </span>
          </div>
          <div className="complexity-item">
            <span className="complexity-label">Edges:</span>
            <span className="complexity-value" style={{ fontFamily: 'Inter, sans-serif' }}>
              The connections between pairs of vertices.
            </span>
          </div>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6, marginTop: "1rem" }}>
          <strong>Real-world applications:</strong> Social networks, GPS and
          mapping systems, computer networks, and recommendation engines all
          rely on graph structures to represent and analyze data.
        </p>
      </div>
      
      {/* Graph Subsections */}
      <div className="theme-card" data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>Graph Algorithms</h3>
        </div>
        <div className="category-filters" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="/graph/bfs" className="btn btn-secondary" style={{ textDecoration: 'none' }}>BFS</a>
          <a href="/graph/dfs" className="btn btn-secondary" style={{ textDecoration: 'none' }}>DFS</a>
          <a href="/graph/dijkstra" className="btn btn-secondary" style={{ textDecoration: 'none' }}>Dijkstra</a>
          <a href="/graph/astar" className="btn btn-secondary" style={{ textDecoration: 'none' }}>A*</a>
          <a href="/graph/bellman-ford" className="btn btn-secondary" style={{ textDecoration: 'none' }}>Bellman-Ford</a
        </div>
      </div>
      <div className="theme-card" data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>Dijkstra's Shortest Path Algorithm</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Dijkstra's algorithm finds the shortest path between two nodes in a
          weighted graph. It works by visiting nodes and greedily selecting the
          unvisited node with the smallest known distance.
        </p>
        <div className="complexity-grid">
          <div className="complexity-item">
            <span className="complexity-label">Time Complexity:</span>
            <span className="complexity-value">O(E + V log V)</span>
          </div>
        </div>
      </div>
      <div className="theme-card" data-aos="fade-up" data-aos-delay="450">
  <div className="theme-card-header">
    <h3>Bellman-Ford Shortest Path Algorithm</h3>
  </div>
  <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
    Bellman-Ford algorithm finds the shortest path in graphs that may have negative edge weights and can detect negative weight cycles.
  </p>
  <div className="complexity-grid">
    <div className="complexity-item">
      <span className="complexity-label">Time Complexity:</span>
      <span className="complexity-value">O(V * E)</span>
    </div>
  </div>
</div>


      <div data-aos="fade-up" data-aos-delay="500">
        <GraphVisualizer />
      </div>
    </div>
  );
};

export default Graph;
