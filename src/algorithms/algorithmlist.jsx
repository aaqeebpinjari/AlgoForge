import React, { useEffect, useState } from "react";
import "../styles/algorithm.css";
import algorithmsData from "./algorithms.json";
import "./AlgorithmList.css";

const AlgorithmList = () => {
  const [algorithms, setAlgorithms] = useState([]);

  useEffect(() => {
    setAlgorithms(algorithmsData);
  }, []);

  return (
    <div className="algorithm-container">
      {algorithms.map((algo, index) => (
        <div key={index} className="algorithm-card">
          <span className="algorithm-name">{algo.name}</span>
          <span className="tooltip">{algo.description}</span>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmList;
