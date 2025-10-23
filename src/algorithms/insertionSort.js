import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function insertionSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  let comparisons = 0, swaps = 0;

  for (let i = 1; i < n; i++) {
    if (stopRef.current) throw new Error("Stopped");
    const key = a[i];
    let j = i - 1;
    const colors = createBaseColors(n);
    colors[i] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);

    while (j >= 0 && a[j] > key) {
      if (stopRef.current) throw new Error("Stopped");
      comparisons++;
      colors[j] = COLOR.comparing;
      colors[j + 1] = COLOR.comparing;
      setColorArray([...colors]);
      a[j + 1] = a[j];
      swaps++;
      setArray([...a]);
      await sleep(delay);
      updateStats({ comparisons, swaps, time: 0 });
      j--;
    }
    a[j + 1] = key;
    setArray([...a]);
    for (let k = 0; k <= i; k++) colors[k] = COLOR.sorted;
    setColorArray([...colors]);
    await sleep(delay);
  }
  markAllSorted(n, setColorArray);
  return 0;
}
