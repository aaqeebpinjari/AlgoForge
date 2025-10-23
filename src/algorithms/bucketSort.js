import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function bucketSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  if (n === 0) return 0;
  let comparisons = 0, swaps = 0;

  const minVal = Math.min(...a);
  const maxVal = Math.max(...a);

  const bucketCount = Math.max(1, Math.floor(n / 2));
  const buckets = new Array(bucketCount).fill(0).map(() => []);

  for (let i = 0; i < n; i++) {
    if (stopRef.current) throw new Error("Stopped");
    const idx = Math.floor(((a[i] - minVal) / (maxVal - minVal + 1)) * bucketCount);
    buckets[idx].push(a[i]);
    comparisons++;
    const colors = createBaseColors(n);
    colors[i] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);
    updateStats({ comparisons, swaps, time: 0 });
  }

  let pos = 0;
  for (let b = 0; b < buckets.length; b++) {
    if (stopRef.current) throw new Error("Stopped");
    const bucket = buckets[b];
    for (let i = 1; i < bucket.length; i++) {
      let key = bucket[i];
      let j = i - 1;
      while (j >= 0 && bucket[j] > key) {
        if (stopRef.current) throw new Error("Stopped");
        bucket[j + 1] = bucket[j];
        j--;
        swaps++;
        updateStats({ comparisons, swaps, time: 0 });
      }
      bucket[j + 1] = key;
    }
    for (let i = 0; i < bucket.length; i++) {
      if (stopRef.current) throw new Error("Stopped");
      a[pos++] = bucket[i];
      swaps++;
      setArray([...a]);
      const colors = createBaseColors(n);
      colors[pos - 1] = COLOR.swapping;
      setColorArray([...colors]);
      await sleep(delay);
      updateStats({ comparisons, swaps, time: 0 });
    }
  }

  markAllSorted(n, setColorArray);
  return 0;
}
