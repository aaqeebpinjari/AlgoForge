// exponentialSearch.js
import { binarySearch } from "./binarySearch"; // (kept in case you still need it elsewhere)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const exponentialSearch = async (array, target, setColorArray, delay) => {
  const n = array.length;
  if (n === 0) return -1;

  // Quick check index 0
  setColorArray(Array.from({ length: n }, (_, idx) => (idx === 0 ? "yellow" : "lightgrey")));
  await sleep(delay);
  if (array[0] === target) {
    setColorArray(Array.from({ length: n }, (_, idx) => (idx === 0 ? "green" : "lightgrey")));
    return 0;
  }

  // Exponential probe: 1,2,4,8,...
  let i = 1;
  while (i < n && array[i] <= target) {
    // highlight the probe index i
    setColorArray(Array.from({ length: n }, (_, idx) => (idx === i ? "yellow" : "lightgrey")));
    await sleep(delay);
    i *= 2;
  }

  // Compute window [left, right] to binary-search
  const left = Math.floor(i / 2);
  const right = Math.min(i, n - 1);

  // Shade the window
  setColorArray(
    Array.from({ length: n }, (_, idx) =>
      idx >= left && idx <= right ? "#66ccff" : "#2b3a4b"
    )
  );
  await sleep(delay);

  // Binary search INSIDE [left, right] on the ORIGINAL array
  let l = left,
    r = right;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);

    // highlight current mid inside the window
    setColorArray(
      Array.from({ length: n }, (_, idx) => {
        if (idx < left || idx > right) return "#2b3a4b";
        if (idx === mid) return "red";
        return "#66ccff";
      })
    );
    await sleep(delay);

    if (array[mid] === target) {
      setColorArray(Array.from({ length: n }, (_, idx) => (idx === mid ? "green" : "lightgrey")));
      await sleep(delay);
      return mid; // ✅ return absolute index
    }
    if (array[mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  // Not found
  setColorArray(Array.from({ length: n }, () => "lightgrey"));
  await sleep(delay);
  return -1;
};
