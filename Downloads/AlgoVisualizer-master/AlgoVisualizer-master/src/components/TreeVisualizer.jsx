// src/components/TreeVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";
import "../styles/TreeVisualizer.css";

const TreeVisualizer = ({
  defaultAlgorithm = "InorderTraversal",
  autoLoadExample = false
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  // sync with parent
  useEffect(() => {
    setAlgorithm(defaultAlgorithm);
  }, [defaultAlgorithm]);

  // ================= Helpers =================
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  const copySteps = (arr) =>
    arr.map((row) => (Array.isArray(row) ? [...row] : row));

  // ================= Tree Algorithms =================
  const createSampleTree = () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    return root;
  };

  const inorderTraversal = (root) => {
    const stepsArr = [];
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      stepsArr.push({
        board: copySteps(result),
        message: `Visited node ${node.val}`,
      });
      traverse(node.right);
    };
    traverse(root);
    stepsArr.push({
      board: copySteps(result),
      message: `Inorder traversal complete: [${result.join(", ")}]`,
    });
    return stepsArr;
  };

  const preorderTraversal = (root) => {
    const stepsArr = [];
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      result.push(node.val);
      stepsArr.push({
        board: copySteps(result),
        message: `Visited node ${node.val}`,
      });
      traverse(node.left);
      traverse(node.right);
    };
    traverse(root);
    stepsArr.push({
      board: copySteps(result),
      message: `Preorder traversal complete: [${result.join(", ")}]`,
    });
    return stepsArr;
  };

  const postorderTraversal = (root) => {
    const stepsArr = [];
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
      stepsArr.push({
        board: copySteps(result),
        message: `Visited node ${node.val}`,
      });
    };
    traverse(root);
    stepsArr.push({
      board: copySteps(result),
      message: `Postorder traversal complete: [${result.join(", ")}]`,
    });
    return stepsArr;
  };

  const levelOrderTraversal = (root) => {
    const stepsArr = [];
    const result = [];
    const queue = root ? [root] : [];
    while (queue.length) {
      const node = queue.shift();
      result.push(node.val);
      stepsArr.push({
        board: copySteps(result),
        message: `Visited node ${node.val}`,
      });
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    stepsArr.push({
      board: copySteps(result),
      message: `Level order traversal complete: [${result.join(", ")}]`,
    });
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    const tree = createSampleTree();
    let generatedSteps = [];
    switch (algorithm) {
      case "InorderTraversal":
        generatedSteps = inorderTraversal(tree);
        break;
      case "PreorderTraversal":
        generatedSteps = preorderTraversal(tree);
        break;
      case "PostorderTraversal":
        generatedSteps = postorderTraversal(tree);
        break;
      case "LevelOrderTraversal":
        generatedSteps = levelOrderTraversal(tree);
        break;
      default:
        setMessage("Algorithm not implemented!");
        return;
    }

    if (generatedSteps.length === 0) {
      setMessage("No steps generated. Check input.");
      return;
    }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) {
        setIsVisualizing(false);
        setMessage("Visualization complete!");
        return;
      }
      const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  // ================= Controls =================
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const resetVisualizer = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsVisualizing(false);
    setMessage("Select an algorithm and run.");
  };

  // ================= Render =================
  const renderBoard = () => {
    const TITLES = {
      InorderTraversal: "Inorder",
      PreorderTraversal: "Preorder",
      PostorderTraversal: "Postorder",
      LevelOrderTraversal: "Level Order",
    };

    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

    if (Array.isArray(stepBoard)) {
      return (
        <section className="tree-order" aria-label="Traversal order">
          <div className="tree-order__head">
            <span className="tree-order__title">
              {TITLES[algorithm]} Traversal — step {Math.min(currentStep + 1, steps.length)} / {steps.length}
            </span>
            <button
              className="tree-btn tree-btn--ghost"
              onClick={() =>
                navigator.clipboard?.writeText(stepBoard.join(" "))
              }
              title="Copy order"
            >
              Copy
            </button>
          </div>
          <div className="tree-order__line">
            {stepBoard.map((val, i) => (
              <React.Fragment key={i}>
                <span className="tree-pill">{val}</span>
                {i < stepBoard.length - 1 && <span className="tree-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <div className="tree-visualizer">
      <h2 className="tree-title">Tree Algorithm Visualizer</h2>
      <div className="tree-toolbar">
        <label className="tree-label" htmlFor="algo-select">
          Algorithm:
        </label>
        <select
          id="algo-select"
          className="tree-input"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isVisualizing}
        >
          <option value="InorderTraversal">Inorder Traversal</option>
          <option value="PreorderTraversal">Preorder Traversal</option>
          <option value="PostorderTraversal">Postorder Traversal</option>
          <option value="LevelOrderTraversal">Level Order Traversal</option>
        </select>
        <div className="tree-buttons">
          <button
            className="tree-btn tree-btn--primary"
            onClick={runAlgorithm}
            disabled={isVisualizing}
          >
            Run
          </button>
          <button
            className="tree-btn"
            onClick={prevStep}
            disabled={isVisualizing || currentStep === 0}
          >
            Prev
          </button>
          <button
            className="tree-btn"
            onClick={nextStep}
            disabled={isVisualizing || currentStep === steps.length - 1}
          >
            Next
          </button>
          <button
            className="tree-btn"
            onClick={resetVisualizer}
            disabled={isVisualizing}
          >
            Reset
          </button>
        </div>
      </div>

      {renderBoard()}

      <p className="tree-message">
        {steps[currentStep]?.message || message}
      </p>
    </div>
  );
};

export default TreeVisualizer;
