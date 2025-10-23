import React from "react";

const ConcurrencySection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2><i className="fas fa-random"></i> 3. Concurrency</h2>
      <p>
        Concurrency controls multiple threads to avoid conflicts and ensure thread safety.
        <ul>
          <li>Use synchronized blocks or locks to protect shared data.</li>
          <li>Java provides <code>ExecutorService</code> for thread management.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "concurrency_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// ConcurrencyExample.java
import java.util.concurrent.*;

public class ConcurrencyExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        Runnable task = () -> {
            System.out.println(Thread.currentThread().getName() + " is executing a task.");
        };

        for (int i = 0; i < 5; i++) {
            executor.submit(task);
        }

        executor.shutdown();
    }
}`,
              "concurrency_code"
            )
          }
        >
          {copiedCode === "concurrency_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`// ConcurrencyExample.java
import java.util.concurrent.*;

public class ConcurrencyExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        Runnable task = () -> {
            System.out.println(Thread.currentThread().getName() + " is executing a task.");
        };

        for (int i = 0; i < 5; i++) {
            executor.submit(task);
        }

        executor.shutdown();
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555" }}>💡 Tip: Always call <code>shutdown()</code> on ExecutorService to release system resources.</p>
    </div>
  </section>
);

export default ConcurrencySection;
