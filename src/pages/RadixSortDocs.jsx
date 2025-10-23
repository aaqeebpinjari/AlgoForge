import React from "react";

const RadixSortDocs = () => {
  return (
    <div className="documentation">
      <h1>Radix Sort Algorithm</h1>

      <h2>Description</h2>
      <p>
        Radix Sort is a non-comparative integer sorting algorithm that sorts data with
        integer keys by grouping keys by individual digits which share the same significant position
        and value. It processes digits from least significant to most significant (LSD) 
        or most significant to least significant (MSD).
      </p>

      <h2>Time Complexity</h2>
      <ul>
        <li>Best: O(nk)</li>
        <li>Average: O(nk)</li>
        <li>Worst: O(nk)</li>
      </ul>

      <h2>Space Complexity</h2>
      <p>O(n + k) where k is the range of digits</p>

      <h2>Use Cases</h2>
      <ul>
        <li>Sorting integers or fixed-length strings</li>
        <li>When n is large and keys have a bounded number of digits</li>
        <li>Applications in computational geometry or counting sort dependent tasks</li>
      </ul>

      <h2>Pros</h2>
      <ul>
        <li>Stable sorting</li>
        <li>Linear time complexity for small k</li>
        <li>Works well with large datasets of integers</li>
      </ul>

      <h2>Cons</h2>
      <ul>
        <li>Requires additional memory for buckets</li>
        <li>Not suitable for floating-point numbers without modifications</li>
        <li>Performance depends on digit length (k)</li>
      </ul>

      <h2>Pseudocode</h2>
      <pre>
{`function radixSort(arr):
    maxDigit = maximum number of digits in arr
    for d = 1 to maxDigit:
        use countingSort(arr, d) to sort elements by digit d

function countingSort(arr, d):
    create count array for digits 0-9
    count occurrences of each digit at position d
    calculate cumulative count
    place elements into output array based on count
    copy output array back to arr`}
      </pre>
    </div>
  );
};

export default RadixSortDocs;
