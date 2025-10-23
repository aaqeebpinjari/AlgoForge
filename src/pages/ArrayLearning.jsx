import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
// use your existing CodeEditor component

// Sample array questions
const questions = [
  {
    id: 1,
    title: "Find the maximum element",
    description: "Find the maximum element in an array of integers.",
    inputExample: "[3, 1, 4, 1, 5, 9]",
    outputExample: "9",
    solution: `function findMax(arr) {
  let max = arr[0];
  for(let i=1;i<arr.length;i++){
    if(arr[i] > max) max = arr[i];
  }
  return max;
}`,
  },
  {
    id: 2,
    title: "Reverse an array",
    description: "Reverse an array in-place.",
    inputExample: "[1,2,3,4,5]",
    outputExample: "[5,4,3,2,1]",
    solution: `function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while(left < right){
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++; right--;
  }
  return arr;
}`,
  },
  {
    id: 3,
    title: "Sum of array elements",
    description: "Find the sum of all elements in an array.",
    inputExample: "[1,2,3,4,5]",
    outputExample: "15",
    solution: `function sumArray(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}`,
  },
];

export default function ArrayLearning() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCode, setUserCode] = useState(questions[0].solution);
  const [output, setOutput] = useState("");
  const [showSolution, setShowSolution] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserCode(questions[currentIndex + 1].solution);
      setOutput("");
      setShowSolution(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserCode(questions[currentIndex - 1].solution);
      setOutput("");
      setShowSolution(false);
    }
  };

  const handleRunCode = () => {
    try {
      // Evaluate JS code safely
      // eslint-disable-next-line no-new-func
      const func = new Function("arr", userCode + "\nreturn " + currentQuestion.solution.match(/function\s+\w+\((.*?)\)/)[1]);
      const result = func(JSON.parse(currentQuestion.inputExample));
      setOutput(JSON.stringify(result));
    } catch (err) {
      setOutput(err.message);
    }
  };

  return (
    <div className="array-learning p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{currentQuestion.title}</h1>
      <p className="mb-2">{currentQuestion.description}</p>
      <p><strong>Input Example:</strong> {currentQuestion.inputExample}</p>
      <p><strong>Expected Output:</strong> {currentQuestion.outputExample}</p>

      <div className="code-editor mt-4">
        <CodeEditor
          value={userCode}
          onChange={(val) => setUserCode(val)}
          language="javascript"
        />
      </div>

      <div className="actions mt-4 flex gap-2">
        <button
          onClick={handleRunCode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Run Code
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
      </div>

      {output && (
        <div className="output mt-4 p-2 bg-gray-100 rounded">
          <strong>Output:</strong> {output}
        </div>
      )}

      {showSolution && (
        <div className="solution mt-4 p-2 bg-gray-100 rounded">
          <strong>Solution:</strong>
          <pre>{currentQuestion.solution}</pre>
        </div>
      )}

      <div className="navigation mt-4 flex gap-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}