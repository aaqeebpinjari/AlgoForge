import React from "react";

const FunctionsSection = ({ copyCode, copiedCode }) => {
  const functionCode = `#include <stdio.h>

// Function declaration
int add(int a, int b);

int main() {
    int result = add(5, 3);
    printf("Sum: %d\\n", result);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`;

  const recursionCode = `#include <stdio.h>

int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d is %d\\n", num, factorial(num));
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-code"></i> 5. Functions & Recursion</h2>

        <h3>Function Declaration and Definition</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "function" ? "copied" : ""}`} onClick={() => copyCode(functionCode, "function")}>
            {copiedCode === "function" ? "Copied!" : "Copy"}
          </button>
          <pre>{functionCode}</pre>
        </div>

        <h3>Recursion</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "recursion" ? "copied" : ""}`} onClick={() => copyCode(recursionCode, "recursion")}>
            {copiedCode === "recursion" ? "Copied!" : "Copy"}
          </button>
          <pre>{recursionCode}</pre>
        </div>
      </div>
    </section>
  );
};

export default FunctionsSection;