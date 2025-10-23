import { COLOR, createBaseColors, sleep } from "../utils/sortingHelpers";

export async function binarySearchWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  let comparisons = 0;
  let left = 0;
  let right = a.length - 1;

  while (left <= right) {
    if (stopRef.current) throw new Error("Stopped");
    
    const mid = Math.floor((left + right) / 2);
    comparisons++;
    updateStats({ comparisons, swaps: 0, time: 0 });
    
    // Highlight the middle element
    const colors = createBaseColors(a.length);
    colors[mid] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);

    // In a real implementation, we would compare with target here
    // For visualization purposes, we'll just show the process
    const compareColors = createBaseColors(a.length);
    compareColors[mid] = COLOR.comparing;
    setColorArray([...compareColors]);
    await sleep(delay);
    
    // Move to next iteration (in real implementation, this would depend on comparison)
    left = mid + 1; // Just for visualization flow
  }

  // Mark all as sorted at the end
  const finalColors = createBaseColors(a.length);
  for (let i = 0; i < a.length; i++) finalColors[i] = COLOR.sorted;
  setColorArray([...finalColors]);
  return -1; // Not found (in actual implementation, this would return index if found)
}

export const binarySearch = async (array, target, setColorArray, delay) => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    setColorArray(prevColors => {
      const newColors = [...prevColors];
      newColors[mid] = 'yellow'; // Highlight the middle element
      return newColors;
    });

    await new Promise(resolve => setTimeout(resolve, delay));

    if (array[mid] === target) {
      setColorArray(prevColors => {
        const newColors = [...prevColors];
        newColors[mid] = 'green'; // Target found
        return newColors;
      });
      return mid;
    } else if (array[mid] < target) {
      setColorArray(prevColors => {
        const newColors = [...prevColors];
        newColors[mid] = 'lightgrey'; // Reset color if not found
        return newColors;
      });
      left = mid + 1;
    } else {
      setColorArray(prevColors => {
        const newColors = [...prevColors];
        newColors[mid] = 'lightgrey'; // Reset color if not found
        return newColors;
      });
      right = mid - 1;
    }
  }

  return -1; // Target not found
};