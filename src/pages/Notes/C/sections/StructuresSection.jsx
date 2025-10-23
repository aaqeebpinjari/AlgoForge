import React from "react";

const StructuresSection = ({ copyCode, copiedCode }) => {
  const structCode = `#include <stdio.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main() {
    struct Student s1 = {"John", 20, 3.5};

    printf("Name: %s\\n", s1.name);
    printf("Age: %d\\n", s1.age);
    printf("GPA: %.1f\\n", s1.gpa);

    return 0;
}`;

  const unionCode = `#include <stdio.h>
#include <string.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    union Data data;

    data.i = 10;
    printf("Integer: %d\\n", data.i);

    data.f = 3.14;
    printf("Float: %.2f\\n", data.f);

    strcpy(data.str, "Hello");
    printf("String: %s\\n", data.str);

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-cubes"></i> 8. Structures & Unions</h2>

        <h3>Structures</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "struct" ? "copied" : ""}`} onClick={() => copyCode(structCode, "struct")}>
            {copiedCode === "struct" ? "Copied!" : "Copy"}
          </button>
          <pre>{structCode}</pre>
        </div>

        <h3>Unions</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "union" ? "copied" : ""}`} onClick={() => copyCode(unionCode, "union")}>
            {copiedCode === "union" ? "Copied!" : "Copy"}
          </button>
          <pre>{unionCode}</pre>
        </div>
      </div>
    </section>
  );
};

export default StructuresSection;