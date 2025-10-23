import React from "react";

const MultithreadingSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-tasks"></i> 8. Multithreading & Multiprocessing in Python
      </h2>
      <p>
        Python allows concurrent execution to optimize I/O-bound and CPU-bound tasks.
        <strong>Threading</strong> is suitable for I/O-bound tasks, while <strong>Multiprocessing</strong> is better for CPU-bound tasks due to the GIL (Global Interpreter Lock).
      </p>

      <h3>Threading Example (I/O-bound)</h3>
      <pre>{`import threading
import time

def print_numbers():
    for i in range(5):
        print(f"Number: {i}")
        time.sleep(1)

# Create threads
thread1 = threading.Thread(target=print_numbers)
thread2 = threading.Thread(target=print_numbers)

# Start threads
thread1.start()
thread2.start()

# Wait for threads to finish
thread1.join()
thread2.join()

print("Done!")`}</pre>

      <h3>Multiprocessing Example (CPU-bound)</h3>
      <pre>{`import multiprocessing

def square(n):
    print(f"Square of {n} is {n*n}")

if __name__ == "__main__":
    processes = []
    for i in range(5):
        p = multiprocessing.Process(target=square, args=(i,))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()

    print("All processes done!")`}</pre>

      <h3>Tips for Handling GIL & Shared Data</h3>
      <ul>
        <li>Use <strong>threading</strong> for I/O tasks; threads share memory.</li>
        <li>Use <strong>multiprocessing</strong> for CPU tasks; processes have separate memory.</li>
        <li>Use <strong>Queue</strong> or <strong>Manager</strong> to share data safely between processes.</li>
        <li>Avoid long-running CPU tasks in threads due to the GIL.</li>
      </ul>

      <div
        style={{
          background: "#eff6ff",
          borderLeft: "4px solid #3b82f6",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 12px 12px 0",
        }}
      >
        <strong>Note:</strong> Threading improves I/O-bound concurrency, multiprocessing enables CPU-bound parallelism,
        and careful handling of shared data ensures safe and efficient execution.
      </div>
    </div>
  </section>
);

export default MultithreadingSection;
