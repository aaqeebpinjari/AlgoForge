import React from "react";
import CodeBlock from "../../../../components/CodeBlock";
const STLSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
#include <set>
using namespace std;

int main() {
    // Vector example
    vector<int> numbers = {3, 1, 4, 1, 5, 9, 2, 6};
    cout << "Original vector: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;

    // Sort the vector
    sort(numbers.begin(), numbers.end());
    cout << "Sorted vector: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;

    // Find maximum and minimum
    auto max_it = max_element(numbers.begin(), numbers.end());
    auto min_it = min_element(numbers.begin(), numbers.end());
    cout << "Max: " << *max_it << ", Min: " << *min_it << endl;

    // Set example (unique elements)
    set<int> uniqueNumbers = {1, 2, 2, 3, 3, 3, 4};
    cout << "Set elements: ";
    for (int num : uniqueNumbers) {
        cout << num << " ";
    }
    cout << endl;

    // Map example
    map<string, int> ages;
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages["Charlie"] = 35;

    cout << "Ages:" << endl;
    for (auto& pair : ages) {
        cout << pair.first << ": " << pair.second << endl;
    }

    return 0;
}`;

  return (
       <section>
      <div className="card">
        <h2><i className="fas fa-boxes"></i> Standard Template Library (STL)</h2>
        <p>The STL provides a collection of template classes and functions for common data structures and algorithms.</p>
        <h3>Containers</h3>
        <ul>
          <li><strong>vector:</strong> Dynamic array</li>
          <li><strong>list:</strong> Doubly-linked list</li>
          <li><strong>deque:</strong> Double-ended queue</li>
          <li><strong>set:</strong> Unique elements, sorted</li>
          <li><strong>map:</strong> Key-value pairs, sorted by key</li>
        </ul>
        <h3>Algorithms</h3>
        <ul>
          <li><strong>sort:</strong> Sorts elements in a range</li>
          <li><strong>find:</strong> Finds an element in a range</li>
          <li><strong>reverse:</strong> Reverses the order of elements</li>
          <li><strong>max_element:</strong> Finds the maximum element</li>
          <li><strong>min_element:</strong> Finds the minimum element</li>
        </ul>
        <CodeBlock
          code={code}
          codeIdentifier="stl"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default STLSection;