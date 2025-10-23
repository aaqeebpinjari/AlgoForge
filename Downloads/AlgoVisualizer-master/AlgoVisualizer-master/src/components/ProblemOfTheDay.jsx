import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Play, Eye, Code, Sparkles } from 'lucide-react';
import { getProblemOfTheDay, getTimeUntilNextProblem, formatTimeRemaining } from '../utils/problemOfTheDay';
import { getDifficultyColor } from '../data/problemsOfTheDay';

const ProblemOfTheDay = () => {
  const [problem, setProblem] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Get today's problem
    const todaysProblem = getProblemOfTheDay();
    setProblem(todaysProblem);

    // Set up countdown timer
    const updateTimer = () => {
      setTimeRemaining(getTimeUntilNextProblem());
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  if (!problem) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sparkles size={24} />
            <h2 className="text-xl font-semibold">Problem of the Day</h2>
          </div>
          <div className="flex items-center gap-3 text-base">
            <Clock size={18} />
            <span>Next: {formatTimeRemaining(timeRemaining)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-10">
        {/* Title and Difficulty */}
        <div className="flex items-start justify-between mb-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white pr-6 leading-tight">
            {problem.title}
          </h3>
          <span className={`px-6 py-3 rounded-full text-base font-semibold ${getDifficultyColor(problem.difficulty)} whitespace-nowrap`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Description */}
        <div className="mb-10">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {problem.description}
          </p>
        </div>

        {/* Sample Input/Output */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 mb-10 border border-gray-200 dark:border-gray-600">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Examples
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Sample Input
              </h5>
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6">
                <code className="text-base text-gray-800 dark:text-gray-200 font-mono leading-relaxed block">
                  {problem.sampleInput}
                </code>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Sample Output
              </h5>
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6">
                <code className="text-base text-gray-800 dark:text-gray-200 font-mono leading-relaxed block">
                  {problem.sampleOutput}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problem.visualizationLink && (
            <Link
              to={problem.visualizationLink}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md text-base"
            >
              <Play size={18} />
              Visualize
            </Link>
          )}

          {problem.explanationLink && (
            <Link
              to={problem.explanationLink}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md text-base"
            >
              <Eye size={18} />
              View Solution
            </Link>
          )}

          {/* Single practice link using the `practiceUrl` provided in the data */}
          {problem.practiceUrl && (
            <a
              href={problem.practiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md text-base"
            >
              <Code size={18} />
              Practice
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProblemOfTheDay;
