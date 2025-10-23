import React, { useState } from "react";
import CodeEditor from "./CodeEditor"; // reusing your existing editor
import Sorting from "./Sorting";       // example visualization component

const Playground = () => {
  const [algorithm, setAlgorithm] = useState("sorting");

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900">
      {/* Left Panel - Code Editor */}
      <div className="w-1/2 border-r border-gray-300 dark:border-gray-700 p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          Code Editor
        </h2>
        <CodeEditor />
      </div>

      {/* Right Panel - Visualization */}
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          Visualization
        </h2>

        {/* Dropdown to choose visualization */}
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="mb-4 p-2 rounded border"
        >
          <option value="sorting">Sorting</option>
          <option value="graph">Graph Traversal</option>
          <option value="tree">Binary Tree</option>
        </select>

        <div className="border rounded-lg p-4 h-[80%] overflow-auto bg-white dark:bg-gray-800 shadow">
          {algorithm === "sorting" && <Sorting />}
          {algorithm === "graph" && <p>⚡ Graph Visualizer coming soon</p>}
          {algorithm === "tree" && <p>🌳 Tree Visualizer coming soon</p>}
        </div>
      </div>
    </div>
  );
};

export default Playground;
