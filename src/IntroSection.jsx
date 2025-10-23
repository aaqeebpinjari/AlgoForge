import React from "react";

const IntroSection = () => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div className="card">
        <h2 className="bg-blue-600"><i className="fas fa-play-circle" ></i> 1. Introduction to C++</h2>
        <p className="bg-black" >C++ is a high-performance, general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language.</p>
        <h3>Key Features</h3>
        <ul className="bg-black">
          <li><strong>Object-Oriented:</strong> Supports classes, objects, inheritance, polymorphism, and encapsulation</li>
          <li><strong>High Performance:</strong> Direct memory manipulation and low-level operations</li>
          <li><strong>Standard Template Library (STL):</strong> Rich collection of algorithms and data structures</li>
          <li><strong>Cross-Platform:</strong> Compiles to native machine code for various platforms</li>
          <li><strong>Backward Compatible:</strong> Can compile most C programs</li>
        </ul>
        <div style={{ background: "var(--card-bg, #ffffff)", borderLeft: "4px solid #f59e0b", padding: "1rem 1.5rem", margin: "1.5rem 0", borderRadius: "0 12px 12px 0" }}>
          <strong>Note:</strong> C++ is widely used in system programming, game development, embedded systems, and high-performance applications.
        </div>
      </div>
    </section>
  );
};

export default IntroSection;