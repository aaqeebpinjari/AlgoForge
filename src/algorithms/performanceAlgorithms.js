// Performance-ready algorithm implementations for complexity analysis
// These are simplified versions without visualization steps for accurate performance measurement

export const bubbleSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  
  return array;
};

export const insertionSortPerformance = (arr) => {
  const array = [...arr];
  
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = current;
  }
  
  return array;
};

export const selectionSortPerformance = (arr) => {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  
  return array;
};

export const quickSortPerformance = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (let element of arr) {
    if (element < pivot) {
      left.push(element);
    } else if (element > pivot) {
      right.push(element);
    } else {
      equal.push(element);
    }
  }
  
  return [
    ...quickSortPerformance(left),
    ...equal,
    ...quickSortPerformance(right)
  ];
};

export const mergeSortPerformance = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  return merge(
    mergeSortPerformance(left),
    mergeSortPerformance(right)
  );
};

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};

export const linearSearchPerformance = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
};

export const binarySearchPerformance = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
};

// Algorithm map for easy access
export const performanceAlgorithms = {
  "Bubble Sort": bubbleSortPerformance,
  "Insertion Sort": insertionSortPerformance,
  "Selection Sort": selectionSortPerformance,
  "Quick Sort": quickSortPerformance,
  "Merge Sort": mergeSortPerformance,
  "Linear Search": linearSearchPerformance,
  "Binary Search": binarySearchPerformance
};