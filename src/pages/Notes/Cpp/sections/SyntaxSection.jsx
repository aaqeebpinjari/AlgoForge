import React from "react";
import CodeBlock from "../../../../components/CodeBlock";

const SyntaxSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

int main() {
    // This is a comment
    cout << "Hello, C++!" << endl;
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-code"></i> C++ Syntax</h2>
        <p>C++ syntax is similar to C but includes additional features for object-oriented programming.</p>
        <ul>
          <li>Statements end with semicolons (<code>;</code>)</li>
          <li>Code blocks are enclosed in curly braces <code>{'{'}</code></li>
          <li>Comments use <code>//</code> for single line and <code>/* */</code> for multi-line</li>
          <li>Case-sensitive language</li>
        </ul>
        <CodeBlock
          code={code}
          codeIdentifier="syntax"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default SyntaxSection;