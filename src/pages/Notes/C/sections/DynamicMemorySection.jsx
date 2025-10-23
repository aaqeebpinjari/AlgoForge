import React from "react";

const DynamicMemorySection = ({ copyCode, copiedCode }) => {
  const mallocCode = `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // Allocate memory
    arr = (int*)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    // Use the allocated memory
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
        printf("%d ", arr[i]);
    }
    printf("\\n");

    // Free the allocated memory
    free(arr);

    return 0;
}`;

  const callocCode = `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // Allocate and initialize to zero
    arr = (int*)calloc(n, sizeof(int));

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);  // Will print 0 0 0 0 0
    }
    printf("\\n");

    // Reallocate to larger size
    arr = (int*)realloc(arr, 10 * sizeof(int));

    for (int i = 5; i < 10; i++) {
        arr[i] = i + 1;
    }

    for (int i = 0; i < 10; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-memory"></i> 10. Dynamic Memory Allocation</h2>

        <h3>malloc() and free()</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "malloc" ? "copied" : ""}`} onClick={() => copyCode(mallocCode, "malloc")}>
            {copiedCode === "malloc" ? "Copied!" : "Copy"}
          </button>
          <pre>{mallocCode}</pre>
        </div>

        <h3>calloc() and realloc()</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "calloc" ? "copied" : ""}`} onClick={() => copyCode(callocCode, "calloc")}>
            {copiedCode === "calloc" ? "Copied!" : "Copy"}
          </button>
          <pre>{callocCode}</pre>
        </div>
      </div>
    </section>
  );
};

export default DynamicMemorySection;