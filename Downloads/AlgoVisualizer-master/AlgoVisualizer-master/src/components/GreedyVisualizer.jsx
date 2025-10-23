// src/components/GreedyVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const GreedyVisualizer = ({
  defaultAlgorithm = "activitySelection",
  autoLoadExample = false,
  problemSize = 5
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Greedy Algorithms =================

  // 1️⃣ Activity Selection
  const activitySelection = (activities = [{start:1,end:2},{start:3,end:4},{start:0,end:6}]) => {
    const stepsArr = [];
    activities.sort((a,b) => a.end - b.end);
    stepsArr.push({ board: copySteps(activities), message: "Activities sorted by end time." });

    const selected = [];
    let lastEnd = -1;
    for (let act of activities) {
      if (act.start >= lastEnd) {
        selected.push(act);
        lastEnd = act.end;
        stepsArr.push({ board: copySteps(selected), message: `Selected activity (${act.start},${act.end})` });
      }
    }
    stepsArr.push({ board: copySteps(selected), message: "Activity selection complete." });
    return stepsArr;
  };

  // 2️⃣ Fractional Knapsack
  const fractionalKnapsack = (items = [{value:60,weight:10},{value:100,weight:20},{value:120,weight:30}], W=50) => {
    const stepsArr = [];
    const n = items.length;
    const sortedItems = [...items].sort((a,b) => (b.value/b.weight)-(a.value/a.weight));
    stepsArr.push({ board: copySteps(sortedItems), message: "Items sorted by value/weight ratio." });

    let remaining = W;
    const taken = [];
    for (let item of sortedItems) {
      if (remaining >= item.weight) {
        taken.push({...item, fraction:1});
        remaining -= item.weight;
        stepsArr.push({ board: copySteps(taken), message: `Took full item value=${item.value}, weight=${item.weight}` });
      } else {
        taken.push({...item, fraction: remaining/item.weight});
        stepsArr.push({ board: copySteps(taken), message: `Took fraction ${remaining/item.weight} of item value=${item.value}` });
        remaining = 0;
        break;
      }
    }
    stepsArr.push({ board: copySteps(taken), message: "Fractional knapsack complete." });
    return stepsArr;
  };

  // 3️⃣ Huffman Encoding (simplified)
  const huffmanEncoding = (freq = {a:5,b:9,c:12,d:13,e:16,f:45}) => {
    const stepsArr = [];
    const nodes = Object.entries(freq).map(([char,f]) => ({char,f}));
    while (nodes.length > 1) {
      nodes.sort((a,b) => a.f - b.f);
      const left = nodes.shift();
      const right = nodes.shift();
      const merged = {char:left.char+right.char, f:left.f+right.f};
      nodes.push(merged);
      stepsArr.push({ board: copySteps(nodes), message: `Merged nodes ${left.char} and ${right.char}` });
    }
    stepsArr.push({ board: copySteps(nodes), message: "Huffman tree constructed." });
    return stepsArr;
  };

  // 4️⃣ Job Scheduling (Weighted)
  const jobScheduling = (jobs = [{start:1,end:3,profit:50},{start:2,end:5,profit:20},{start:4,end:6,profit:70}]) => {
    const stepsArr = [];
    jobs.sort((a,b) => a.end - b.end);
    stepsArr.push({ board: copySteps(jobs), message: "Jobs sorted by end time." });

    const n = jobs.length;
    const dp = Array(n).fill(0);
    dp[0] = jobs[0].profit;

    const latestNonConflict = (i) => {
      for (let j=i-1; j>=0; j--) if (jobs[j].end <= jobs[i].start) return j;
      return -1;
    };

    for (let i=1;i<n;i++) {
      let inclProfit = jobs[i].profit;
      const l = latestNonConflict(i);
      if (l !== -1) inclProfit += dp[l];
      dp[i] = Math.max(inclProfit, dp[i-1]);
      stepsArr.push({ board: copySteps(dp), message: `dp[${i}] = ${dp[i]}` });
    }
    stepsArr.push({ board: copySteps(dp), message: `Max profit = ${dp[n-1]}` });
    return stepsArr;
  };

  // 5️⃣ Minimum Spanning Tree (Prim simplified for visualization)
  const primKruskalMST = (graph = [[0,2,0],[2,0,3],[0,3,0]]) => {
    const stepsArr = [];
    const n = graph.length;
    const selected = Array(n).fill(false);
    selected[0] = true;
    let edges = [];

    while (edges.length < n-1) {
      let min = Infinity, u=-1,v=-1;
      for (let i=0;i<n;i++) {
        if (!selected[i]) continue;
        for (let j=0;j<n;j++) {
          if (selected[j] || graph[i][j]===0) continue;
          if (graph[i][j] < min) { min = graph[i][j]; u=i; v=j; }
        }
      }
      selected[v] = true;
      edges.push([u,v,min]);
      stepsArr.push({ board: copySteps(edges), message: `Edge added (${u},${v}) weight=${min}` });
    }

    stepsArr.push({ board: copySteps(edges), message: "MST complete." });
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "activitySelection": generatedSteps = activitySelection(); break;
      case "fractionalKnapsack": generatedSteps = fractionalKnapsack(); break;
      case "huffmanEncoding": generatedSteps = huffmanEncoding(); break;
      case "jobScheduling": generatedSteps = jobScheduling(); break;
      case "primKruskalMST": generatedSteps = primKruskalMST(); break;
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
      const timer = setTimeout(() => setCurrentStep(prev => prev+1), 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisualizing, steps]);

  const prevStep = () => setCurrentStep(prev => Math.max(prev-1,0));
  const nextStep = () => setCurrentStep(prev => Math.min(prev+1,steps.length-1));
  const resetVisualizer = () => { setSteps([]); setCurrentStep(0); setIsVisualizing(false); setMessage("Select an algorithm and run."); };

  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0]==='number') {
      return <div className="list-visualizer">{stepBoard.map((num,i)=><span key={i} className="list-item">{num}</span>)}</div>;
    }

    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0]==='object') {
      return (
        <div className="board">
          {stepBoard.map((item,i)=>(
            <div key={i} className="board-row">
              {Object.entries(item).map(([k,v],j)=>(
                <div key={j} className="cell">{`${k}:${v}`}</div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return <pre>{JSON.stringify(stepBoard,null,2)}</pre>;
  };

  return (
    <div className="greedy-visualizer">
      <h2>Greedy Algorithm Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="activitySelection">Activity Selection</option>
          <option value="fractionalKnapsack">Fractional Knapsack</option>
          <option value="huffmanEncoding">Huffman Encoding</option>
          <option value="jobScheduling">Job Scheduling</option>
          <option value="primKruskalMST">Minimum Spanning Tree</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing||currentStep===0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing||currentStep===steps.length-1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default GreedyVisualizer;
