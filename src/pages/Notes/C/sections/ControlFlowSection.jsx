import React from "react";

const ControlFlowSection = ({ copyCode, copiedCode }) => {
  const ifelseCode = `#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F\\n");
    }

    return 0;
}`;

  const switchCode = `#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        default:
            printf("Invalid day\\n");
    }

    return 0;
}`;

  const forLoopCode = `#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("Number: %d\\n", i);
    }

    return 0;
}`;

  const whileLoopCode = `#include <stdio.h>

int main() {
    int i = 1;
    while (i <= 5) {
        printf("Count: %d\\n", i);
        i++;
    }

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-sitemap"></i> 4. Conditional Statements & Loops</h2>

        <h3>if-else Statement</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "ifelse" ? "copied" : ""}`} onClick={() => copyCode(ifelseCode, "ifelse")}>{copiedCode === "ifelse" ? "Copied!" : "Copy"}</button>
          <pre>{ifelseCode}</pre>
        </div>

        <h3>switch Statement</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "switch" ? "copied" : ""}`} onClick={() => copyCode(switchCode, "switch")}>{copiedCode === "switch" ? "Copied!" : "Copy"}</button>
          <pre>{switchCode}</pre>
        </div>

        <h3>for Loop</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "forloop" ? "copied" : ""}`} onClick={() => copyCode(forLoopCode, "forloop")}>{copiedCode === "forloop" ? "Copied!" : "Copy"}</button>
          <pre>{forLoopCode}</pre>
        </div>

        <h3>while Loop</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "whileloop" ? "copied" : ""}`} onClick={() => copyCode(whileLoopCode, "whileloop")}>{copiedCode === "whileloop" ? "Copied!" : "Copy"}</button>
          <pre>{whileLoopCode}</pre>
        </div>
      </div>
    </section>
  );
};

export default ControlFlowSection;