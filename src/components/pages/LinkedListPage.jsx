// src/pages/LinkedListPage.jsx
import React from 'react';
import LinkedListVisualizer from "../LinkedList/LinkedListVisualizer";
;

const LinkedListPage = () => {
  return (
    <div className="algorithm-page">
      <div className="page-header">
        <h1>Linked List Visualization</h1>
        <p className="page-description">
          Explore linked list operations including insertion, deletion, search, and reversal.
          Watch how nodes connect and pointers change in real-time.
        </p>
      </div>
      
      <LinkedListVisualizer />
      
      <div className="algorithm-info">
        <div className="info-section">
          <h3>About Linked Lists</h3>
          <p>
            A linked list is a linear data structure where elements are stored in nodes. 
            Each node contains data and a reference (or pointer) to the next node.
          </p>
        </div>
        
        <div className="complexity-table">
          <h3>Time Complexity</h3>
          <table>
            <thead>
              <tr>
                <th>Operation</th>
                <th>Time Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Insert at Beg</td><td>O(1)</td></tr>
              <tr><td>Insert at End</td><td>O(n)</td></tr>
              <tr><td>Insert at Pos</td><td>O(n)</td></tr>
              <tr><td>Search</td><td>O(n)</td></tr>
              <tr><td>Delete</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LinkedListPage;