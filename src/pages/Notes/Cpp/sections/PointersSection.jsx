import React from "react";
import CodeBlock from "../../../../components/CodeBlock";

const PointersSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* ptr = &x; // pointer storing address of x
    cout << "Value of x: " << x << endl;
    cout << "Address of x: " << ptr << endl;
    cout << "Value via pointer: " << *ptr << endl;
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-crosshairs"></i> Pointers</h2>
        <p>Pointers are variables that store memory addresses of other variables.</p>
        <CodeBlock
          code={code}
          codeIdentifier="pointers"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default PointersSection;