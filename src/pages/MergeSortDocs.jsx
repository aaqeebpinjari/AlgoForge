import React from "react";

const MergeSortDocs = () => {
  return (
    <div className="documentation">
      <h1>Merge Sort Algorithm</h1>
      <h2>Description</h2>
      <p>
        Merge Sort is a divide and conquer algorithm that divides the input array 
        into two halves, calls itself for the two halves, and then merges the two sorted halves.
      </p>

      <h2>Time Complexity</h2>
      <ul>
        <li>Best: O(n log n)</li>
        <li>Average: O(n log n)</li>
        <li>Worst: O(n log n)</li>
      </ul>

      <h2>Space Complexity</h2>
      <p>O(n)</p>

      <h2>Use Cases</h2>
      <ul>
        <li>Sorting large datasets</li>
        <li>External sorting (data too large to fit in memory)</li>
      </ul>

      <h2>Pros</h2>
      <ul>
        <li>Stable sort</li>
        <li>Predictable time complexity</li>
      </ul>

      <h2>Cons</h2>
      <ul>
        <li>Requires extra memory for merging</li>
        <li>Not in-place</li>
      </ul>

      <h2>Pseudocode</h2>
      <pre>
{`function mergeSort(arr):
    if length of arr > 1:
        mid = length(arr) / 2
        L = arr[0..mid-1]
        R = arr[mid..end]
        mergeSort(L)
        mergeSort(R)
        merge(L, R, arr)`}
      </pre>
    </div>
  );
};

export default MergeSortDocs;
