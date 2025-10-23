import React, { useEffect, useState } from 'react';
import { FaExchangeAlt, FaStopwatch, FaSortNumericUp, FaListOl } from 'react-icons/fa';
import './PerformanceStats.css'; // Add new CSS for styling

const statConfig = [
  {
    key: 'comparisons',
    label: 'Comparisons',
    icon: <FaListOl color="#4F8A8B" size={28} />,
    color: '#E8F6EF'
  },
  {
    key: 'swaps',
    label: 'Swaps/Moves',
    icon: <FaExchangeAlt color="#FFB400" size={28} />,
    color: '#FFF6E0'
  },
  {
    key: 'elapsed',
    label: 'Elapsed Time',
    icon: <FaStopwatch color="#FF6363" size={28} />,
    color: '#FFE5E5'
  },
  {
    key: 'size',
    label: 'Array Size',
    icon: <FaSortNumericUp color="#3A6351" size={28} />,
    color: '#E3F6F5'
  }
];

function CountUp({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = display;
    let end = value;
    if (start === end) return;
    let step = Math.ceil(Math.abs(end - start) / 20);
    let timer = setInterval(() => {
      setDisplay(prev => {
        if ((step > 0 && prev + step >= end) || (step < 0 && prev + step <= end)) {
          clearInterval(timer);
          return end;
        }
        return prev + step;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <span className="perfstat-number">{display}</span>;
}

const PerformanceStats = ({ stats }) => (
  <div className="perfstat-container">
    {statConfig.map(stat => (
      <div className="perfstat-card" style={{ background: stat.color }} key={stat.key}>
        <div className="perfstat-icon">{stat.icon}</div>
        <div className="perfstat-content">
          <CountUp value={stats[stat.key] || 0} />
          <div className="perfstat-label">{stat.label}</div>
        </div>
      </div>
    ))}
  </div>
);

export default PerformanceStats;
