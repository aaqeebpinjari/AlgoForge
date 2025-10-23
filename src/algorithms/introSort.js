import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function introSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0, swaps = 0;
  const maxDepth = 2 * Math.floor(Math.log2(Math.max(2, n)));

  const insertionRange = async (left, right) => {
    for (let i = left + 1; i <= right; i++) {
      if (stopRef.current) throw new Error("Stopped");
      const key = a[i];
      let j = i - 1;
      while (j >= left && a[j] > key) {
        a[j + 1] = a[j];
        j--;
        swaps++;
        setArray([...a]);
        await sleep(delay);
        updateStats({ comparisons, swaps, time: 0 });
      }
      a[j + 1] = key;
    }
  };

  const heapifyLocal = async (heapSize, root) => {
    if (stopRef.current) throw new Error("Stopped");
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;
    if (left < heapSize) {
      comparisons++;
      if (a[left] > a[largest]) largest = left;
    }
    if (right < heapSize) {
      comparisons++;
      if (a[right] > a[largest]) largest = right;
    }
    if (largest !== root) {
      [a[root], a[largest]] = [a[largest], a[root]];
      swaps++;
      setArray([...a]);
      await sleep(delay);
      await heapifyLocal(heapSize, largest);
    }
  };

  const heapSortLocal = async (left, right) => {
    if (stopRef.current) throw new Error("Stopped");
    const size = right - left + 1;
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
      await heapifyLocal(size, i);
    }
    for (let i = size - 1; i > 0; i--) {
      [a[left], a[left + i]] = [a[left + i], a[left]];
      swaps++;
      setArray([...a]);
      await sleep(delay);
      await heapifyLocal(i, 0);
    }
  };

  const partition = async (low, high) => {
    if (stopRef.current) throw new Error("Stopped");
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (stopRef.current) throw new Error("Stopped");
      comparisons++;
      const colors = createBaseColors(n);
      colors[j] = COLOR.comparing;
      colors[high] = COLOR.pivot;
      setColorArray([...colors]);
      await sleep(delay);
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
        setArray([...a]);
        await sleep(delay);
        updateStats({ comparisons, swaps, time: 0 });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    swaps++;
    setArray([...a]);
    await sleep(delay);
    return i + 1;
  };

  const introHelper = async (low, high, depth) => {
    if (stopRef.current) throw new Error("Stopped");
    const size = high - low + 1;
    if (size <= 16) {
      await insertionRange(low, high);
      return;
    }
    if (depth === 0) {
      await heapSortLocal(low, high);
      return;
    }
    const pi = await partition(low, high);
    await introHelper(low, pi - 1, depth - 1);
    await introHelper(pi + 1, high, depth - 1);
  };

  await introHelper(0, n - 1, maxDepth);
  markAllSorted(n, setColorArray);
  updateStats({ comparisons, swaps, time: 0 });
  return 0;
}


