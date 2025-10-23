import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function mergeSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  let comparisons = 0, swaps = 0;

  const merge = async (left, mid, right) => {
    if (stopRef.current) throw new Error("Stopped");
    const leftArr = a.slice(left, mid + 1);
    const rightArr = a.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      if (stopRef.current) throw new Error("Stopped");
      comparisons++;
      const colors = createBaseColors(a.length);
      colors[k] = COLOR.comparing;
      setColorArray([...colors]);
      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i++];
      } else {
        a[k] = rightArr[j++];
      }
      swaps++;
      setArray([...a]);
      updateStats({ comparisons, swaps, time: 0 });
      await sleep(delay);
      k++;
    }
    while (i < leftArr.length) {
      if (stopRef.current) throw new Error("Stopped");
      a[k++] = leftArr[i++];
      swaps++;
      setArray([...a]);
      await sleep(delay);
    }
    while (j < rightArr.length) {
      if (stopRef.current) throw new Error("Stopped");
      a[k++] = rightArr[j++];
      swaps++;
      setArray([...a]);
      await sleep(delay);
    }
  };

  const mergeSortHelper = async (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await mergeSortHelper(0, a.length - 1);
  markAllSorted(a.length, setColorArray);
  return 0;
}
