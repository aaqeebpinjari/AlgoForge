import React from "react";
import CodeBlock from "../../../../components/CodeBlock";
const ExampleCodeSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-terminal"></i> Example Code</h2>
        <p>A simple example to get started with C++:</p>
        <CodeBlock
          code={code}
          codeIdentifier="examples"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default ExampleCodeSection;