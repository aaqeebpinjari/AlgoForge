import React from 'react';
import PerformanceStats from '../components/Sorting/PerformanceStats';
import '../components/Sorting/PerformanceStats.css';

const stats = {
    comparisons: 120,
    swaps: 45,
    elapsed: '2.3s',
    size: 50
};

const SortingAlgorithmPage = () => {
    return (
        <div>
            <h1>Sorting Algorithm Visualizer</h1>
            {/* Other components and code for the page */}
            <div className="performance-statistics">
                <h2>Performance Statistics</h2>
                <PerformanceStats stats={stats} />
            </div>
        </div>
    );
};

export default SortingAlgorithmPage;
