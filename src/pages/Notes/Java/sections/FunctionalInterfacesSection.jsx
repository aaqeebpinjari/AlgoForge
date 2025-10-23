import React from "react";

const FunctionalInterfacesSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-bolt"></i> 5. Functional Interfaces</h2>
      <p>
        Functional interfaces have exactly one abstract method and can be used with lambda expressions.
        <ul>
          <li>Common ones include <code>Runnable</code>, <code>Callable</code>, <code>Predicate</code>, etc.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "functional_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// FunctionalInterfaceExample.java
@FunctionalInterface
interface Greeting {
    void sayHello(String name);
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        Greeting greet = (name) -> System.out.println("Hello, " + name + "!");
        greet.sayHello("Java");
    }
}`,
              "functional_code"
            )
          }
        >
          {copiedCode === "functional_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// FunctionalInterfaceExample.java
@FunctionalInterface
interface Greeting {
    void sayHello(String name);
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        Greeting greet = (name) -> System.out.println("Hello, " + name + "!");
        greet.sayHello("Java");
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>💡 Tip: Marking an interface with <code>@FunctionalInterface</code> ensures only one abstract method is defined.</p>
    </div>
  </section>
);

export default FunctionalInterfacesSection;
