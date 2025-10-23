import React from "react";

const ExampleCodeSection = ({ copyCode, copiedCode }) => {
  const code = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure definition
struct Student {
    char name[50];
    int roll_no;
    float marks;
};

// Function declaration
void display_student(struct Student s);
int factorial(int n);

int main() {
    // Variables and constants
    const int MAX_STUDENTS = 3;
    struct Student students[MAX_STUDENTS];

    // Input student data
    for (int i = 0; i < MAX_STUDENTS; i++) {
        printf("Enter details for student %d:\\n", i + 1);
        printf("Name: ");
        scanf("%s", students[i].name);
        printf("Roll No: ");
        scanf("%d", &students[i].roll_no);
        printf("Marks: ");
        scanf("%f", &students[i].marks);
        printf("\\n");
    }

    // Display student data
    printf("Student Details:\\n");
    for (int i = 0; i < MAX_STUDENTS; i++) {
        display_student(students[i]);
    }

    // Factorial calculation
    int num = 5;
    printf("\\nFactorial of %d is %d\\n", num, factorial(num));

    return 0;
}

// Function to display student
void display_student(struct Student s) {
    printf("Name: %s\\n", s.name);
    printf("Roll No: %d\\n", s.roll_no);
    printf("Marks: %.2f\\n\\n", s.marks);
}

// Recursive factorial function
int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-terminal"></i> Example Code</h2>
        <p>A comprehensive example demonstrating various C concepts:</p>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "examples" ? "copied" : ""}`} onClick={() => copyCode(code, "examples")}>
            {copiedCode === "examples" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div>
      </div>
    </section>
  );
};

export default ExampleCodeSection;