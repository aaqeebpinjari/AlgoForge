import React from "react";
import CodeBlock from "../../../../components/CodeBlock";
const VariablesSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

int main() {
    // Variable declaration
    int number;
    double decimal;
    char letter;
    string text;

    // Variable initialization
    number = 42;
    decimal = 3.14;
    letter = 'A';
    text = "Hello";

    // Declaration with initialization
    int x = 10;
    double y = 2.5;
    char z = 'B';
    string message = "World";

    cout << "Number: " << number << endl;
    cout << "Decimal: " << decimal << endl;
    cout << "Letter: " << letter << endl;
    cout << "Text: " << text << endl;
    cout << "X: " << x << endl;
    cout << "Y: " << y << endl;
    cout << "Z: " << z << endl;
    cout << "Message: " << message << endl;

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-tag"></i> Variables in C++</h2>
        <p>Variables are containers for storing data values. They must be declared with a data type.</p>
        <h3>Variable Declaration and Initialization</h3>
        <CodeBlock
          code={code}
          codeIdentifier="variables"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default VariablesSection;