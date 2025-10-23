import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function shellSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0, swaps = 0;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    if (stopRef.current) throw new Error("Stopped");

    for (let i = gap; i < n; i++) {
      if (stopRef.current) throw new Error("Stopped");

      const temp = a[i];
      let j;
      const colors = createBaseColors(n);
      colors[i] = COLOR.comparing;
      setColorArray([...colors]);
      await sleep(delay);

      for (j = i; j >= gap && a[j - gap] > temp; j -= gap) {
        if (stopRef.current) throw new Error("Stopped");
        comparisons++;
        const compColors = createBaseColors(n);
        compColors[j] = COLOR.comparing;
        compColors[j - gap] = COLOR.comparing;
        setColorArray([...compColors]);
        await sleep(delay);
        a[j] = a[j - gap];
        swaps++;
        setArray([...a]);
        const swapColors = createBaseColors(n);
        swapColors[j] = COLOR.swapping;
        swapColors[j - gap] = COLOR.swapping;
        setColorArray([...swapColors]);
        await sleep(delay);
        updateStats({ comparisons, swaps, time: 0 });
      }

      a[j] = temp;
      setArray([...a]);
      const finalColors = createBaseColors(n);
      finalColors[j] = COLOR.sorted;
      setColorArray([...finalColors]);
      await sleep(delay);
      updateStats({ comparisons, swaps, time: 0 });
    }

    const gapColors = createBaseColors(n);
    for (let start = 0; start < gap; start++) {
      for (let k = start; k < n; k += gap) {
        gapColors[k] = COLOR.sorted;
      }
    }
    setColorArray([...gapColors]);
    await sleep(delay);
  }

  markAllSorted(n, setColorArray);
  return 0;
}
