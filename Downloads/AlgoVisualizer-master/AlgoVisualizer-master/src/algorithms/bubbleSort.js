import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function bubbleSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0, swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    if (stopRef.current) throw new Error("Stopped");
    for (let j = 0; j < n - i - 1; j++) {
      if (stopRef.current) throw new Error("Stopped");
      comparisons++;
      const colors = createBaseColors(n);
      colors[j] = COLOR.comparing;
      colors[j + 1] = COLOR.comparing;
      setColorArray([...colors]);
      await sleep(delay);
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        setArray([...a]);
        const swapColors = createBaseColors(n);
        swapColors[j] = COLOR.swapping;
        swapColors[j + 1] = COLOR.swapping;
        setColorArray([...swapColors]);
        await sleep(delay);
      }
      updateStats({ comparisons, swaps, time: 0 });
    }
    const passColors = createBaseColors(n);
    for (let k = n - i - 1; k < n; k++) passColors[k] = COLOR.sorted;
    setColorArray([...passColors]);
  }
  markAllSorted(n, setColorArray);
  return 0;
}
