// Utility functions for measuring algorithm performance
export const measureExecutionTime = (algorithmFunction, dataArray) => {
  // For sorting algorithms that modify array in place
  const dataArrayCopy = [...dataArray];
  
  const startTime = performance.now();
  const result = algorithmFunction(dataArrayCopy);
  const endTime = performance.now();
  
  return {
    executionTime: endTime - startTime,
    result: result,
    inputSize: dataArray.length
  };
};

export const measureMemoryUsage = () => {
  // Memory usage estimation (simplified approach)
  if (performance.memory) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    };
  }
  return null;
};

export const runPerformanceAnalysis = (algorithmFunction, dataSizes = [10, 50, 100, 500, 1000]) => {
  const results = [];
  
  for (const size of dataSizes) {
    // Generate test data of specified size
    const testData = Array.from({ length: size }, (_, i) => 
      Math.floor(Math.random() * 1000)
    );
    
    // Measure execution time
    const { executionTime } = measureExecutionTime(algorithmFunction, testData);
    
    results.push({
      inputSize: size,
      executionTime: executionTime,
      timestamp: Date.now()
    });
  }
  
  return results;
};

// Generate different types of test data for comprehensive analysis
export const generateTestData = (size, type = 'random') => {
  switch (type) {
    case 'random':
      return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    case 'sorted':
      return Array.from({ length: size }, (_, i) => i);
    case 'reverse':
      return Array.from({ length: size }, (_, i) => size - i);
    case 'nearlySorted':
      const arr = Array.from({ length: size }, (_, i) => i);
      // Shuffle a small percentage of elements
      for (let i = 0; i < size * 0.1; i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      }
      return arr;
    default:
      return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  }
};