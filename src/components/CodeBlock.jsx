import React from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

const CodeBlock = ({ code, codeIdentifier, copyCode, copiedCode }) => {
  const isCopied = copiedCode === codeIdentifier;

  return (
    <div className="code-container bg-black">
      <button
        className={`copy-btn ${isCopied ? "copied" : ""}`}
        onClick={() => copyCode(code, codeIdentifier)}
        aria-label={isCopied ? "Code copied" : "Copy code"}
      >
        {isCopied ? (
          <>
            <FaCheck /> Copied!
          </>
        ) : (
          <FaCopy />
        )}
      </button>
      <pre>{code}</pre>
    </div>
  );
};

export default CodeBlock;