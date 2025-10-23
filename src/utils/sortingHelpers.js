// src/utils/sortingHelpers.js
export const COLOR = {
  base: "var(--accent-primary)",
  comparing: "#ffd93d", // yellow-ish for comparing
  swapping: "#ff6b6b", // red-ish for swapping
  pivot: "#f0ad4e",    // pivot/orange
  scanned: "#e0e7ff",  // light highlight
  sorted: "#4ade80",   // green when sorted
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const createBaseColors = (n) => new Array(n).fill(COLOR.base);

export const markAllSorted = (n, setColorArray) =>
  setColorArray(new Array(n).fill(COLOR.sorted));
