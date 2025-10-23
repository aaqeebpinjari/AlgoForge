import React from "react";

const OperatorsSection = ({ copyCode, copiedCode }) => {
  const code = `#include <stdio.h>

int main() {
    int a = 10, b = 3;

    // Arithmetic
    printf("Addition: %d\\n", a + b);
    printf("Subtraction: %d\\n", a - b);
    printf("Multiplication: %d\\n", a * b);
    printf("Division: %d\\n", a / b);
    printf("Modulus: %d\\n", a % b);

    // Relational
    printf("a == b: %d\\n", a == b);
    printf("a > b: %d\\n", a > b);

    // Logical
    printf("a > 5 && b < 5: %d\\n", a > 5 && b < 5);

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-plus-square"></i> 3. Operators</h2>
        <h3>Arithmetic Operators</h3>
        <ul>
          <li><code>+</code> Addition</li>
          <li><code>-</code> Subtraction</li>
          <li><code>*</code> Multiplication</li>
          <li><code>/</code> Division</li>
          <li><code>%</code> Modulus</li>
        </ul>

        <h3>Relational Operators</h3>
        <ul>
          <li><code>==</code> Equal to</li>
          <li><code>!=</code> Not equal to</li>
          <li><code>{'>'}</code> Greater than</li>
          <li><code>{'<'}</code> Less than</li>
          <li><code>{'>='}</code> Greater than or equal to</li>
          <li><code>{'<='}</code> Less than or equal to</li>
        </ul>

        <h3>Logical Operators</h3>
        <ul>
          <li><code>&&</code> Logical AND</li>
          <li><code>||</code> Logical OR</li>
          <li><code>!</code> Logical NOT</li>
        </ul>

        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "operators" ? "copied" : ""}`} onClick={() => copyCode(code, "operators")}>
            {copiedCode === "operators" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div>
      </div>
    </section>
  );
};

export default OperatorsSection;