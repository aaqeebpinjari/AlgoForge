import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function heapSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0, swaps = 0;

  const heapify = async (heapSize, rootIndex) => {
    if (stopRef.current) throw new Error("Stopped");
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    if (left < heapSize) {
      comparisons++;
      if (a[left] > a[largest]) largest = left;
    }
    if (right < heapSize) {
      comparisons++;
      if (a[right] > a[largest]) largest = right;
    }

    if (largest !== rootIndex) {
      [a[rootIndex], a[largest]] = [a[largest], a[rootIndex]];
      swaps++;
      setArray([...a]);
      updateStats({ comparisons, swaps, time: 0 });
      const swapColors = createBaseColors(n);
      swapColors[rootIndex] = COLOR.swapping;
      swapColors[largest] = COLOR.swapping;
      setColorArray([...swapColors]);
      await sleep(delay);
      await heapify(heapSize, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (stopRef.current) throw new Error("Stopped");
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    if (stopRef.current) throw new Error("Stopped");
    [a[0], a[i]] = [a[i], a[0]];
    swaps++;
    setArray([...a]);
    updateStats({ comparisons, swaps, time: 0 });
    const swapColors = createBaseColors(n);
    swapColors[0] = COLOR.swapping;
    swapColors[i] = COLOR.swapping;
    setColorArray([...swapColors]);
    await sleep(delay);
    await heapify(i, 0);
    const postColors = createBaseColors(n);
    for (let k = i; k < n; k++) postColors[k] = COLOR.sorted;
    setColorArray([...postColors]);
    await sleep(delay);
  }
  markAllSorted(n, setColorArray);
  return 0;
}
