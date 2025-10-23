import React from "react";
import "../styles/global-theme.css";

/**
 * ComplexityBadge - Display time and space complexity as small pill badges
 * @param {string} time - Time complexity (e.g., "O(n log n)")
 * @param {string} space - Space complexity (e.g., "O(n)")
 */
const ComplexityBadge = ({ time, space }) => {
  // Return null if no complexity data provided
  if (!time && !space) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {time && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.9rem",
            background: "var(--success-bg, #e8f5e9)",
            border: "1px solid var(--success-border, #4caf50)",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "500",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
            }}
          >
            ⏱️
          </span>
          <span style={{ color: "var(--text-primary)" }}>
            <strong>Time:</strong> {time}
          </span>
        </div>
      )}

      {space && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.9rem",
            background: "var(--info-bg, #e3f2fd)",
            border: "1px solid var(--info-border, #2196f3)",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "500",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
            }}
          >
            💾
          </span>
          <span style={{ color: "var(--text-primary)" }}>
            <strong>Space:</strong> {space}
          </span>
        </div>
      )}
    </div>
  );
};

export default ComplexityBadge;
