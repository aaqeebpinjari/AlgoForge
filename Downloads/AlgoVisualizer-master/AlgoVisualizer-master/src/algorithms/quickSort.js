import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function quickSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;

  const partition = async (low, high) => {
    if (stopRef.current) throw new Error("Stopped");
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (stopRef.current) throw new Error("Stopped");
      comparisons++;
      const colors = createBaseColors(a.length);
      colors[j] = COLOR.comparing;
      colors[high] = COLOR.pivot;
      setColorArray([...colors]);
      await sleep(delay);
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
        setArray([...a]);
        updateStats({ comparisons, swaps, time: 0 });
        const swapColors = createBaseColors(a.length);
        swapColors[i] = COLOR.swapping;
        swapColors[j] = COLOR.swapping;
        setColorArray([...swapColors]);
        await sleep(delay);
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    swaps++;
    setArray([...a]);
    updateStats({ comparisons, swaps, time: 0 });
    await sleep(delay);
    return i + 1;
  };

  const quickSortHelper = async (low, high) => {
    if (stopRef.current) throw new Error("Stopped");
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  };

  await quickSortHelper(0, a.length - 1);
  markAllSorted(a.length, setColorArray);
  return 0;
}
