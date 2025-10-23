// src/components/DCVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const DCVisualizer = ({
  defaultAlgorithm = "mergeSort",
  autoLoadExample = false,
  problemSize = 8
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Divide & Conquer Algorithms =================

  // 1️⃣ Merge Sort
  const mergeSort = (arr = [38, 27, 43, 3, 9, 82, 10]) => {
    const stepsArr = [];
    const merge = (left, right) => {
      let result = [];
      while (left.length && right.length) {
        if (left[0] <= right[0]) result.push(left.shift());
        else result.push(right.shift());
        stepsArr.push({ board: copySteps([...result, ...left, ...right]), message: `Merging: [${[...result, ...left, ...right]}]` });
      }
      result = result.concat(left, right);
      return result;
    };

    const mergeSortRec = (array) => {
      if (array.length <= 1) return array;
      const mid = Math.floor(array.length / 2);
      const left = mergeSortRec(array.slice(0, mid));
      const right = mergeSortRec(array.slice(mid));
      return merge(left, right);
    };

    const sorted = mergeSortRec([...arr]);
    stepsArr.push({ board: copySteps(sorted), message: "Merge Sort complete." });
    return stepsArr;
  };

  // 2️⃣ Quick Sort
  const quickSort = (arr = [10, 7, 8, 9, 1, 5]) => {
    const stepsArr = [];

    const qs = (array) => {
      if (array.length <= 1) return array;
      const pivot = array[array.length - 1];
      const left = [], right = [];
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) left.push(array[i]);
        else right.push(array[i]);
      }
      stepsArr.push({ board: copySteps([...left, pivot, ...right]), message: `Partition around pivot ${pivot}` });
      return [...qs(left), pivot, ...qs(right)];
    };

    const sorted = qs([...arr]);
    stepsArr.push({ board: copySteps(sorted), message: "Quick Sort complete." });
    return stepsArr;
  };

  // 3️⃣ Binary Search (on sorted array)
  const binarySearch = (arr = [1, 3, 5, 7, 9, 11, 13], target = 7) => {
    const stepsArr = [];
    let left = 0, right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      stepsArr.push({ board: copySteps(arr.slice(left, right + 1)), message: `Checking middle element ${arr[mid]}` });
      if (arr[mid] === target) {
        stepsArr.push({ board: copySteps([arr[mid]]), message: `Element ${target} found!` });
        return stepsArr;
      } else if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }

    stepsArr.push({ board: copySteps([]), message: `Element ${target} not found.` });
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "mergeSort": generatedSteps = mergeSort(); break;
      case "quickSort": generatedSteps = quickSort(); break;
      case "binarySearch": generatedSteps = binarySearch(); break;
      default: setMessage("Algorithm not implemented!"); return;
    }
    if (generatedSteps.length === 0) { setMessage("No steps generated."); return; }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length) { setIsVisualizing(false); setMessage("Visualization complete!"); return; }
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const resetVisualizer = () => { setSteps([]); setCurrentStep(0); setIsVisualizing(false); setMessage("Select an algorithm and run."); };

  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0] === 'number') {
      return <div className="list-visualizer">{stepBoard.map((num, i) => <span key={i} className="list-item">{num}</span>)}</div>;
    }

    return <pre>{JSON.stringify(stepBoard, null, 2)}</pre>;
  };

  return (
    <div className="dc-visualizer">
      <h2>Divide & Conquer Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="mergeSort">Merge Sort</option>
          <option value="quickSort">Quick Sort</option>
          <option value="binarySearch">Binary Search</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing || currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing || currentStep === steps.length - 1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default DCVisualizer;
