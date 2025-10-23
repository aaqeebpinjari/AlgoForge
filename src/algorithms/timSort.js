import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

function calcMinRun(n) {
  let r = 0;
  while (n >= 64) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
}

export async function timSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  const minRun = calcMinRun(n);
  const counters = { comparisons: 0, swaps: 0 };

  const insertionSortRange = async (left, right) => {
    for (let i = left + 1; i <= right; i++) {
      if (stopRef.current) throw new Error("Stopped");
      const key = a[i];
      let j = i - 1;
      while (j >= left && a[j] > key) {
        if (stopRef.current) throw new Error("Stopped");
        a[j + 1] = a[j];
        j--;
        counters.comparisons++;
        counters.swaps++;
        setArray([...a]);
        const colors = createBaseColors(n);
        colors[j + 1] = COLOR.swapping;
        setColorArray([...colors]);
        await sleep(delay);
        updateStats({ comparisons: counters.comparisons, swaps: counters.swaps });
      }
      a[j + 1] = key;
    }
  };

  const timMerge = async (l, m, r) => {
    if (stopRef.current) throw new Error("Stopped");
    const len1 = m - l + 1;
    const len2 = r - m;
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < len1 && j < len2) {
      if (stopRef.current) throw new Error("Stopped");
      counters.comparisons++;
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
      counters.swaps++;
      setArray([...a]);
      const colors = createBaseColors(n);
      colors[k - 1] = COLOR.comparing;
      setColorArray([...colors]);
      await sleep(delay);
      updateStats({ comparisons: counters.comparisons, swaps: counters.swaps });
    }
    while (i < len1) {
      if (stopRef.current) throw new Error("Stopped");
      a[k++] = left[i++];
      counters.swaps++;
      setArray([...a]);
      await sleep(delay);
    }
    while (j < len2) {
      if (stopRef.current) throw new Error("Stopped");
      a[k++] = right[j++];
      counters.swaps++;
      setArray([...a]);
      await sleep(delay);
    }
  };

  for (let start = 0; start < n; start += minRun) {
    if (stopRef.current) throw new Error("Stopped");
    const end = Math.min(start + minRun - 1, n - 1);
    await insertionSortRange(start, end);
  }

  let size = minRun;
  while (size < n) {
    if (stopRef.current) throw new Error("Stopped");
    for (let left = 0; left < n; left += 2 * size) {
      if (stopRef.current) throw new Error("Stopped");
      const mid = Math.min(n - 1, left + size - 1);
      const right = Math.min(n - 1, left + 2 * size - 1);
      if (mid < right) {
        await timMerge(left, mid, right);
      }
    }
    size = 2 * size;
  }

  setArray([...a]);
  markAllSorted(n, setColorArray);
  updateStats({ comparisons: counters.comparisons, swaps: counters.swaps, time: 0 });
  return 0;
}
