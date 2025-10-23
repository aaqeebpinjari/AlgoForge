import React from "react";

import CodeBlock from "../../../../components/CodeBlock";
const ControlFlowSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

int main() {
    int score = 85;

    // if-else statement
    if (score >= 90) {
        cout << "Grade: A" << endl;
    } else if (score >= 80) {
        cout << "Grade: B" << endl;
    } else if (score >= 70) {
        cout << "Grade: C" << endl;
    } else {
        cout << "Grade: F" << endl;
    }

    // for loop
    cout << "For loop: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    // while loop
    cout << "While loop: ";
    int j = 1;
    while (j <= 5) {
        cout << j << " ";
        j++;
    }
    cout << endl;

    // switch statement
    int day = 3;
    switch (day) {
        case 1:
            cout << "Monday" << endl;
            break;
        case 2:
            cout << "Tuesday" << endl;
            break;
        case 3:
            cout << "Wednesday" << endl;
            break;
        default:
            cout << "Other day" << endl;
    }

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-sitemap"></i> Control Flow Statements</h2>
        <p>Control flow statements determine the order in which code is executed.</p>
        <h3>Decision Making</h3>
        <ul>
          <li><strong>if:</strong> Executes code if condition is true</li>
          <li><strong>if-else:</strong> Executes one block if true, another if false</li>
          <li><strong>else if:</strong> Multiple conditions</li>
          <li><strong>switch:</strong> Multi-way branch statement</li>
        </ul>
        <h3>Loops</h3>
        <ul>
          <li><strong>for loop:</strong> Executes code a specific number of times</li>
          <li><strong>while loop:</strong> Repeats while condition is true</li>
          <li><strong>do-while loop:</strong> Executes at least once, then repeats while condition is true</li>
        </ul>
       <div className="code-container bg-black">
          <button className={`copy-btn ${copiedCode === "control" ? "copied" : ""}`} onClick={() => copyCode(code, "control")}>
            {copiedCode === "control" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div>
        <CodeBlock
          code={code}
          codeIdentifier="control"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default ControlFlowSection;