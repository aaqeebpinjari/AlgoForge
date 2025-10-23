import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function selectionSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  const counts = { comparisons: 0, swaps: 0 };

  const selectionScanForMin = async (a, start, n, colors) => {
    let minIdx = start;
    for (let j = start + 1; j < n; j++) {
      if (stopRef.current) throw new Error("Stopped");
      counts.comparisons++;
      colors[j] = COLOR.comparing;
      setColorArray([...colors]);
      await sleep(delay);
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
      updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
    }
    return minIdx;
  };

  const selectionSwapIfNeeded = async (a, i, minIdx) => {
    if (i !== minIdx) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      counts.swaps++;
      setArray([...a]);
      updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
      const swapColors = createBaseColors(a.length);
      swapColors[i] = COLOR.swapping;
      swapColors[minIdx] = COLOR.swapping;
      setColorArray([...swapColors]);
      await sleep(delay);
    }
  };

  for (let i = 0; i < n - 1; i++) {
    if (stopRef.current) throw new Error("Stopped");
    const colors = createBaseColors(n);
    colors[i] = COLOR.comparing;
    setColorArray([...colors]);

    const minIdx = await selectionScanForMin(a, i, n, colors);
    await selectionSwapIfNeeded(a, i, minIdx);

    for (let k = 0; k <= i; k++) colors[k] = COLOR.sorted;
    setColorArray([...colors]);
    updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
  }

  markAllSorted(n, setColorArray);
  return 0;
}
