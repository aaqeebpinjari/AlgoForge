import React from "react";
import CodeBlock from "../../../../components/CodeBlock";
const ExceptionHandlingSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

int main() {
    try {
        int x = 0;
        if (x == 0) throw "Division by zero!";
        cout << 10 / x << endl;
    } catch (const char* e) {
        cout << "Error: " << e << endl;
    }
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-exclamation-triangle"></i> Exception Handling</h2>
        <p>Exceptions handle runtime errors using <code>try</code>, <code>catch</code>, and <code>throw</code>.</p>
        <CodeBlock
          code={code}
          codeIdentifier="exceptions"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default ExceptionHandlingSection;