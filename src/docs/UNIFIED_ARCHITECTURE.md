# Unified Algorithm Implementation and Visualization Architecture

## Overview

This document describes the unified architecture implemented to standardize algorithm implementations and visualizations across sorting and searching algorithms in the AlgoVisualizer project.

## Problem Statement

The original implementation had inconsistent approaches:
- Sorting algorithms followed a centralized pattern with performance tracking
- Searching algorithms used fragmented implementations without consistent visualization
- Code duplication and maintenance challenges
- Inconsistent user experience across algorithm types

## Solution

### 1. Unified Algorithm Runner

The `runner.js` file now provides a centralized interface for executing all algorithms with consistent step generation and performance tracking.

```javascript
// Central runner: adapts ONLY the implementations from src/algorithms
import {
  bubbleSort,
  insertionSort,
  // ... other algorithms
  linearSearchWrapper,
  binarySearchWrapper,
} from "./index";

export async function runAlgorithmAsync(algorithmName, array, target) {
  const type = getAlgorithmType(algorithmName);
  if (type === "sorting") {
    const res = await runSorting(algorithmName, array);
    return { type, ...res };
  }
  const res = await runSearching(algorithmName, array, target);
  return { type, ...res };
}
```

### 2. Consistent Algorithm Implementation Pattern

All algorithms now follow the same pattern with `*WithStop` functions:

```javascript
// Example: linearSearchWithStop
export async function linearSearchWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  let comparisons = 0;

  for (let i = 0; i < a.length; i++) {
    if (stopRef.current) throw new Error("Stopped");
    comparisons++;
    updateStats({ comparisons, swaps: 0, time: 0 });
    
    const colors = createBaseColors(a.length);
    colors[i] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);
  }

  // Mark completion
  const finalColors = createBaseColors(a.length);
  for (let i = 0; i < a.length; i++) finalColors[i] = COLOR.sorted;
  setColorArray([...finalColors]);
  return -1;
}
```

### 3. Unified Visualization Component

The `AlgorithmVisualizer` component provides consistent visualization for all algorithm types:

```jsx
<AlgorithmVisualizer
  algorithmName="Bubble Sort"
  initialArray={[5, 2, 8, 1, 9]}
  visualOnly={true}
/>
```

### 4. Standardized Step Generation

All algorithms generate steps in a consistent format:
- `compare`: For comparison operations
- `swap`: For element swapping
- `probe`: For searching operations
- `move`: For movement operations
- `cycle`: For cycle operations
- `done`: For completion

### 5. Performance Tracking

Unified performance tracking across all algorithms:
- Comparisons count
- Swaps/moves count
- Execution time
- Array size

## Benefits

1. **Consistency**: All algorithms follow the same implementation and visualization patterns
2. **Maintainability**: Centralized runner and unified components reduce code duplication
3. **Extensibility**: Easy to add new algorithms following the established patterns
4. **User Experience**: Consistent interface and visualization across all algorithm types
5. **Performance Monitoring**: Standardized performance tracking for all algorithms

## Implementation Files

- `src/algorithms/runner.js`: Centralized algorithm execution
- `src/algorithms/index.js`: Unified algorithm exports
- `src/components/AlgorithmVisualizer.jsx`: Universal visualization component
- `src/components/UnifiedStats.jsx`: Standardized statistics display
- `src/styles/UnifiedVisualizer.css`: Consistent styling
- Individual algorithm files updated with `*WithStop` pattern

## Future Improvements

1. Extend the pattern to all searching algorithms
2. Add more detailed step information for educational purposes
3. Implement algorithm comparison features
4. Add export functionality for visualization states
5. Enhance performance tracking with memory usage metrics