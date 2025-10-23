import React from "react";
import CodeBlock from "../../../../components/CodeBlock";
const DynamicMemorySection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

int main() {
    int* ptr = new int(42); // allocate memory
    cout << "Value: " << *ptr << endl;
    delete ptr; // free memory
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-memory"></i> Dynamic Memory</h2>
        <p>Dynamic memory allocation allows runtime allocation using <code>new</code> and <code>delete</code>.</p>
        <CodeBlock
          code={code}
          codeIdentifier="memory"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default DynamicMemorySection;