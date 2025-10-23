import React from "react";
import CodeBlock from "../../../../components/CodeBlock";

const DataTypesSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 25;
    float height = 5.9f;
    double pi = 3.14159;
    char grade = 'A';
    bool isStudent = true;
    string name = "John";

    cout << "Age: " << age << endl;
    cout << "Height: " << height << endl;
    cout << "Pi: " << pi << endl;
    cout << "Grade: " << grade << endl;
    cout << "Is Student: " << isStudent << endl;
    cout << "Name: " << name << endl;

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-database" ></i> Data Types in C++</h2>
        <p>C++ provides various built-in data types for different kinds of data.</p>
        <h3>Common Data Types</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Size</th>
              <th>Range</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["int", "4 bytes", "-2.1B to 2.1B", "Integer numbers"],
              ["float", "4 bytes", "±3.4e-38 to ±3.4e38", "Single precision floating point"],
              ["double", "8 bytes", "±1.7e-308 to ±1.7e308", "Double precision floating point"],
              ["char", "1 byte", "-128 to 127", "Single character"],
              ["bool", "1 byte", "true/false", "Boolean values"],
              ["string", "Variable", "N/A", "Sequence of characters"]
            ].map(([type, size, range, desc]) => (
              <tr key={type}>
                <td><code>{type}</code></td>
                <td>{size}</td>
                <td>{range}</td>
                <td>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <CodeBlock
          code={code}
          codeIdentifier="datatypes"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default DataTypesSection;