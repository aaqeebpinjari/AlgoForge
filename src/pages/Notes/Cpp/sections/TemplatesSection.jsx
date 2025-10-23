import React from "react";
import CodeBlock from "../../../../components/CodeBlock";
const TemplatesSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
using namespace std;

// Function template
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Class template
template <typename T>
class Container {
private:
    T value;
public:
    Container(T val) : value(val) {}

    T getValue() {
        return value;
    }

    void setValue(T val) {
        value = val;
    }
};

int main() {
    // Using function template
    cout << "Max of 5 and 10: " << maximum(5, 10) << endl;
    cout << "Max of 3.14 and 2.71: " << maximum(3.14, 2.71) << endl;

    // Using class template
    Container<int> intContainer(42);
    Container<string> stringContainer("Hello");

    cout << "Integer container: " << intContainer.getValue() << endl;
    cout << "String container: " << stringContainer.getValue() << endl;

    return 0;
}`;

  return (
    <section>
      <div className="card">
         <h2><i className="fas fa-puzzle-piece"></i> Templates in C++</h2>
        <p>Templates allow you to write generic code that works with any data type.</p>
        <h3>Function Templates</h3>
        <p>Function templates create functions that can work with different data types.</p>
        <CodeBlock
          code={code}
          codeIdentifier="templates"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default TemplatesSection;