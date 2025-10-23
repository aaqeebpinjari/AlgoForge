import React from "react";

const GenericsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-code"></i> 1. Generics</h2>
      <p>
        Generics enable type-safe operations and reduce runtime errors.
        <ul>
          <li>Allow defining classes, interfaces, and methods with type parameters.</li>
          <li>Provide compile-time type checking.</li>
          <li>Increase reusability and maintainability.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "generics_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// GenericsExample.java
class Box<T> {
    private T item;

    public void set(T item) { this.item = item; }
    public T get() { return item; }

    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();
        intBox.set(10);
        System.out.println("Integer Value: " + intBox.get());

        Box<String> strBox = new Box<>();
        strBox.set("Hello Generics");
        System.out.println("String Value: " + strBox.get());
    }
}`,
              "generics_code"
            )
          }
        >
          {copiedCode === "generics_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// GenericsExample.java
class Box<T> {
    private T item;

    public void set(T item) { this.item = item; }
    public T get() { return item; }

    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();
        intBox.set(10);
        System.out.println("Integer Value: " + intBox.get());

        Box<String> strBox = new Box<>();
        strBox.set("Hello Generics");
        System.out.println("String Value: " + strBox.get());
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>💡 Tip: Generics prevent ClassCastException by catching type mismatches at compile time.</p>
    </div>
  </section>
);

export default GenericsSection;
