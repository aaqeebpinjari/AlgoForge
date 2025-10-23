import React from "react";

const OOPSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-layer-group"></i> 7. Object-Oriented Programming (OOP) in Python
      </h2>
      <p>
        Python supports Object-Oriented Programming (OOP), which allows you to model real-world entities
        as objects with attributes (data) and methods (behavior). OOP promotes modularity and reusability.
      </p>

      <h3>Defining a Class</h3>
      <pre>{`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")

p1 = Person("Alice", 25)
p1.greet()  # Output: Hello, my name is Alice and I am 25 years old.`}</pre>

      <h3>Inheritance</h3>
      <pre>{`class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id

s1 = Student("Bob", 20, "S123")
s1.greet()  # Output: Hello, my name is Bob and I am 20 years old.`}</pre>

      <h3>Encapsulation</h3>
      <pre>{`class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # private attribute

    def deposit(self, amount):
        self.__balance += amount

    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())  # Output: 1500`}</pre>

      <h3>Polymorphism</h3>
      <pre>{`class Dog:
    def speak(self):
        print("Woof!")

class Cat:
    def speak(self):
        print("Meow!")

for animal in [Dog(), Cat()]:
    animal.speak()
# Output:
# Woof!
# Meow!`}</pre>

      <div
        style={{
          background: "#eff6ff",
          borderLeft: "4px solid #3b82f6",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Python’s OOP features include classes, objects, inheritance, encapsulation,
        and polymorphism, enabling structured and maintainable code.
      </div>
    </div>
  </section>
);

export default OOPSection;
