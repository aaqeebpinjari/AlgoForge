// src/pages/Sorting.jsx
import React, { useState } from "react";
import Sorting from "../components/Sorting";
import SubscribeButton from "../components/SubscribeButton";

export default function SortingPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort"); // example default

  return (
    <div className="theme-container">
      <h1 className="theme-title">Sorting Algorithms Visualizer</h1>
      <p className="theme-description">
        Visualize and compare different sorting algorithms step by step.
      </p>

      {/* 🔔 Subscribe button */}
      <SubscribeButton algorithmId={selectedAlgorithm} />

      <Sorting onAlgorithmChange={setSelectedAlgorithm} />
    </div>
  );
}
