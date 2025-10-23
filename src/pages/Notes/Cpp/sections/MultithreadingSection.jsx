import React from "react";
import CodeBlock from "../../../../components/CodeBlock";
const MultithreadingSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
#include <thread>
using namespace std;

void task() {
    cout << "Task running in thread." << endl;
}

int main() {
    thread t(task);
    t.join(); // wait for thread to finish
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-project-diagram"></i> Multithreading</h2>
        <p>Multithreading allows concurrent execution of code using the <code>thread</code> library.</p>
        <CodeBlock
          code={code}
          codeIdentifier="multithreading"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default MultithreadingSection;