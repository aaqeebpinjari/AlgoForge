import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import "../styles/global-theme.css";

// Priority Queue implementation for graph algorithms
class SimplePriorityQueue {
  constructor() {
    this.elements = [];
  }
  
  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }
  
  dequeue() {
    return this.elements.shift().element;
  }
  
  isEmpty() {
    return this.elements.length === 0;
  }
}

// Algorithm implementations
const GraphAlgorithms = {
  // Dijkstra's algorithm implementation
  dijkstra: ({ nodes, edges, startNode, endNode, setVisualState, setMessage, animateVisualization }) => {
    if (startNode === null || endNode === null) {
      alert("Please select a start and end node first.");
      return;
    }

    setVisualState({ visited: new Set(), path: [] }); // Reset previous visualization
    setMessage(`Running Dijkstra's from ${startNode} to ${endNode}...`);

    const numNodes = nodes.length;
    const distances = Array(numNodes).fill(Infinity);
    const prev = Array(numNodes).fill(null);
    const pq = new SimplePriorityQueue();
    const visualizationSteps = [];

    distances[startNode] = 0;
    pq.enqueue(startNode, 0);

    while (!pq.isEmpty()) {
      const u = pq.dequeue();
      visualizationSteps.push({ type: "visit", node: u });
      if (u === endNode) break;

      edges.forEach((edge) => {
        let v = -1;
        if (edge.start === u) v = edge.end;
        if (edge.end === u) v = edge.start;
        if (v !== -1) {
          const newDist = distances[u] + edge.weight;
          if (newDist < distances[v]) {
            distances[v] = newDist;
            prev[v] = u;
            pq.enqueue(v, newDist);
          }
        }
      });
    }

    const path = [];
    let current = endNode;
    while (current !== null) {
      const p = prev[current];
      if (p !== null) path.unshift({ start: p, end: current });
      current = p;
    }
    visualizationSteps.push({ type: "path", path });
    return { visualizationSteps, distances, path };
  },
  bellmanFord: ({ nodes, edges, startNode, endNode, setVisualState, setMessage }) => {
  if (startNode === null || endNode === null) {
    alert("Please select a start and end node first.");
    return;
  }

  setVisualState({ visited: new Set(), path: [] });
  setMessage(`Running Bellman–Ford from ${startNode} to ${endNode}...`);

  const numNodes = nodes.length;
  const distances = Array(numNodes).fill(Infinity);
  const prev = Array(numNodes).fill(null);
  const steps = [];

  distances[startNode] = 0;

  for (let i = 0; i < numNodes - 1; i++) {
    edges.forEach(({ start, end, weight }) => {
      if (distances[start] + weight < distances[end]) {
        distances[end] = distances[start] + weight;
        prev[end] = start;
      }
      if (distances[end] + weight < distances[start]) {
        distances[start] = distances[end] + weight;
        prev[start] = end;
      }
    });
  }

  // Check for negative weight cycles
  let hasNegativeCycle = false;
  edges.forEach(({ start, end, weight }) => {
    if (distances[start] + weight < distances[end]) {
      hasNegativeCycle = true;
    }
    if (distances[end] + weight < distances[start]) {
      hasNegativeCycle = true;
    }
  });

  if (hasNegativeCycle) {
    setMessage("Negative weight cycle detected!");
    return { steps: [], path: [], distances };
  }

  const path = [];
  let current = endNode;
  while (current !== null) {
    const p = prev[current];
    if (p !== null) path.unshift({ start: p, end: current });
    current = p;
  }
  steps.push({ type: "path", path });

  return { steps, path, distances };
},


  // BFS algorithm implementation
  bfs: ({ nodes, edges, startNode, endNode, setVisualState, setMessage, getNeighbors, animateVisualization }) => {
    if (startNode === null) {
      alert("Please select a start node first.");
      return;
    }

    setVisualState({ visited: new Set(), path: [] });
    setMessage(endNode !== null ? `Running BFS from ${startNode} to ${endNode}...` : `Running BFS traversal from ${startNode}...`);

    const queue = [startNode];
    const visited = new Set([startNode]);
    const prev = Array(nodes.length).fill(null);
    const steps = [];

    while (queue.length > 0) {
      const u = queue.shift();
      steps.push({ type: "visit", node: u });
      if (endNode !== null && u === endNode) break;
      const neighbors = getNeighbors(u);
      neighbors.forEach(({ node: v }) => {
        if (!visited.has(v)) {
          visited.add(v);
          prev[v] = u;
          queue.push(v);
        }
      });
    }

    let path = [];
    if (endNode !== null) {
      const pathEdges = [];
      let current = endNode;
      while (current !== null && current !== startNode) {
        const p = prev[current];
        if (p === null) break;
        pathEdges.unshift({ start: p, end: current });
        current = p;
      }
      path = pathEdges;
      steps.push({ type: "path", path });
    }
    
    return { steps, path };
  },

  // DFS algorithm implementation
  dfs: ({ nodes, edges, startNode, endNode, setVisualState, setMessage, getNeighbors, animateVisualization }) => {
    if (startNode === null) {
      alert("Please select a start node first.");
      return;
    }

    setVisualState({ visited: new Set(), path: [] });
    setMessage(endNode !== null ? `Running DFS from ${startNode} to ${endNode}...` : `Running DFS traversal from ${startNode}...`);

    const steps = [];
    const visited = new Set();
    const prev = Array(nodes.length).fill(null);

    let found = false;
    const dfsHelper = (u) => {
      if (found) return;
      visited.add(u);
      steps.push({ type: "visit", node: u });
      if (endNode !== null && u === endNode) {
        found = true;
        return;
      }
      const neighbors = getNeighbors(u);
      for (const { node: v } of neighbors) {
        if (!visited.has(v)) {
          prev[v] = u;
          dfsHelper(v);
          if (found) return;
        }
      }
    };

    dfsHelper(startNode);

    let path = [];
    if (endNode !== null && visited.has(endNode)) {
      const pathEdges = [];
      let current = endNode;
      while (current !== null && current !== startNode) {
        const p = prev[current];
        if (p === null) break;
        pathEdges.unshift({ start: p, end: current });
        current = p;
      }
      path = pathEdges;
      steps.push({ type: "path", path });
    }
    
    return { steps, path };
  }
};

// Visualization helper functions
const VisualizationHelpers = {
  // Draw the graph on canvas
  drawGraph: (ctx, { nodes, edges, visualState, dijkstraStart, dijkstraEnd }) => {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw edges
    edges.forEach((edge) => {
      const start = nodes[edge.start];
      const end = nodes[edge.end];
      if (start && end) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        const isPathEdge = visualState.path.some(
          (p) =>
            (p.start === edge.start && p.end === edge.end) ||
            (p.start === edge.end && p.end === edge.start)
        );
        ctx.strokeStyle = isPathEdge ? "#4ade80" : "#66ccff"; // Green for path
        ctx.lineWidth = isPathEdge ? 4 : 2;

        ctx.stroke();
        // Draw edge weight
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        ctx.fillStyle = "#e0e6ed";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(edge.weight, midX, midY - 10);
      }
    });

    // Draw nodes
    nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);

      if (visualState.visited.has(index)) {
        ctx.fillStyle = "#ffd93d"; // Yellow for visited
      } else if (
        index === parseInt(dijkstraStart) ||
        index === parseInt(dijkstraEnd)
      ) {
        ctx.fillStyle = "#ff6b6b"; // Red for start/end points
      } else {
        ctx.fillStyle = "#66ccff"; // Default blue
      }
      ctx.fill();

      // This now draws the node number in a visible white color
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(index, node.x, node.y);
    });
  },

  // Animate the visualization steps
  animateVisualization: ({ steps, distances, path, dijkstraStart, dijkstraEnd, setVisualState, setIsVisualizing, setMessage, setResult }) => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setIsVisualizing(false);
        setMessage("Visualization complete!");
        const totalWeight = distances[dijkstraEnd];
        if (totalWeight === Infinity) {
          setResult({ path: "No path found", weight: "N/A" });
        } else {
          const nodePath = [dijkstraStart];
          path.forEach((edge) => nodePath.push(edge.end));
          setResult({ path: nodePath.join(" → "), weight: totalWeight });
        }

        return;
      }
      const step = steps[stepIndex];
      if (step.type === "visit") {
        setVisualState((prev) => ({
          ...prev,
          visited: new Set(prev.visited).add(step.node),
        }));
      } else if (step.type === "path") {
        setVisualState((prev) => ({ ...prev, path: step.path }));
      }
      stepIndex++;
    }, 300); // Animation speed
  }
};

// Default example graph data
const DEFAULT_EXAMPLE = {
  nodes: [
    { x: 150, y: 120 },
    { x: 350, y: 80 },
    { x: 550, y: 120 },
    { x: 200, y: 320 },
    { x: 400, y: 300 },
    { x: 600, y: 320 }
  ],
  edges: [
    { start: 0, end: 1, weight: 2 },
    { start: 1, end: 2, weight: 3 },
    { start: 0, end: 3, weight: 1 },
    { start: 3, end: 4, weight: 4 },
    { start: 4, end: 5, weight: 2 },
    { start: 1, end: 4, weight: 2 },
    { start: 2, end: 5, weight: 1 }
  ]
};

const generateRandomGraph = (numNodes, canvasWidth, canvasHeight, edgeDensity = 0.4) => {
  const nodes = [];
  const edges = [];
  const minDistance = 100; // Minimum distance between nodes

  // Generate nodes with random positions, ensuring they are not too close
  for (let i = 0; i < numNodes; i++) {
    let x, y, tooClose;
    do {
      tooClose = false;
      x = Math.random() * (canvasWidth - 100) + 50;
      y = Math.random() * (canvasHeight - 100) + 50;
      for (const node of nodes) {
        const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
        if (distance < minDistance) {
          tooClose = true;
          break;
        }
      }
    } while (tooClose);
    nodes.push({ x, y });
  }

  // Ensure the graph is connected by creating a path through all nodes
  const unvisited = new Set(nodes.map((_, i) => i));
  const visited = new Set();
  let current = 0;
  unvisited.delete(current);
  visited.add(current);

  while (unvisited.size > 0) {
    let next = unvisited.values().next().value;
    const weight = Math.floor(Math.random() * 20) + 1;
    edges.push({ start: current, end: next, weight });
    current = next;
    unvisited.delete(current);
    visited.add(current);
  }

  // Add additional random edges based on density
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      // Avoid adding an edge if it already exists
      const edgeExists = edges.some(e => (e.start === i && e.end === j) || (e.start === j && e.end === i));
      if (!edgeExists && Math.random() < edgeDensity) {
        const weight = Math.floor(Math.random() * 20) + 1;
        edges.push({ start: i, end: j, weight });
      }
    }
  }
  return { nodes, edges };
};

const GraphVisualizer = ({ defaultAlgorithm = null, autoLoadExample = false, canvasWidth = 800, canvasHeight = 500 }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isAddingEdge, setIsAddingEdge] = useState(false);
  const [edgeStartNode, setEdgeStartNode] = useState(null);
  const canvasRef = useRef(null);
  const [dijkstraStart, setDijkstraStart] = useState(null);
  const [dijkstraEnd, setDijkstraEnd] = useState(null);
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm || "Dijkstra");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [visualState, setVisualState] = useState({
    visited: new Set(),
    path: [],
  });
  const [message, setMessage] = useState(
    "Build your graph or select an algorithm."
  );
  const [result, setResult] = useState(null);

  // Memoize the getNeighbors function to prevent unnecessary re-renders
  const getNeighbors = useCallback((nodeIndex) => {
    const neighbors = [];
    edges.forEach((edge) => {
      if (edge.start === nodeIndex) neighbors.push({ node: edge.end, weight: edge.weight });
      else if (edge.end === nodeIndex) neighbors.push({ node: edge.start, weight: edge.weight });
    });
    return neighbors;
  }, [edges]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    VisualizationHelpers.drawGraph(ctx, { nodes, edges, visualState, dijkstraStart, dijkstraEnd });
  }, [nodes, edges, visualState, dijkstraStart, dijkstraEnd]);

  useEffect(() => {
    if (defaultAlgorithm) {
      setAlgorithm(defaultAlgorithm);
    }
  }, [defaultAlgorithm]);

  useEffect(() => {
    if (autoLoadExample) {
      loadRandomGraph();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoadExample]);

  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isAddingNode) {
      setNodes([...nodes, { x, y }]);
      setIsAddingNode(false);
    } else if (isAddingEdge) {
      const clickedNodeIndex = nodes.findIndex(
        (node) => Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2) < 20
      );

      if (clickedNodeIndex !== -1) {
        if (edgeStartNode === null) {
          setEdgeStartNode(clickedNodeIndex);
          setMessage(
            `Selected node ${clickedNodeIndex}. Click another node to form an edge.`
          );
        } else {
          const weight = parseInt(
            prompt("Enter edge weight (positive number):", "1"),
            10
          );
          if (!isNaN(weight) && weight > 0) {
            setEdges([
              ...edges,
              { start: edgeStartNode, end: clickedNodeIndex, weight },
            ]);
            setEdgeStartNode(null);
            setIsAddingEdge(false); // Or manage mode differently
            setMessage("Edge added successfully!");
          } else {
            alert("Invalid weight. Please enter a positive number.");
            setEdgeStartNode(null); // Reset on invalid input
          }
        }
      }
    }
  }, [isAddingNode, isAddingEdge, edgeStartNode, nodes, edges]);

  const runDijkstra = useCallback(() => {
    const { visualizationSteps, distances, path } = GraphAlgorithms.dijkstra({
      nodes,
      edges,
      startNode: dijkstraStart,
      endNode: dijkstraEnd,
      setVisualState,
      setMessage,
      animateVisualization: (steps, distances, path) => 
        VisualizationHelpers.animateVisualization({
          steps,
          distances,
          path,
          dijkstraStart,
          dijkstraEnd,
          setVisualState,
          setIsVisualizing,
          setMessage,
          setResult
        })
    });
    
    VisualizationHelpers.animateVisualization({
      steps: visualizationSteps,
      distances,
      path,
      dijkstraStart,
      dijkstraEnd,
      setVisualState,
      setIsVisualizing,
      setMessage,
      setResult
    });
  }, [dijkstraStart, dijkstraEnd, nodes, edges]);

  const runBFS = useCallback(() => {
    const { steps, path } = GraphAlgorithms.bfs({
      nodes,
      edges,
      startNode: dijkstraStart,
      endNode: dijkstraEnd,
      setVisualState,
      setMessage,
      getNeighbors,
      animateVisualization: (steps, distances, path) => 
        VisualizationHelpers.animateVisualization({
          steps,
          distances,
          path,
          dijkstraStart,
          dijkstraEnd,
          setVisualState,
          setIsVisualizing,
          setMessage,
          setResult
        })
    });
    
    VisualizationHelpers.animateVisualization({
      steps,
      distances: [],
      path,
      dijkstraStart,
      dijkstraEnd,
      setVisualState,
      setIsVisualizing,
      setMessage,
      setResult
    });
  }, [dijkstraStart, dijkstraEnd, nodes, getNeighbors]);

  const runDFS = useCallback(() => {
    const { steps, path } = GraphAlgorithms.dfs({
      nodes,
      edges,
      startNode: dijkstraStart,
      endNode: dijkstraEnd,
      setVisualState,
      setMessage,
      getNeighbors,
      animateVisualization: (steps, distances, path) => 
        VisualizationHelpers.animateVisualization({
          steps,
          distances,
          path,
          dijkstraStart,
          dijkstraEnd,
          setVisualState,
          setIsVisualizing,
          setMessage,
          setResult
        })
    });
    
    VisualizationHelpers.animateVisualization({
      steps,
      distances: [],
      path,
      dijkstraStart,
      dijkstraEnd,
      setVisualState,
      setIsVisualizing,
      setMessage,
      setResult
    });
  }, [dijkstraStart, dijkstraEnd, nodes, getNeighbors]);

  const runSelectedAlgorithm = useCallback(() => {
    if (algorithm === "Dijkstra") return runDijkstra();
    if (algorithm === "BFS") return runBFS();
    if (algorithm === "DFS") return runDFS();
  }, [algorithm, runDijkstra, runBFS, runDFS]);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setDijkstraStart(null);
    setDijkstraEnd(null);
    setVisualState({ visited: new Set(), path: [] });
    setMessage("Graph cleared. Ready to start again.");
    setResult(null);
  }, []);

  const loadRandomGraph = useCallback(() => {
    const numNodes = Math.floor(Math.random() * 5) + 5; // 5 to 9 nodes
    const { nodes: newNodes, edges: newEdges } = generateRandomGraph(numNodes, canvasWidth, canvasHeight);
    
    setNodes(newNodes);
    setEdges(newEdges);

    const startNode = 0;
    const endNode = newNodes.length > 1 ? newNodes.length - 1 : null;
    setDijkstraStart(startNode);
    setDijkstraEnd(endNode);
    setVisualState({ visited: new Set(), path: [] });
    setResult(null);
    setMessage("Loaded a random example graph. Choose an algorithm and run.");
  }, [canvasWidth, canvasHeight]);

  // Memoize the algorithm options to prevent unnecessary re-renders
  const algorithmOptions = useMemo(() => [
    { value: "BFS", label: "BFS" },
    { value: "DFS", label: "DFS" },
    { value: "Dijkstra", label: "Dijkstra" }
  ], []);

  return (
    <div className="graph-visualizer-container">
      <div className="graph-controls">
        <button
          className="btn btn-primary"
          onClick={() => setIsAddingNode(true)}
          disabled={isAddingNode || isAddingEdge}
          aria-label="Add node"
        >
          Add Node
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsAddingEdge(true)}
          disabled={isAddingNode || isAddingEdge || nodes.length < 2}
          aria-label="Add edge"
        >
          Add Edge
        </button>
        <button
          className="btn btn-secondary"
          onClick={loadRandomGraph}
          disabled={isVisualizing}
          aria-label="Load example graph"
        >
          Load Example
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleClear}
          disabled={isVisualizing}
          aria-label="Clear graph"
        >
          Clear
        </button>
      </div>
      <div className="algorithm-controls">
        {/* Left side for the controls */}
        <div className="controls-left">
          <div className="control-group">
            <label className="control-label">Algorithm:</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isVisualizing}
              className="form-select"
              aria-label="Select algorithm"
            >
              {algorithmOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label className="control-label">Start Node:</label>
            <select
              value={dijkstraStart ?? ""}
              onChange={(e) =>
                setDijkstraStart(
                  e.target.value === "" ? null : parseInt(e.target.value)
                )
              }
              disabled={isVisualizing}
              className="form-select"
              aria-label="Select start node"
            >
              <option value="">Select</option>
              {nodes.map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label className="control-label">End Node:</label>
            <select
              value={dijkstraEnd ?? ""}
              onChange={(e) =>
                setDijkstraEnd(
                  e.target.value === "" ? null : parseInt(e.target.value, 10)
                )
              }
              disabled={isVisualizing}
              className="form-select"
              aria-label="Select end node"
            >
              <option value="">Select</option>
              {nodes.map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <button
              className="btn btn-primary"
              onClick={runSelectedAlgorithm}
              disabled={isVisualizing || nodes.length === 0}
              aria-label="Run selected algorithm"
            >
              Run Algorithm
            </button>
          </div>
        </div>

        {/* Right side for canvas */}
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="graph-canvas"
          onClick={handleCanvasClick}
        />

        {/* Status message */}
        <div className="status-message">
          <p>{message}</p>
        </div>

        {/* Result box */}
        {result && (
          <div className="result-box">
            <p><strong>Path:</strong> {result.path}</p>
            <p><strong>Total Weight:</strong> {result.weight}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;
