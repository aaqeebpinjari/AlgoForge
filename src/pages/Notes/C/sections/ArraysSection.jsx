import React from "react";

const ArraysSection = ({ copyCode, copiedCode }) => {
  const arrayCode = `#include <stdio.h>

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};

    for (int i = 0; i < 5; i++) {
        printf("numbers[%d] = %d\\n", i, numbers[i]);
    }

    return 0;
}`;

  const stringCode = `#include <stdio.h>
#include <string.h>

int main() {
    char name[20] = "Hello, C!";
    char copy[20];

    printf("Original: %s\\n", name);
    printf("Length: %lu\\n", strlen(name));

    strcpy(copy, name);
    printf("Copied: %s\\n", copy);

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-list"></i> 6. Arrays & Strings</h2>

        <h3>Arrays</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "array" ? "copied" : ""}`} onClick={() => copyCode(arrayCode, "array")}>
            {copiedCode === "array" ? "Copied!" : "Copy"}
          </button>
          <pre>{arrayCode}</pre>
        </div>

        <h3>Strings</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "string" ? "copied" : ""}`} onClick={() => copyCode(stringCode, "string")}>
            {copiedCode === "string" ? "Copied!" : "Copy"}
          </button>
          <pre>{stringCode}</pre>
        </div>
      </div>
    </section>
  );
};

export default ArraysSection;