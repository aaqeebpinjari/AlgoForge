import React from "react";

const DataTypesSection = ({ copyCode, copiedCode }) => {
  const variablesCode = `#include <stdio.h>

int main() {
    int age = 25;
    float height = 5.8;
    char grade = 'A';
    double pi = 3.14159;

    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Grade: %c\\n", grade);
    printf("Pi: %.5f\\n", pi);

    return 0;
}`;

  const constantsCode = `#include <stdio.h>
#define PI 3.14159
#define MAX_SIZE 100

int main() {
    const int DAYS_IN_WEEK = 7;
    const float GRAVITY = 9.81;

    printf("PI: %.5f\\n", PI);
    printf("Days in week: %d\\n", DAYS_IN_WEEK);

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-database"></i> 2. Data Types, Variables, Constants</h2>
        <h3>Data Types</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Size</th>
              <th>Range</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["int", "4 bytes", "-2,147,483,648 to 2,147,483,647"],
              ["float", "4 bytes", "1.2E-38 to 3.4E+38"],
              ["double", "8 bytes", "2.3E-308 to 1.7E+308"],
              ["char", "1 byte", "-128 to 127"],
              ["void", "0 bytes", "No value"]
            ].map(([type, size, range]) => (
              <tr key={type}>
                <td><code>{type}</code></td>
                <td>{size}</td>
                <td>{range}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Variables</h3>
        <p>Variables must be declared before use with a data type.</p>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "variables" ? "copied" : ""}`} onClick={() => copyCode(variablesCode, "variables")}>
            {copiedCode === "variables" ? "Copied!" : "Copy"}
          </button>
          <pre>{variablesCode}</pre>
        </div>

        <h3>Constants</h3>
        <p>Use <code>const</code> keyword or <code>#define</code> preprocessor directive.</p>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "constants" ? "copied" : ""}`} onClick={() => copyCode(constantsCode, "constants")}>
            {copiedCode === "constants" ? "Copied!" : "Copy"}
          </button>
          <pre>{constantsCode}</pre>
        </div>
      </div>
    </section>
  );
};

export default DataTypesSection;