import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const BacktrackingVisualizer = ({
  defaultAlgorithm = "NQueens",
  autoLoadExample = false,
  boardSize = 8
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [board, setBoard] = useState(
    Array.from({ length: boardSize }, () => Array(boardSize).fill(0))
  );
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");

  useEffect(() => {
    if (autoLoadExample) loadDefaultExample();
  }, [autoLoadExample]);

  const copyBoard = (b) => b.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Backtracking Algorithms =================

  // 1️⃣ N-Queens
  const nQueens = (size) => {
    const stepsArr = [];
    const board = Array.from({ length: size }, () => Array(size).fill(0));

    const isSafe = (row, col) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
      }
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
      }
      for (let i = row - 1, j = col + 1; i >= 0 && j < size; i--, j++) {
        if (board[i][j] === 1) return false;
      }
      return true;
    };

    const solve = (row) => {
      if (row === size) {
        stepsArr.push({ board: copyBoard(board), message: "Solution found!" });
        return true;
      }
      for (let col = 0; col < size; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 1;
          stepsArr.push({ board: copyBoard(board), message: `Placing queen at (${row},${col})` });
          if (solve(row + 1)) return true;
          board[row][col] = 0;
          stepsArr.push({ board: copyBoard(board), message: `Backtracking from (${row},${col})` });
        }
      }
      return false;
    };

    solve(0);
    return stepsArr;
  };

  // 2️⃣ Rat in a Maze
  const ratInMaze = (maze) => {
    const stepsArr = [];
    const n = maze.length;
    const solution = Array.from({ length: n }, () => Array(n).fill(0));

    const solve = (x, y) => {
      if (x === n - 1 && y === n - 1 && maze[x][y] === 1) {
        solution[x][y] = 1;
        stepsArr.push({ board: copyBoard(solution), message: "Goal reached!" });
        return true;
      }
      if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] === 1 && solution[x][y] === 0) {
        solution[x][y] = 1;
        stepsArr.push({ board: copyBoard(solution), message: `Moving to (${x},${y})` });
        if (solve(x + 1, y)) return true;
        if (solve(x, y + 1)) return true;
        solution[x][y] = 0;
        stepsArr.push({ board: copyBoard(solution), message: `Backtracking from (${x},${y})` });
        return false;
      }
      return false;
    };

    solve(0, 0);
    return stepsArr;
  };

  // 3️⃣ Sudoku Solver
  const sudokuSolver = (size) => {
    const stepsArr = [];
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    const isSafe = (r, c, n) => {
      for (let i = 0; i < 9; i++) {
        if (board[r][i] === n || board[i][c] === n) return false;
      }
      const startRow = 3 * Math.floor(r / 3);
      const startCol = 3 * Math.floor(c / 3);
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          if (board[startRow + i][startCol + j] === n) return false;
      return true;
    };

    const solve = () => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] === 0) {
            for (let n = 1; n <= 9; n++) {
              if (isSafe(r, c, n)) {
                board[r][c] = n;
                stepsArr.push({ board: copyBoard(board), message: `Placing ${n} at (${r},${c})` });
                if (solve()) return true;
                board[r][c] = 0;
                stepsArr.push({ board: copyBoard(board), message: `Backtracking from (${r},${c})` });
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    solve();
    return stepsArr;
  };

  // 4️⃣ Combination Sum
  const combinationSumVisualizer = (nums = [2, 3, 6, 7], target = 7) => {
    const stepsArr = [];

    const backtrack = (temp, remain, start) => {
      if (remain < 0) return;
      if (remain === 0) {
        stepsArr.push({ board: [...temp], message: `Combination found: [${temp.join(", ")}]` });
        return;
      }
      for (let i = start; i < nums.length; i++) {
        temp.push(nums[i]);
        stepsArr.push({ board: [...temp], message: `Adding ${nums[i]}` });
        backtrack(temp, remain - nums[i], i);
        temp.pop();
        stepsArr.push({ board: [...temp], message: `Backtracking` });
      }
    };

    backtrack([], target, 0);
    return stepsArr;
  };

  // 5️⃣ Word Search
  const wordSearchVisualizer = (size) => {
    const stepsArr = [];
    const board = Array.from({ length: size }, () => Array(size).fill('A'));
    const word = "AAA";

    const backtrack = (i, j, index, path) => {
      if (index === word.length) {
        stepsArr.push({ board: [...path], message: `Word found!` });
        return true;
      }
      if (i < 0 || j < 0 || i >= size || j >= size || board[i][j] !== word[index]) return false;
      const temp = board[i][j];
      board[i][j] = '#';
      const newPath = copyBoard(board);
      if (
        backtrack(i + 1, j, index + 1, newPath) ||
        backtrack(i - 1, j, index + 1, newPath) ||
        backtrack(i, j + 1, index + 1, newPath) ||
        backtrack(i, j - 1, index + 1, newPath)
      ) return true;
      board[i][j] = temp;
      stepsArr.push({ board: copyBoard(board), message: `Backtracking from (${i},${j})` });
      return false;
    };

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        backtrack(i, j, 0, board);
      }
    }

    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];

    switch (algorithm) {
      case "NQueens":
        generatedSteps = nQueens(boardSize);
        break;
      case "RatInMaze":
        const maze = Array.from({ length: boardSize }, () => Array(boardSize).fill(1));
        generatedSteps = ratInMaze(maze);
        break;
      case "Sudoku":
        generatedSteps = sudokuSolver();
        break;
      case "CombinationSum":
        generatedSteps = combinationSumVisualizer();
        break;
      case "WordSearch":
        generatedSteps = wordSearchVisualizer(boardSize);
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
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const resetBoard = () => {
    setBoard(Array.from({ length: boardSize }, () => Array(boardSize).fill(0)));
    setSteps([]);
    setCurrentStep(0);
    setIsVisualizing(false);
    setMessage("Board reset. Select an algorithm and run.");
  };
  const loadDefaultExample = () => {
    resetBoard();
    setMessage("Default example loaded. Run N-Queens to visualize.");
  };

  // ================= Render =================
  const renderBoard = () => {
    if (!steps[currentStep]) return null;

    const stepBoard = steps[currentStep].board;

    // Combination Sum is array of numbers
    if (Array.isArray(stepBoard) && !Array.isArray(stepBoard[0])) {
      return (
        <div className="list-visualizer">
          {stepBoard.map((num, i) => (
            <span key={i} className="list-item">{num}</span>
          ))}
        </div>
      );
    }

    return (
      <div className="board">
        {stepBoard.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((cell, j) => (
              <div key={j} className={`cell ${cell ? "active" : ""}`}>
                {typeof cell === "string" ? cell : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="backtracking-visualizer">
      <h2>Backtracking Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="NQueens">N-Queens</option>
          <option value="RatInMaze">Rat in a Maze</option>
          <option value="Sudoku">Sudoku</option>
          <option value="CombinationSum">Combination Sum</option>
          <option value="WordSearch">Word Search</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing || currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing || currentStep === steps.length - 1}>Next</button>
        <button onClick={resetBoard} disabled={isVisualizing}>Reset</button>
        <button onClick={loadDefaultExample} disabled={isVisualizing}>Load Example</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default BacktrackingVisualizer;
