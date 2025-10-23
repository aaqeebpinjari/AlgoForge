import React from "react";

const QuickSortDocs = () => {
  return (
    <div className="documentation">
      <h1>Quick Sort Algorithm</h1>

      <h2>Description</h2>
      <p>
        Quick Sort is a divide-and-conquer algorithm that selects a "pivot" element 
        from the array and partitions the other elements into two sub-arrays, 
        according to whether they are less than or greater than the pivot. 
        The sub-arrays are then sorted recursively.
      </p>

      <h2>Time Complexity</h2>
      <ul>
        <li>Best: O(n log n)</li>
        <li>Average: O(n log n)</li>
        <li>Worst: O(n²) – occurs when pivot selections are poor (already sorted array)</li>
      </ul>

      <h2>Space Complexity</h2>
      <p>O(log n) for recursive stack</p>

      <h2>Use Cases</h2>
      <ul>
        <li>Sorting in-memory datasets</li>
        <li>Efficient general-purpose sorting</li>
        <li>When average-case performance matters</li>
      </ul>

      <h2>Pros</h2>
      <ul>
        <li>In-place sorting</li>
        <li>Fast on average</li>
        <li>Widely used in libraries and applications</li>
      </ul>

      <h2>Cons</h2>
      <ul>
        <li>Worst-case time complexity O(n²)</li>
        <li>Recursive (stack space required)</li>
        <li>Unstable sort</li>
      </ul>

      <h2>Pseudocode</h2>
      <pre>
{`function quickSort(arr, low, high):
    if low < high:
        pivotIndex = partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j = low to high - 1:
        if arr[j] <= pivot:
            i += 1
            swap arr[i] and arr[j]
    swap arr[i + 1] and arr[high]
    return i + 1`}
      </pre>
    </div>
  );
};

export default QuickSortDocs;
