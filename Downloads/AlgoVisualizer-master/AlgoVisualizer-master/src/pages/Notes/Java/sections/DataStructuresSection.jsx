import React from "react";

const DataStructuresSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-cubes"></i> 9. Data Structures</h2>
      <p>
        Data structures organize and store data efficiently.
        <ul>
          <li>Common types: Arrays, Linked Lists, Stacks, Queues, Trees, HashMaps.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "ds_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// StackExample.java
import java.util.*;

public class StackExample {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Top element: " + stack.peek());
        stack.pop();
        System.out.println("After pop: " + stack);
    }
}`,
              "ds_code"
            )
          }
        >
          {copiedCode === "ds_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// StackExample.java
import java.util.*;

public class StackExample {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);

        System.out.println("Top element: " + stack.peek());
        stack.pop();
        System.out.println("After pop: " + stack);
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>💡 Tip: Use proper data structure based on operation type—like <code>HashMap</code> for fast lookups.</p>
    </div>
  </section>
);

export default DataStructuresSection;
