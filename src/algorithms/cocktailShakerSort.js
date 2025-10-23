import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function cocktailShakerSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  const counts = { comparisons: 0, swaps: 0 };

  let start = 0;
  let end = n - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // 🔸 Forward Pass
    for (let i = start; i < end; i++) {
      if (stopRef.current) throw new Error("Stopped");

      const colors = createBaseColors(n);
      colors[i] = COLOR.comparing;
      colors[i + 1] = COLOR.comparing;
      setColorArray([...colors]);
      await sleep(delay);

      counts.comparisons++;
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        counts.swaps++;
        swapped = true;
      }

      setArray([...a]);
      updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
    }

    const colorsAfterForward = createBaseColors(n);
    colorsAfterForward[end] = COLOR.sorted;
    setColorArray([...colorsAfterForward]);
    await sleep(delay);

    end--;
    if (!swapped) break;
    swapped = false;

    // 🔸 Backward Pass
    for (let i = end; i > start; i--) {
      if (stopRef.current) throw new Error("Stopped");

      const colors = createBaseColors(n);
      colors[i] = COLOR.comparing;
      colors[i - 1] = COLOR.comparing;
      setColorArray([...colors]);
      await sleep(delay);

      counts.comparisons++;
      if (a[i - 1] > a[i]) {
        [a[i - 1], a[i]] = [a[i], a[i - 1]];
        counts.swaps++;
        swapped = true;
      }

      setArray([...a]);
      updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
    }

    const colorsAfterBackward = createBaseColors(n);
    colorsAfterBackward[start] = COLOR.sorted;
    setColorArray([...colorsAfterBackward]);
    await sleep(delay);

    start++;
  }

  markAllSorted(n, setColorArray);
  updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
  return 0;
}
