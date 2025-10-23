// src/pages/DPPage.jsx
import React, { useEffect, useState, useRef, useMemo } from "react";
import DPVisualizer from "../components/DPVisualizer";
import { dpAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";

import AOS from "aos";
import "aos/dist/aos.css";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Language dependencies
import "prismjs/components/prism-clike.min.js";
import "prismjs/components/prism-c.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-cpp.min.js";
import "prismjs/components/prism-python.min.js";

// Plugins
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

import { FiCopy, FiCheck } from "react-icons/fi";
import SubscribeButton from "../components/SubscribeButton";
import { useNotifications } from "../contexts/NotificationsContext";

const DPPage = () => {
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("fibonacci"); // default algorithm

  const { addNotification } = useNotifications();

  const algorithmData = (dpAlgorithms && dpAlgorithms[selectedAlgorithm]) || {};
  const codeRef = useRef(null);

  const prismLang = useMemo(() => {
    const map = { javascript: "javascript", java: "java", cpp: "cpp", python: "python" };
    return map[selectedLanguage] || "javascript";
  }, [selectedLanguage]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    if (codeRef.current) Prism.highlightElement(codeRef.current);
  }, [algorithmData, selectedLanguage, selectedAlgorithm]);

  const handleCopy = async () => {
    const code = algorithmData[selectedLanguage] || "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      addNotification(`Copied ${displayName[selectedAlgorithm]} (${selectedLanguage}) code`, selectedAlgorithm);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const defaultSizes = {
    fibonacci: 10,
    knapsack: 5,
    coinChange: 10,
    lcs: 5,
    matrixChain: 4,
    minPathSum: 5,
    subsetSum: 10,
  };

  const displayName = {
    fibonacci: "Fibonacci Sequence",
    knapsack: "0/1 Knapsack",
    coinChange: "Coin Change",
    lcs: "Longest Common Subsequence",
    matrixChain: "Matrix Chain Multiplication",
    minPathSum: "Minimum Path Sum",
    subsetSum: "Subset Sum",
  };

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Dynamic Programming Visualizer</h1>
      <p className="theme-description">
        Explore how dynamic programming algorithms work step-by-step. Visualize top-down and bottom-up approaches, and try your own examples.
      </p>

      {/* 🔔 Subscribe button for notifications */}
      <SubscribeButton algorithmId={selectedAlgorithm} />

      <div data-aos="fade-up" data-aos-delay="200">
        <DPVisualizer
          defaultAlgorithm={selectedAlgorithm}
          problemSize={defaultSizes[selectedAlgorithm] || 10}
          autoLoadExample={true}
        />
      </div>

      <div className="algorithm-buttons" data-aos="fade-up" data-aos-delay="300">
        {Object.keys(dpAlgorithms).map((algo) => (
          <button
            key={algo}
            className={`btn ${selectedAlgorithm === algo ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setSelectedAlgorithm(algo)}
          >
            {displayName[algo] || algo}
          </button>
        ))}
      </div>

      <div className="theme-card" data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>Dynamic Programming - Code Implementation</h3>
          <div className="language-buttons">
            {["java", "python", "cpp", "javascript", "go"].map((lang) => (
              <button
                key={lang}
                className={`btn ${selectedLanguage === lang ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="code-container">
          <button onClick={handleCopy} title="Copy code" className="copy-btn">
            {copied ? <FiCheck /> : <FiCopy />}
          </button>

          <pre className="line-numbers">
            <code ref={codeRef} className={`language-${prismLang}`}>
              {algorithmData[selectedLanguage] || ""}
            </code>
          </pre>
        </div>

        <div className="note-box">
          <strong>Note:</strong> This is the actual implementation code for the{" "}
          <strong>{displayName[selectedAlgorithm]}</strong> algorithm in{" "}
          <strong>{selectedLanguage.toUpperCase()}</strong>.
        </div>
      </div>
    </div>
  );
};

export default DPPage;
