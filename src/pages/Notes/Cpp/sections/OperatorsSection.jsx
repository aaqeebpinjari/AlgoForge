import React from "react";

const OperatorsSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;

    // Arithmetic operators
    cout << "Addition: " << a + b << endl;
    cout << "Subtraction: " << a - b << endl;
    cout << "Multiplication: " << a * b << endl;
    cout << "Division: " << a / b << endl;
    cout << "Modulus: " << a % b << endl;

    // Comparison operators
    cout << "Equal: " << (a == b) << endl;
    cout << "Not equal: " << (a != b) << endl;
    cout << "Greater than: " << (a > b) << endl;
    cout << "Less than: " << (a < b) << endl;

    // Logical operators
    bool x = true, y = false;
    cout << "AND: " << (x && y) << endl;
    cout << "OR: " << (x || y) << endl;
    cout << "NOT: " << (!x) << endl;

    // Assignment operators
    int c = 5;
    c += 3; // c = c + 3
    cout << "c after += 3: " << c << endl;

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-plus-square"></i> Operators in C++</h2>
        <p>C++ provides various operators for performing operations on variables and values.</p>
        <h3>Types of Operators</h3>
        <ul>
          <li><strong>Arithmetic Operators:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, <code>++</code>, <code>--</code></li>
          <li><strong>Comparison Operators:</strong> <code>==</code>, <code>!=</code>, <code>{'>'}</code>, <code>{'<'}</code>, <code>{'>='}</code>, <code>{'<='}</code></li>
          <li><strong>Logical Operators:</strong> <code>&&</code>, <code>||</code>, <code>!</code></li>
          <li><strong>Assignment Operators:</strong> <code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, etc.</li>
          <li><strong>Bitwise Operators:</strong> <code>&</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>{'<<'}</code>, <code>{'>>'}</code></li>
        </ul>
         <div className="code-container bg-black">
          <button
            className={`copy-btn ${copiedCode === "operators" ? "copied" : ""}`}
            onClick={() => copyCode(code, "operators")}
          >
            {copiedCode === "operators" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div> 
      </div>
    </section>
  );
};

export default OperatorsSection;