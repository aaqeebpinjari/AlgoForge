import React, { useState, useEffect, useCallback } from 'react';
import '../styles/global-theme.css';

const AStarVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [heuristic, setHeuristic] = useState('manhattan');
  const [currentMode, setCurrentMode] = useState('wall'); // 'wall', 'start', 'end'
  const [openSet, setOpenSet] = useState(new Set());
  const [closedSet, setClosedSet] = useState(new Set());
  const [path, setPath] = useState([]);
  const [showValues, setShowValues] = useState(false);

  const GRID_ROWS = 20;
  const GRID_COLS = 20;

  // Node class for A* algorithm
  class Node {
    constructor(row, col) {
      this.row = row;
      this.col = col;
      this.isWall = false;
      this.isStart = false;
      this.isEnd = false;
      this.isVisited = false;
      this.isPath = false;
      this.g = Infinity;
      this.h = 0;
      this.f = Infinity;
      this.previous = null;
    }
  }

  // Initialize grid
  const initializeGrid = useCallback(() => {
    const newGrid = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push(new Node(row, col));
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  }, []);

  // Calculate heuristic
  const calculateHeuristic = useCallback((node, endNode, type) => {
    const dx = Math.abs(node.row - endNode.row);
    const dy = Math.abs(node.col - endNode.col);

    if (type === 'manhattan') {
      return dx + dy;
    } else if (type === 'euclidean') {
      return Math.sqrt(dx * dx + dy * dy);
    }
    return dx + dy; // default manhattan
  }, []);

  // Get neighbors
  const getNeighbors = useCallback((node, grid) => {
    const neighbors = [];
    const { row, col } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]); // up
    if (row < GRID_ROWS - 1) neighbors.push(grid[row + 1][col]); // down
    if (col > 0) neighbors.push(grid[row][col - 1]); // left
    if (col < GRID_COLS - 1) neighbors.push(grid[row][col + 1]); // right

    return neighbors.filter(neighbor => !neighbor.isWall);
  }, []);

  // A* algorithm
  const aStar = useCallback(async (start, end, grid) => {
    const openSet = [];
    const closedSet = new Set();
    const path = [];

    // Reset grid properties
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const node = grid[row][col];
        node.g = Infinity;
        node.h = 0;
        node.f = Infinity;
        node.previous = null;
        node.isVisited = false;
        node.isPath = false;
      }
    }

    start.g = 0;
    start.h = calculateHeuristic(start, end, heuristic);
    start.f = start.g + start.h;
    openSet.push(start);

    while (openSet.length > 0) {
      // Find node with lowest f score
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();

      if (current === end) {
        // Reconstruct path
        let temp = current;
        while (temp.previous) {
          path.unshift(temp);
          temp = temp.previous;
        }
        path.unshift(start);
        return { openSet, closedSet, path };
      }

      closedSet.add(`${current.row}-${current.col}`);
      current.isVisited = true;

      const neighbors = getNeighbors(current, grid);
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.row}-${neighbor.col}`;
        if (closedSet.has(neighborKey)) continue;

        const tentativeG = current.g + 1; // Assuming uniform cost

        const existingIndex = openSet.findIndex(n => n.row === neighbor.row && n.col === neighbor.col);
        if (existingIndex === -1) {
          openSet.push(neighbor);
        } else if (tentativeG >= neighbor.g) {
          continue;
        }

        neighbor.previous = current;
        neighbor.g = tentativeG;
        neighbor.h = calculateHeuristic(neighbor, end, heuristic);
        neighbor.f = neighbor.g + neighbor.h;
      }

      // Update visualization
      setOpenSet(new Set(openSet));
      setClosedSet(new Set(closedSet));
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    return { openSet, closedSet, path: [] }; // No path found
  }, [calculateHeuristic, getNeighbors, heuristic, animationSpeed]);

  // Animate path
  const animatePath = useCallback(async (path) => {
    for (const node of path) {
      node.isPath = true;
      setPath(prev => [...prev, node]);
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
  }, [animationSpeed]);

  // Handle cell click
  const handleCellClick = useCallback((row, col) => {
    if (isVisualizing) return;

    const newGrid = grid.map(gridRow => [...gridRow]);
    const node = newGrid[row][col];

    if (currentMode === 'start') {
      if (startNode) {
        startNode.isStart = false;
      }
      node.isStart = true;
      node.isWall = false;
      node.isEnd = false;
      setStartNode(node);
    } else if (currentMode === 'end') {
      if (endNode) {
        endNode.isEnd = false;
      }
      node.isEnd = true;
      node.isWall = false;
      node.isStart = false;
      setEndNode(node);
    } else if (currentMode === 'wall') {
      if (node.isStart || node.isEnd) return;
      node.isWall = !node.isWall;
    }

    setGrid(newGrid);
  }, [grid, currentMode, startNode, endNode, isVisualizing]);

  // Handle mouse events for wall drawing
  const handleMouseDown = useCallback((row, col) => {
    if (currentMode !== 'wall' || isVisualizing) return;
    setIsMousePressed(true);
    handleCellClick(row, col);
  }, [handleCellClick, currentMode, isVisualizing]);

  const handleMouseEnter = useCallback((row, col) => {
    if (!isMousePressed || currentMode !== 'wall' || isVisualizing) return;
    handleCellClick(row, col);
  }, [handleCellClick, isMousePressed, currentMode, isVisualizing]);

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);

  // Run A* algorithm
  const runAStar = useCallback(async () => {
    if (!startNode || !endNode || isVisualizing) return;

    setIsVisualizing(true);
    setOpenSet(new Set());
    setClosedSet(new Set());
    setPath([]);

    const { path: foundPath } = await aStar(startNode, endNode, grid);

    if (foundPath.length > 0) {
      await animatePath(foundPath);
    }

    setIsVisualizing(false);
  }, [startNode, endNode, isVisualizing, aStar, animatePath, grid]);

  // Reset grid
  const resetGrid = useCallback(() => {
    setGrid(initializeGrid());
    setStartNode(null);
    setEndNode(null);
    setOpenSet(new Set());
    setClosedSet(new Set());
    setPath([]);
    setIsVisualizing(false);
  }, [initializeGrid]);

  // Initialize grid on mount
  useEffect(() => {
    setGrid(initializeGrid());
  }, [initializeGrid]);

  // Cell component
  const Cell = ({ node, row, col }) => {
    let cellClass = 'astar-cell';

    if (node.isStart) cellClass += ' start';
    else if (node.isEnd) cellClass += ' end';
    else if (node.isWall) cellClass += ' wall';
    else if (node.isPath) cellClass += ' path';
    else if (closedSet.has(node)) cellClass += ' closed';
    else if (openSet.has(node)) cellClass += ' open';

    return (
      <div
        className={cellClass}
        onMouseDown={() => handleMouseDown(row, col)}
        onMouseEnter={() => handleMouseEnter(row, col)}
        onMouseUp={handleMouseUp}
        onClick={() => handleCellClick(row, col)}
      >
        {showValues && !node.isWall && !node.isStart && !node.isEnd && (
          <div className="cell-values">
            <div className="f-value">{node.f === Infinity ? '∞' : node.f}</div>
            <div className="g-h-values">
              <span className="g-value">{node.g === Infinity ? '∞' : node.g}</span>
              <span className="h-value">{node.h}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="astar-visualizer">
      <div className="astar-controls">
        <div className="control-group">
          <label>Mode:</label>
          <div className="mode-buttons">
            <button
              className={`btn ${currentMode === 'wall' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCurrentMode('wall')}
              disabled={isVisualizing}
            >
              Wall
            </button>
            <button
              className={`btn ${currentMode === 'start' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCurrentMode('start')}
              disabled={isVisualizing}
            >
              Start
            </button>
            <button
              className={`btn ${currentMode === 'end' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCurrentMode('end')}
              disabled={isVisualizing}
            >
              End
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Heuristic:</label>
          <select
            value={heuristic}
            onChange={(e) => setHeuristic(e.target.value)}
            disabled={isVisualizing}
            className="form-select"
          >
            <option value="manhattan">Manhattan</option>
            <option value="euclidean">Euclidean</option>
          </select>
        </div>

        <div className="control-group">
          <label>Speed:</label>
          <select
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            disabled={isVisualizing}
            className="form-select"
          >
            <option value={100}>Slow</option>
            <option value={50}>Medium</option>
            <option value={10}>Fast</option>
          </select>
        </div>

        <div className="control-group">
          <button
            className="btn btn-primary"
            onClick={runAStar}
            disabled={isVisualizing || !startNode || !endNode}
          >
            {isVisualizing ? 'Running...' : 'Run A*'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={resetGrid}
            disabled={isVisualizing}
          >
            Reset
          </button>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showValues}
              onChange={(e) => setShowValues(e.target.checked)}
            />
            Show f/g/h values
          </label>
        </div>
      </div>

      <div className="astar-grid" onMouseUp={handleMouseUp}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="astar-row">
            {row.map((node, colIndex) => (
              <Cell
                key={colIndex}
                node={node}
                row={rowIndex}
                col={colIndex}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="astar-legend">
        <div className="legend-item">
          <div className="legend-color start"></div>
          <span>Start</span>
        </div>
        <div className="legend-item">
          <div className="legend-color end"></div>
          <span>End</span>
        </div>
        <div className="legend-item">
          <div className="legend-color wall"></div>
          <span>Wall</span>
        </div>
        <div className="legend-item">
          <div className="legend-color open"></div>
          <span>Open Set</span>
        </div>
        <div className="legend-item">
          <div className="legend-color closed"></div>
          <span>Closed Set</span>
        </div>
        <div className="legend-item">
          <div className="legend-color path"></div>
          <span>Path</span>
        </div>
      </div>
    </div>
  );
};

export default AStarVisualizer;
