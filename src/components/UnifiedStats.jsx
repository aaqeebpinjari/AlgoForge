import React from "react";

const UnifiedStats = ({ statistics, algorithmType }) => {
  const getDefaultStats = () => ({
    comparisons: 0,
    swaps: 0,
    time: 0,
    arraySize: 0,
    ...statistics
  });

  const stats = getDefaultStats();

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">
          {algorithmType === "searching" ? "Probes" : "Comparisons"}
        </div>
        <div className="stat-value">{stats.comparisons}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">
          {algorithmType === "searching" ? "Matches" : "Swaps/Moves"}
        </div>
        <div className="stat-value">{stats.swaps}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Elapsed Time</div>
        <div className="stat-value">{stats.time} ms</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Array Size</div>
        <div className="stat-value">{stats.arraySize}</div>
      </div>
    </div>
  );
};

export default UnifiedStats;