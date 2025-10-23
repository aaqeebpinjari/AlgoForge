// src/components/BinaryTree/BinaryTreeVisualizer.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import "./BinaryTreeVisualizer.css";
import { insertBST, deleteBST, findBST, cloneTree } from "./utils/bst";
import { layoutTree } from "./utils/layout";

/**
 * 🎯 Binary Tree Visualizer Component
 * 
 * A comprehensive visualization tool for binary search tree operations
 * including insertion, deletion, search, and various traversal algorithms.
 */
export default function BinaryTreeVisualizer() {
  // 🌳 Core tree state management
  const [root, setRoot] = useState(null);

  // 🎮 UI state management
  const [value, setValue] = useState("");           // Single operation input value
  const [bulk, setBulk] = useState("");             // Batch insert input values
  const [animateInserts, setAnimateInserts] = useState(false); // Animation toggle
  const [stepMode, setStepMode] = useState(false);             // Step-by-step mode
  const [speed, setSpeed] = useState(450);                     // Animation speed
  const [traversal, setTraversal] = useState("inorder");       // Current traversal type
  const [isBusy, setIsBusy] = useState(false);                 // Operation in progress

  // 🎨 Animation state management
  const [activePath, setActivePath] = useState([]);    // Current active traversal path
  const [activeNodeId, setActiveNodeId] = useState(null); // Currently active node
  const [visited, setVisited] = useState([]);          // Visited nodes during traversal
  const [order, setOrder] = useState([]);              // Textual traversal order

  // 🔢 ID generator for tree nodes
  const idCounter = useRef(1);
  
  /**
   * 🏗️ Create a new tree node with unique ID
   * @param {number} val - Node value
   * @returns {Object} New node object
   */
  function makeNode(val) {
    return { 
      id: idCounter.current++, 
      val, 
      left: null, 
      right: null 
    };
  }

  // 📐 Compute tree layout for visualization
  const laidOut = useMemo(() => layoutTree(root), [root, activeNodeId]);

  /**
   * 🧹 Reset all visualization highlights
   */
  function resetHighlights() {
    setActivePath([]);
    setActiveNodeId(null);
    setVisited([]);
    setOrder([]);
  }

  // ⏭️ Step runner for step-by-step mode
  const nextResolver = useRef(null);
  
  /**
   * ⏳ Wait for next step in step-by-step mode
   * @returns {Promise} Resolves when next step is triggered
   */
  function waitForNextClick() {
    return new Promise((resolve) => { 
      nextResolver.current = resolve; 
    });
  }

  /**
   * ▶️ Advance to next step in step-by-step mode
   */
  function handleNext() {
    if (nextResolver.current) {
      nextResolver.current();
      nextResolver.current = null;
    }
  }

  /**
   * 🎬 Execute algorithm with animation steps
   * @param {Array} steps - Array of animation steps
   * @param {Function} postApply - Callback after execution
   */
  async function runWithSteps(steps, postApply) {
    setIsBusy(true);
    
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      const currentStep = steps[stepIndex];
      
      // 🎨 Update visualization based on step type
      if (currentStep.type === "focus") {
        setActiveNodeId(currentStep.nodeId);
        setActivePath((previousPath) => 
          previousPath[previousPath.length - 1] === currentStep.nodeId 
            ? previousPath 
            : [...previousPath, currentStep.nodeId]
        );
      } else if (currentStep.type === "visit") {
        setVisited((previousVisited) => 
          previousVisited[previousVisited.length - 1] === currentStep.nodeId 
            ? previousVisited 
            : [...previousVisited, currentStep.nodeId]
        );
      } else if (currentStep.type === "apply" && currentStep.snapshot) {
        setRoot(cloneTree(currentStep.snapshot));
      }

      // ⏰ Handle timing based on step mode
      if (stepMode) {
        // eslint-disable-next-line no-await-in-loop
        await waitForNextClick();
      } else {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
    
    // 🎯 Execute post-application callback
    if (typeof postApply === "function") postApply();
    setIsBusy(false);
  }

  // 🔧 Utility functions
  /**
   * 📝 Parse numeric values from string input
   * @param {string} str - Input string with numbers
   * @returns {Array} Array of parsed numbers
   */
  function parseNums(str) {
    return str
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter((n) => Number.isFinite(n));
  }

  // 🎯 Tree operations
  /**
   * ➕ Insert single value into tree
   * @param {Event} e - Form event
   */
  async function onInsertOne(e) {
    e?.preventDefault?.();
    if (value === "") return;
    
    const num = Number(value);
    if (!Number.isFinite(num)) return;

    resetHighlights();
    const { rootAfter, steps } = insertBST(root, makeNode, num);
    
    if (animateInserts) {
      await runWithSteps(steps, () => setRoot(rootAfter));
    } else {
      setRoot(rootAfter); // 🚀 Instant insertion
    }
    setValue("");
  }

  /**
   * 🔍 Search for value in tree
   * @param {Event} e - Form event
   */
  async function onSearch(e) {
    e?.preventDefault?.();
    if (value === "") return;
    
    const num = Number(value);
    if (!Number.isFinite(num)) return;

    resetHighlights();
    const { found, steps } = findBST(root, num);
    
    await runWithSteps(steps, () => {
      if (!found) {
        const canvasWrapper = document.querySelector(".btv-canvas");
        canvasWrapper?.classList.add("btv-shake");
        setTimeout(() => canvasWrapper?.classList.remove("btv-shake"), 420);
      }
    });
  }

  /**
   * 🗑️ Delete value from tree
   * @param {Event} e - Form event
   */
  async function onDelete(e) {
    e?.preventDefault?.();
    if (value === "") return;
    
    const num = Number(value);
    if (!Number.isFinite(num)) return;

    resetHighlights();
    const { rootAfter, steps } = deleteBST(root, num);
    
    await runWithSteps(steps, () => setRoot(rootAfter));
    setValue("");
  }

  /**
   * 📦 Insert multiple values instantly
   */
  async function onInsertMany() {
    const nums = parseNums(bulk);
    if (!nums.length) return;
    
    resetHighlights();
    let currentRoot = root;
    
    for (const num of nums) {
      const { rootAfter } = insertBST(currentRoot, makeNode, num);
      currentRoot = rootAfter;
    }
    
    setRoot(currentRoot); // 🚀 Instant batch insertion
    setBulk("");
  }

  /**
   * 🎬 Insert multiple values with animation
   */
  async function onInsertManyAnimated() {
    const nums = parseNums(bulk);
    if (!nums.length) return;
    
    resetHighlights();
    let currentRoot = root;
    setIsBusy(true);
    
    for (const num of nums) {
      const { rootAfter, steps } = insertBST(currentRoot, makeNode, num);
      await runWithSteps(steps);
      currentRoot = rootAfter;
    }
    
    setRoot(currentRoot);
    setBulk("");
    setIsBusy(false);
  }

  // 🔄 Tree traversal operations
  /**
   * 🛤️ Execute tree traversal algorithm
   * @param {string} kind - Traversal type (inorder, preorder, postorder, level)
   */
  async function onTraverse(kind) {
    resetHighlights();
    setTraversal(kind);

    const sequence = [];
    const orderValues = [];
    
    /**
     * 📝 Record node visit in traversal
     * @param {Object} node - Tree node to visit
     */
    const pushVisit = (node) => {
      if (!node) return;
      sequence.push({ type: "visit", nodeId: node.id });
      orderValues.push(node.val);
    };

    /**
     * 📊 Inorder traversal (Left, Node, Right)
     * @param {Object} node - Current node
     */
    function inorder(node) {
      if (!node) return;
      sequence.push({ type: "focus", nodeId: node.id });
      inorder(node.left);
      pushVisit(node);
      inorder(node.right);
    }

    /**
     * 📊 Preorder traversal (Node, Left, Right)
     * @param {Object} node - Current node
     */
    function preorder(node) {
      if (!node) return;
      sequence.push({ type: "focus", nodeId: node.id });
      pushVisit(node);
      preorder(node.left);
      preorder(node.right);
    }

    /**
     * 📊 Postorder traversal (Left, Right, Node)
     * @param {Object} node - Current node
     */
    function postorder(node) {
      if (!node) return;
      sequence.push({ type: "focus", nodeId: node.id });
      postorder(node.left);
      postorder(node.right);
      pushVisit(node);
    }

    /**
     * 📊 Level-order traversal (Breadth-first)
     * @param {Object} node - Root node
     */
    function level(node) {
      const queue = [];
      if (node) queue.push(node);
      
      while (queue.length) {
        const currentNode = queue.shift();
        sequence.push({ type: "focus", nodeId: currentNode.id });
        pushVisit(currentNode);
        
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }
    }

    // 🎯 Execute selected traversal algorithm
    if (kind === "inorder") inorder(root);
    if (kind === "preorder") preorder(root);
    if (kind === "postorder") postorder(root);
    if (kind === "level") level(root);

    setOrder(orderValues); // 📋 Display traversal order immediately
    await runWithSteps(sequence);
  }

  /**
   * 🧹 Clear entire tree
   */
  function onClear() {
    resetHighlights();
    setRoot(null);
    setOrder([]);
  }

  // ⌨️ Keyboard event handling
  useEffect(() => {
    /**
     * 🎹 Handle keyboard shortcuts
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleKeyDown(event) {
      if (event.key === "Enter" && !event.shiftKey) onInsertOne(event);
      if (event.key === "Enter" && event.shiftKey) onDelete(event);
      if ((event.key === "n" || event.key === "N") && stepMode) handleNext();
    }
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stepMode, value, root]);

  return (
    <div className="btv-wrap">
      {/* 🛠️ Control Toolbar */}
      <header className="btv-toolbar">
        <div className="btv-controls">
          <div className="btv-row">
            
            {/* ➕ Insert Operations Card */}
            <div className="btv-card">
              <div className="btv-card-title">Insert Operations</div>
              <div className="btv-input-row">
                <input
                  className="btv-input"
                  type="number"
                  placeholder="Enter value (e.g., 50)"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  disabled={isBusy && stepMode}
                  aria-label="Value to insert"
                />
                <button
                  className="btv-btn btv-primary"
                  onClick={onInsertOne}
                  disabled={isBusy && stepMode}
                  title="Insert value into tree"
                >
                  Insert
                </button>
              </div>

              <div className="btv-subtle">
                Bulk insert: separate values with spaces, commas, or newlines
              </div>
              <div className="btv-input-row">
                <textarea
                  className="btv-input btv-textarea"
                  placeholder="Example: 50 30,70 20,40 60 80"
                  value={bulk}
                  onChange={(event) => setBulk(event.target.value)}
                  rows={2}
                  aria-label="Multiple values to insert"
                />
              </div>
              <div className="btv-input-row">
                <button 
                  className="btv-btn" 
                  onClick={onInsertMany} 
                  disabled={isBusy}
                  title="Insert all values instantly"
                >
                  Insert All (Instant)
                </button>
                <button
                  className="btv-btn"
                  onClick={onInsertManyAnimated}
                  disabled={isBusy}
                  title="Insert all values with animation"
                >
                  Insert All (Animated)
                </button>
              </div>

              <label className="btv-checkbox">
                <input
                  type="checkbox"
                  checked={animateInserts}
                  onChange={(event) => setAnimateInserts(event.target.checked)}
                  aria-label="Animate single insert operations"
                />
                Animate Single Inserts
              </label>
            </div>

            {/* 🔍 Search & Delete Operations Card */}
            <div className="btv-card">
              <div className="btv-card-title">Search & Delete Operations</div>
              <div className="btv-input-row">
                <input
                  className="btv-input"
                  type="number"
                  placeholder="Enter target value"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  aria-label="Value to search or delete"
                />
                <button 
                  className="btv-btn" 
                  onClick={onSearch} 
                  disabled={isBusy && stepMode}
                  title="Search for value in tree"
                >
                  Search
                </button>
                <button 
                  className="btv-btn" 
                  onClick={onDelete} 
                  disabled={isBusy && stepMode}
                  title="Delete value from tree"
                >
                  Delete
                </button>
              </div>

              <div className="btv-toggle-row">
                <label className="btv-checkbox">
                  <input
                    type="checkbox"
                    checked={stepMode}
                    onChange={(event) => setStepMode(event.target.checked)}
                    aria-label="Enable step-by-step mode"
                  />
                  Step-by-Step Mode
                </label>
                <div className="btv-speed">
                  <label className="btv-speed-label">Animation Speed</label>
                  <input
                    type="range"
                    min="200"
                    max="1200"
                    step="50"
                    value={speed}
                    onChange={(event) => setSpeed(Number(event.target.value))}
                    disabled={stepMode}
                    aria-label="Adjust animation speed"
                  />
                </div>
                {stepMode && (
                  <button
                    className="btv-btn btv-accent"
                    type="button"
                    onClick={handleNext}
                    disabled={!isBusy}
                    title="Advance to next step (N key)"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>

            {/* 🔄 Traversal Operations Card */}
            <div className="btv-card">
              <div className="btv-card-title">Tree Traversal Algorithms</div>
              <div className="btv-seg" role="group" aria-label="Traversal algorithm selection">
                {[
                  ["inorder", "Inorder"],
                  ["preorder", "Preorder"],
                  ["postorder", "Postorder"],
                  ["level", "Level Order"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={`btv-seg-btn ${traversal === key ? "is-active" : ""}`}
                    onClick={() => onTraverse(key)}
                    disabled={!root || (isBusy && stepMode)}
                    aria-pressed={traversal === key}
                    title={`Execute ${label.toLowerCase()} traversal`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="btv-actions">
                <button 
                  className="btv-btn" 
                  onClick={onClear}
                  title="Clear entire tree"
                >
                  Clear Tree
                </button>
              </div>
            </div>
          </div>

          {/* 💡 Usage Hints */}
          <p className="btv-hint">
            💡 Insert multiple values instantly, then select a traversal to visualize the path and visiting order.
            Press <kbd>N</kbd> to advance in step-by-step mode. Use <kbd>Shift</kbd>+<kbd>Enter</kbd> to delete values.
          </p>
        </div>
      </header>

      {/* 🎨 Visualization Canvas */}
      <section 
        className="btv-canvas" 
        role="region" 
        aria-label="Binary tree visualization"
        aria-live="polite"
      >
        <svg 
          className="btv-svg" 
          viewBox={laidOut.viewBox.join(" ")} 
          preserveAspectRatio="xMidYMid meet"
          aria-label="Tree structure diagram"
        >
          {/* 🌿 Tree edges (connections between nodes) */}
          {laidOut.links.map((link) => (
            <line
              key={`${link.source.id}-${link.target.id}`}
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              className="btv-edge"
              aria-hidden="true"
            />
          ))}
          
          {/* 🔵 Tree nodes */}
          {laidOut.nodes.map((node) => {
            const isActive = node.id === activeNodeId;
            const inPath = activePath.includes(node.id);
            const isVisited = visited.includes(node.id);
            
            const nodeClasses = [
              "btv-node",
              isActive && "is-active",
              inPath && "in-path",
              isVisited && "is-visited"
            ].filter(Boolean).join(" ");
            
            return (
              <g 
                key={node.id} 
                transform={`translate(${node.x},${node.y})`} 
                className={nodeClasses}
                aria-label={`Node with value ${node.val}`}
              >
                <circle r="20" aria-hidden="true" />
                <text dy="6" aria-hidden="true">{node.val}</text>
              </g>
            );
          })}
        </svg>
      </section>

      {/* 📊 Visualization Legend */}
      <footer className="btv-legend" aria-label="Visualization legend">
        <div className="legend-item">
          <span className="chip chip-active" aria-hidden="true" />
          <span>Current Node</span>
        </div>
        <div className="legend-item">
          <span className="chip chip-path" aria-hidden="true" />
          <span>Active Path</span>
        </div>
        <div className="legend-item">
          <span className="chip chip-visited" aria-hidden="true" />
          <span>Visited Node</span>
        </div>
      </footer>

      {/* 📋 Traversal Order Display */}
      {order.length > 0 && (
        <section className="btv-order" aria-label="Traversal order results">
          <div className="btv-order-head">
            <span className="btv-order-title">
              {traversal === "inorder" && "Inorder Traversal"}
              {traversal === "preorder" && "Preorder Traversal"}
              {traversal === "postorder" && "Postorder Traversal"}
              {traversal === "level" && "Level-Order Traversal"} Results
            </span>
            <button
              className="btv-btn btv-order-copy"
              type="button"
              onClick={() => navigator.clipboard?.writeText(order.join(" "))}
              title="Copy traversal order to clipboard"
              aria-label="Copy traversal order"
            >
              Copy Order
            </button>
          </div>

          <div className="btv-order-line" role="list" aria-label="Traversal sequence">
            {order.map((value, index) => (
              <React.Fragment key={`${value}-${index}`}>
                <span 
                  role="listitem" 
                  className="btv-pill"
                  aria-label={`Position ${index + 1}: ${value}`}
                >
                  {value}
                </span>
                {index < order.length - 1 && (
                  <span className="btv-arrow" aria-hidden="true">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
