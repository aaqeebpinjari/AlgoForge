import React from "react";

const CodeBlock = ({ code, identifier, copyCode, copiedCode }) => {
  return (
    <div className="code-container">
      <button
        className={`copy-btn ${copiedCode === identifier ? "copied" : ""}`}
        onClick={() => copyCode(code, identifier)}
      >
        {copiedCode === identifier ? "Copied!" : "Copy"}
      </button>
      <pre>{code}</pre>
    </div>
  );
};

export default CodeBlock;
