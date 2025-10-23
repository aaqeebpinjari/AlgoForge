import React from "react";

import CodeBlock from "../../../../components/CodeBlock";
const FunctionsSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

// Function declaration
int add(int a, int b);
void greet(string name);
int factorial(int n);

int main() {
    // Function calls
    cout << "Addition: " << add(5, 3) << endl;
    greet("Alice");
    cout << "Factorial of 5: " << factorial(5) << endl;

    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-code"></i> Functions in C++</h2>
        <p>Functions allow code reuse and modular design. They can take parameters and return values.</p>
        <h3>Function Components</h3>
        <ul>
          <li><strong>Return Type:</strong> The data type of the value returned by the function</li>
          <li><strong>Function Name:</strong> Identifier for the function</li>
          <li><strong>Parameters:</strong> Input values passed to the function</li>
          <li><strong>Function Body:</strong> The code that executes when the function is called</li>
        </ul>
      <div className="code-container bg-black">
          <button className={`copy-btn ${copiedCode === "functions" ? "copied" : ""}`} onClick={() => copyCode(code, "functions")}>
            {copiedCode === "functions" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div>
        <CodeBlock
          code={code}
          codeIdentifier="functions"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default FunctionsSection;