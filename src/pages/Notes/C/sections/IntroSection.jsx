import React from "react";

const IntroSection = ({ copyCode, copiedCode }) => {
  const code = `#include <stdio.h>

int main() {
    printf("Hello, C!");
    return 0;
}`;
  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-play-circle"></i> 1. Introduction & Program Structure</h2>
        <p>C is a general-purpose, procedural programming language developed by Dennis Ritchie in 1972. It's widely used for system programming, embedded systems, and as a foundation for many other languages.</p>
        <h3>Key Features</h3>
        <ul>
          <li><strong>Procedural Language:</strong> Follows step-by-step execution</li>
          <li><strong>Low-level Access:</strong> Direct memory manipulation</li>
          <li><strong>Efficient:</strong> Fast execution and low memory usage</li>
          <li><strong>Portable:</strong> Code can run on different platforms with minimal changes</li>
        </ul>
        <h3>Basic Program Structure</h3>
        <p>Every C program must have a <code>main()</code> function where execution begins.</p>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "intro" ? "copied" : ""}`} onClick={() => copyCode(code, "intro")}>
            {copiedCode === "intro" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div>
        <div className="note-box"><strong>Note:</strong> <code>#include</code> is a preprocessor directive that includes header files. <code>stdio.h</code> contains input/output functions like <code>printf()</code>.</div>
      </div>
    </section>
  );
};

export default IntroSection;