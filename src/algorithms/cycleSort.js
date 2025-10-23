import {
  COLOR,
  createBaseColors,
  markAllSorted,
  sleep,
} from "../utils/sortingHelpers";

/**
 * Cycle Sort with visualization and stop support.
 * Efficient for minimizing writes: each element is placed
 * directly in its correct cycle position.
 */
export async function cycleSortWithStop(
  arr,
  setArray,
  setColorArray,
  delay,
  stopRef,
  updateStats
) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0,
    swaps = 0;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    if (stopRef.current) throw new Error("Stopped");

    let item = a[cycleStart];
    let pos = cycleStart;

    // 🔎 Step 1: Find correct position of item
    for (let i = cycleStart + 1; i < n; i++) {
      if (stopRef.current) throw new Error("Stopped");
      comparisons++;
      if (a[i] < item) pos++;
    }

    // If already in correct position, skip
    if (pos === cycleStart) continue;

    // Handle duplicates
    while (pos < n && item === a[pos]) pos++;

    // 🔄 Step 2: Rotate cycle
    while (pos !== cycleStart) {
      if (stopRef.current) throw new Error("Stopped");

      // Place item at its position
      [a[pos], item] = [item, a[pos]];
      swaps++;

      // Visualization update
      const colors = createBaseColors(n);
      colors[pos] = COLOR.swapping;
      colors[cycleStart] = COLOR.comparing;
      setArray([...a]);
      setColorArray([...colors]);
      await sleep(delay);
      updateStats({ comparisons, swaps, time: 0 });

      // Recompute correct position for new item
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        if (a[i] < item) pos++;
      }
      while (pos < n && item === a[pos]) pos++;
    }

    // Mark elements up to cycleStart as sorted
    const colors = createBaseColors(n);
    for (let k = 0; k <= cycleStart; k++) colors[k] = COLOR.sorted;
    setColorArray([...colors]);
    await sleep(delay);
  }

  // ✅ All sorted
  markAllSorted(n, setColorArray);
}
