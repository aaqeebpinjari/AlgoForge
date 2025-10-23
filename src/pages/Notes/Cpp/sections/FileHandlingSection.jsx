import React from "react";

const FileHandlingSection = ({ copyCode, copiedCode }) => {
  const code = `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Writing to a file
    ofstream outputFile("example.txt");
    if (outputFile.is_open()) {
        outputFile << "Hello, World!" << endl;
        outputFile << "This is a sample text file." << endl;
        outputFile << "Line number three." << endl;
        outputFile.close();
        cout << "Data written to file successfully." << endl;
    } else {
        cout << "Unable to open file for writing." << endl;
    }

    // Reading from a file
    ifstream inputFile("example.txt");
    if (inputFile.is_open()) {
        string line;
        cout << "Reading from file:" << endl;
        while (getline(inputFile, line)) {
            cout << line << endl;
        }
        inputFile.close();
    } else {
        cout << "Unable to open file for reading." << endl;
    }

    // Appending to a file
    ofstream appendFile("example.txt", ios::app);
    if (appendFile.is_open()) {
        appendFile << "This line was appended." << endl;
        appendFile.close();
        cout << "Data appended to file successfully." << endl;
    }

    return 0;
}`;

  return (
    <section>
      <div className="card">
        <h2><i className="fas fa-file-alt"></i> File Handling in C++</h2>
        <p>C++ provides file handling capabilities through the fstream library for reading from and writing to files.</p>
        <h3>File Operations</h3>
        <ul>
          <li><strong>ofstream:</strong> For writing to files</li>
          <li><strong>ifstream:</strong> For reading from files</li>
          <li><strong>fstream:</strong> For both reading and writing</li>
        </ul>
        <div className="code-container bg-black">
          <button className={`copy-btn ${copiedCode === "filehandling" ? "copied" : ""}`} onClick={() => copyCode(code, "filehandling")}>
            {copiedCode === "filehandling" ? "Copied!" : "Copy"}
          </button>
          <pre>{code}</pre>
        </div>
      </div>
    </section>
  );
};

export default FileHandlingSection;