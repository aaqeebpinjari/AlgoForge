import React from "react";

const DocClosestPair = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">
        Closest Pair of Points Algorithm Documentation
      </h1>

      <p className="mb-4 text-gray-200">
        The <strong>Closest Pair of Points</strong> problem is a key challenge in
        computational geometry. It involves finding two points that are closest
        to each other among a given set of points in a 2D plane.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-yellow-300">
        Algorithm Overview
      </h2>
      <p className="mb-4 text-gray-300">
        The brute-force approach checks every pair of points and calculates
        their distance, which takes <code>O(n²)</code> time.  
        A more efficient method uses <strong>Divide and Conquer</strong> to
        achieve <code>O(n log n)</code> complexity.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-yellow-300">
        Steps (Divide and Conquer)
      </h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-300">
        <li>Sort points by x-coordinate.</li>
        <li>Divide the set into two halves at the median.</li>
        <li>Recursively find the smallest distances in each half.</li>
        <li>Compute distances across the dividing strip.</li>
        <li>Return the smallest of all computed distances.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-yellow-300">
        Pseudocode
      </h2>
      <pre className="bg-gray-800 text-green-300 p-4 rounded-lg overflow-x-auto text-sm">
        {`
function closestPair(points):
    sort points by x-coordinate
    return divide(points)

function divide(points):
    if number of points <= 3:
        return bruteForce(points)
    mid = len(points) / 2
    left = points[:mid]
    right = points[mid:]
    d1 = divide(left)
    d2 = divide(right)
    d = min(d1, d2)
    strip = points within d of middle line
    return min(d, stripClosest(strip, d))
        `}
      </pre>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-yellow-300">
        Complexity Analysis
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Brute Force: <code>O(n²)</code></li>
        <li>Optimized: <code>O(n log n)</code></li>
        <li>Space Complexity: <code>O(n)</code></li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-yellow-300">
        Applications
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Geographical mapping and navigation</li>
        <li>Computer graphics and visualization</li>
        <li>Pattern recognition and clustering</li>
        <li>Collision detection systems</li>
      </ul>

      <p className="mt-8 text-gray-400 italic">
        “The Closest Pair of Points algorithm beautifully demonstrates how divide
        and conquer can optimize geometric computations.”
      </p>
    </div>
  );
};

export default DocClosestPair;
