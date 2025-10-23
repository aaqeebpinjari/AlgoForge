import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

const countingSortForRadix = async (a, exp, setArray, setColorArray, delay, stopRef, updateStats, counters) => {
  const n = a.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    if (stopRef.current) throw new Error("Stopped");
    const index = Math.floor((a[i] / exp) % 10);
    count[index]++;
    counters.comparisons++;
  }

  for (let i = 1; i < 10; i++) count[i] += count[i - 1];

  for (let i = n - 1; i >= 0; i--) {
    if (stopRef.current) throw new Error("Stopped");
    const index = Math.floor((a[i] / exp) % 10);
    output[count[index] - 1] = a[i];
    count[index]--;
    counters.swaps++;
    setArray([...output.map((v, idx) => (v === 0 ? a[idx] : v))]);
    const colors = createBaseColors(n);
    colors[i] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);
    updateStats({ comparisons: counters.comparisons, swaps: counters.swaps, time: 0 });
  }

  for (let i = 0; i < n; i++) a[i] = output[i];
  setArray([...a]);
  await sleep(delay);
};

export async function radixSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  if (n === 0) return 0;

  const minVal = Math.min(...a);
  let shift = 0;
  if (minVal < 0) {
    shift = -minVal;
    for (let i = 0; i < n; i++) a[i] += shift;
  }

  let max = Math.max(...a);
  let exp = 1;
  const counters = { comparisons: 0, swaps: 0 };
  while (Math.floor(max / exp) > 0) {
    if (stopRef.current) throw new Error("Stopped");
    await countingSortForRadix(a, exp, setArray, setColorArray, delay, stopRef, updateStats, counters);
    exp *= 10;
  }

  if (shift) for (let i = 0; i < n; i++) a[i] -= shift;

  setArray([...a]);
  markAllSorted(n, setColorArray);
  updateStats({ comparisons: counters.comparisons, swaps: counters.swaps, time: 0 });
  return 0;
}
