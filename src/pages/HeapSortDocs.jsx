import React from "react";

const HeapSortDocs = () => {
  return (
    <div className="documentation">
      <h1>Heap Sort Algorithm</h1>

      <h2>Description</h2>
      <p>
        Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
        It first builds a max heap from the input data, then repeatedly extracts the maximum
        element from the heap and rebuilds the heap until sorted.
      </p>

      <h2>Time Complexity</h2>
      <ul>
        <li>Best: O(n log n)</li>
        <li>Average: O(n log n)</li>
        <li>Worst: O(n log n)</li>
      </ul>

      <h2>Space Complexity</h2>
      <p>O(1) — in-place sorting</p>

      <h2>Use Cases</h2>
      <ul>
        <li>When memory usage must be minimal (in-place sorting)</li>
        <li>Sorting arrays or lists</li>
        <li>Priority queue implementation or scheduling tasks</li>
      </ul>

      <h2>Pros</h2>
      <ul>
        <li>In-place sorting</li>
        <li>Guaranteed O(n log n) time complexity</li>
        <li>Does not require additional memory for large datasets</li>
      </ul>

      <h2>Cons</h2>
      <ul>
        <li>Not stable (relative order of equal elements may change)</li>
        <li>Slower than Quick Sort on average for typical datasets</li>
        <li>Recursive heapify can add overhead for small datasets</li>
      </ul>

      <h2>Pseudocode</h2>
      <pre>
{`function heapSort(arr):
    buildMaxHeap(arr)
    for i = n-1 down to 1:
        swap arr[0] and arr[i]
        heapify(arr, 0, i)

function buildMaxHeap(arr):
    for i = n/2 - 1 down to 0:
        heapify(arr, i, n)

function heapify(arr, i, n):
    largest = i
    left = 2*i + 1
    right = 2*i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        swap arr[i] and arr[largest]
        heapify(arr, largest, n)`}
      </pre>
    </div>
  );
};

export default HeapSortDocs;
