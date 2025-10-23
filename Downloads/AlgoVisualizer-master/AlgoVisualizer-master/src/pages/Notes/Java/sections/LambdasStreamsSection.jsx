import React from "react";

const LambdasStreamsSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-stream"></i> 4. Lambdas & Streams</h2>
      <p>
        Lambda expressions and Streams simplify functional-style operations in Java.
        <ul>
          <li>Lambdas provide concise function definitions.</li>
          <li>Streams enable declarative data processing.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "lambdas_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// LambdasStreamsExample.java
import java.util.*;
import java.util.stream.*;

public class LambdasStreamsExample {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .forEach(System.out::println);
    }
}`,
              "lambdas_code"
            )
          }
        >
          {copiedCode === "lambdas_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// LambdasStreamsExample.java
import java.util.*;
import java.util.stream.*;

public class LambdasStreamsExample {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .forEach(System.out::println);
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>💡 Tip: Lambdas reduce boilerplate code, making functional programming cleaner.</p>
    </div>
  </section>
);

export default LambdasStreamsSection;
