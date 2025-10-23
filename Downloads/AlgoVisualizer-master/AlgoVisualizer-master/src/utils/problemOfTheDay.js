import { PROBLEMS_POOL } from '../data/problemsOfTheDay';

// Storage keys
const PROBLEM_OF_DAY_KEY = 'problemOfTheDay';
const USED_PROBLEMS_KEY = 'usedProblemsThisMonth';

// Get current date info
const getCurrentDateInfo = () => {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
    dateString: now.toDateString()
  };
};

// Get stored problem of the day
const getStoredProblemOfDay = () => {
  try {
    const stored = localStorage.getItem(PROBLEM_OF_DAY_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading stored problem:', error);
    return null;
  }
};

// Store problem of the day
const storeProblemOfDay = (problem, dateInfo) => {
  try {
    const data = {
      problem,
      date: dateInfo.dateString,
      day: dateInfo.day,
      month: dateInfo.month,
      year: dateInfo.year
    };
    localStorage.setItem(PROBLEM_OF_DAY_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing problem:', error);
  }
};

// Get used problems for current month
const getUsedProblemsThisMonth = (currentMonth, currentYear) => {
  try {
    const stored = localStorage.getItem(USED_PROBLEMS_KEY);
    if (!stored) return new Set();

    const data = JSON.parse(stored);
    // Check if it's the same month/year
    if (data.month === currentMonth && data.year === currentYear) {
      return new Set(data.usedIds);
    }
    // Different month, reset
    return new Set();
  } catch (error) {
    console.error('Error reading used problems:', error);
    return new Set();
  }
};

// Store used problems for current month
const storeUsedProblemsThisMonth = (usedProblems, currentMonth, currentYear) => {
  try {
    const data = {
      usedIds: Array.from(usedProblems),
      month: currentMonth,
      year: currentYear
    };
    localStorage.setItem(USED_PROBLEMS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing used problems:', error);
  }
};

// Get available problems (not used this month)
const getAvailableProblems = (usedProblems) => {
  return PROBLEMS_POOL.filter(problem => !usedProblems.has(problem.id));
};

// Select random problem from available ones
const selectRandomProblem = (availableProblems) => {
  if (availableProblems.length === 0) {
    // If all problems used this month, reset and use all
    return PROBLEMS_POOL[Math.floor(Math.random() * PROBLEMS_POOL.length)];
  }
  return availableProblems[Math.floor(Math.random() * availableProblems.length)];
};

// Main function to get problem of the day
export const getProblemOfTheDay = () => {
  const dateInfo = getCurrentDateInfo();
  const storedProblem = getStoredProblemOfDay();

  // Check if we already have a problem for today
  if (storedProblem &&
      storedProblem.day === dateInfo.day &&
      storedProblem.month === dateInfo.month &&
      storedProblem.year === dateInfo.year) {
    return storedProblem.problem;
  }

  // Get used problems for this month
  const usedProblems = getUsedProblemsThisMonth(dateInfo.month, dateInfo.year);

  // Get available problems
  const availableProblems = getAvailableProblems(usedProblems);

  // Select random problem
  const selectedProblem = selectRandomProblem(availableProblems);

  // Mark as used
  usedProblems.add(selectedProblem.id);

  // Store the selection
  storeProblemOfDay(selectedProblem, dateInfo);
  storeUsedProblemsThisMonth(usedProblems, dateInfo.month, dateInfo.year);

  return selectedProblem;
};

// Get time until next problem (midnight)
export const getTimeUntilNextProblem = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return tomorrow.getTime() - now.getTime();
};

// Format time remaining as HH:MM:SS
export const formatTimeRemaining = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
