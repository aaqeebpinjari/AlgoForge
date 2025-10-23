import React, { useEffect } from "react";

const ConvexHullDoc = () => {
  useEffect(() => {
    document.title = "Convex Hull Algorithm | Documentation";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          🧭 Convex Hull Algorithm Documentation
        </h1>
        <p className="text-gray-700 mb-6">
          The <strong>Convex Hull</strong> of a set of points is the smallest convex polygon 
          that encloses all points in a 2D plane. Think of it as the shape formed by stretching 
          a rubber band around the outermost points.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">🎯 Objective</h2>
        <p className="mb-4">
          To find the convex polygon that encloses all given points such that:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Every point lies inside or on the boundary of the polygon.</li>
          <li>The polygon is convex (no internal angle exceeds 180°).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">⚙️ Algorithm Used – Graham’s Scan</h2>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Find the pivot (lowest y-coordinate, leftmost if tied).</li>
          <li>Sort all points by their polar angle relative to the pivot.</li>
          <li>
            Traverse sorted points using a stack:
            <ul className="list-disc pl-6">
              <li>If points make a right turn (clockwise), pop the last point.</li>
              <li>Repeat until a left turn is formed, then push the point.</li>
            </ul>
          </li>
          <li>Return the stack as the hull points.</li>
        </ol>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">🧠 Pseudocode</h2>
        <pre className="bg-gray-900 text-green-200 p-4 rounded-lg overflow-x-auto mb-6">
{`function convexHull(points):
    if len(points) < 3:
        return points

    pivot = point with minimum y (and x if tie)
    sort points based on atan2(y - pivot.y, x - pivot.x)

    stack = []
    for p in points:
        while len(stack) >= 2 and orientation(stack[-2], stack[-1], p) != counterclockwise:
            stack.pop()
        stack.append(p)

    return stack`}
        </pre>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">💻 Python Implementation</h2>
        <pre className="bg-gray-900 text-green-200 p-4 rounded-lg overflow-x-auto mb-6">
{`import math

def convexHull(points):
    pivot = min(points, key=lambda p: (p[1], p[0]))

    def polar_angle(p):
        return math.atan2(p[1] - pivot[1], p[0] - pivot[0])

    points.sort(key=lambda p: (polar_angle(p), (p[0]-pivot[0])**2 + (p[1]-pivot[1])**2))

    hull = []
    for p in points:
        while len(hull) >= 2:
            o = (hull[-1][0] - hull[-2][0]) * (p[1] - hull[-2][1]) - (hull[-1][1] - hull[-2][1]) * (p[0] - hull[-2][0])
            if o <= 0:
                hull.pop()
            else:
                break
        hull.append(p)
    return hull

points = [(0,3),(2,2),(1,1),(2,1),(3,0),(0,0),(3,3)]
print(convexHull(points))`}
        </pre>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">📊 Time & Space Complexity</h2>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Time Complexity:</strong> O(N log N)</li>
          <li><strong>Space Complexity:</strong> O(N)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">🧾 Applications</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Computer Graphics – Object boundary detection</li>
          <li>Geographical Mapping – Enclosing boundary detection</li>
          <li>Robotics – Obstacle boundary identification</li>
          <li>Pattern Recognition – Shape analysis</li>
          <li>Game Development – Collision detection</li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">📚 References</h2>
        <ul className="list-disc pl-6 mb-2">
          <li>Introduction to Algorithms (CLRS)</li>
          <li>Computational Geometry Algorithms Library (CGAL)</li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Convex_hull"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              Wikipedia – Convex Hull
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConvexHullDoc;
