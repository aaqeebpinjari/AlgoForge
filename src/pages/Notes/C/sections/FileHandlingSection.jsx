import React from "react";

const FileHandlingSection = ({ copyCode, copiedCode }) => {
  const fileWriteCode = `#include <stdio.h>

int main() {
    FILE *fp;
    fp = fopen("example.txt", "w");

    if (fp == NULL) {
        printf("Error opening file\\n");
        return 1;
    }

    fprintf(fp, "Hello, File!\\n");
    fprintf(fp, "This is a test.\\n");

    fclose(fp);
    printf("Data written to file.\\n");

    return 0;
}`;

  const fileReadCode = `#include <stdio.h>

int main() {
    FILE *fp;
    char buffer[100];

    fp = fopen("example.txt", "r");

    if (fp == NULL) {
        printf("Error opening file\\n");
        return 1;
    }

    while (fgets(buffer, 100, fp) != NULL) {
        printf("%s", buffer);
    }

    fclose(fp);
    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-file"></i> 9. File Handling</h2>

        <h3>Writing to a File</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "filewrite" ? "copied" : ""}`} onClick={() => copyCode(fileWriteCode, "filewrite")}>
            {copiedCode === "filewrite" ? "Copied!" : "Copy"}
          </button>
          <pre>{fileWriteCode}</pre>
        </div>

        <h3>Reading from a File</h3>
        <div className="code-container">
          <button className={`copy-btn ${copiedCode === "fileread" ? "copied" : ""}`} onClick={() => copyCode(fileReadCode, "fileread")}>
            {copiedCode === "fileread" ? "Copied!" : "Copy"}
          </button>
          <pre>{fileReadCode}</pre>
        </div>
      </div>
    </section>
  );
};

export default FileHandlingSection;