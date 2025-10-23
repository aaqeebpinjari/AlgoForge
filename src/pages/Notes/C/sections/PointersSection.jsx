import React from "react";

const PointersSection = ({ copyCode, copiedCode }) => {
  const code = `#include <stdio.h>

int main() {
    int num = 10;
    int *ptr = &num;  // Pointer to num

    printf("Value: %d\\n", num);
    printf("Address: %p\\n", &num);
    printf("Pointer value: %p\\n", ptr);
    printf("Dereferenced: %d\\n", *ptr);

    *ptr = 20;  // Change value through pointer
    printf("New value: %d\\n", num);

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-map-marker"></i> 7. Pointers</h2>
        <p>Pointers store memory addresses of variables.</p>

        <h3>Basic Pointer Usage</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "pointer" ? "copied" : ""}`} onClick={() => copyCode(code, "pointer")}>
            {copiedCode === "pointer" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div>
      </div>
    </section>
  );
};

export default PointersSection;