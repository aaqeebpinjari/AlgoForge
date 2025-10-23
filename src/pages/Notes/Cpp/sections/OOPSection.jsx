import React from "react";

import CodeBlock from "../../../../components/CodeBlock";
const OOPSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
#include <string>
using namespace std;

// Base class
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}

    virtual void makeSound() {
        cout << "Some generic animal sound" << endl;
    }

    void eat() {
        cout << name << " is eating." << endl;
    }
};

// Derived class (Inheritance)
class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}

    // Polymorphism - overriding base class method
    void makeSound() override {
        cout << name << " says: Woof!" << endl;
    }

    void fetch() {
        cout << name << " is fetching the ball." << endl;
    }
};

int main() {
    // Creating objects
    Animal* animal = new Animal("Generic Animal");
    Dog* dog = new Dog("Buddy");

    // Polymorphism in action
    animal->makeSound();
    dog->makeSound();

    // Encapsulation - accessing methods
    dog->eat();
    dog->fetch();

    // Clean up
    delete animal;
    delete dog;

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-object-group"></i> Object-Oriented Programming Concepts</h2>
        <p>C++ supports OOP with classes, objects, inheritance, polymorphism, and encapsulation.</p>
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Class:</strong> Blueprint for creating objects</li>
          <li><strong>Object:</strong> Instance of a class</li>
          <li><strong>Encapsulation:</strong> Bundling data and methods that operate on the data</li>
          <li><strong>Inheritance:</strong> Creating new classes from existing classes</li>
          <li><strong>Polymorphism:</strong> Ability to take many forms</li>
        </ul>
        <div className="code-container bg-black">
          <button className={`copy-btn ${copiedCode === "oop" ? "copied" : ""}`} onClick={() => copyCode(code, "oop")}>
            {copiedCode === "oop" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div>
        <CodeBlock
          code={code}
          codeIdentifier="oop"
          copyCode={copyCode}
          copiedCode={copiedCode}
        />
      </div>
    </section>
  );
};

export default OOPSection;