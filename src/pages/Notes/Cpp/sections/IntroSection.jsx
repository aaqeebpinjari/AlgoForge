import React from "react";

const IntroSection = () => {
  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-play-circle" ></i> Introduction to C++</h2>
        <p>C++ is a high-performance, general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language.</p>
        <h3>Key Features</h3>
        <ul>
          <li><strong>Object-Oriented:</strong> Supports classes, objects, inheritance, polymorphism, and encapsulation</li>
          <li><strong>High Performance:</strong> Direct memory manipulation and low-level operations</li>
          <li><strong>Standard Template Library (STL):</strong> Rich collection of algorithms and data structures</li>
          <li><strong>Cross-Platform:</strong> Compiles to native machine code for various platforms</li>
          <li><strong>Backward Compatible:</strong> Can compile most C programs</li>
        </ul>
        <div className="note-box">
          <strong>Note:</strong> C++ is widely used in system programming, game development, embedded systems, and high-performance applications.
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
