import { COLOR, createBaseColors, sleep } from "../utils/sortingHelpers";

export async function linearSearchWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  let comparisons = 0;

  for (let i = 0; i < a.length; i++) {
    if (stopRef.current) throw new Error("Stopped");
    comparisons++;
    updateStats({ comparisons, swaps: 0, time: 0 });
    
    const colors = createBaseColors(a.length);
    colors[i] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);

    // In linear search, we don't swap elements, just compare
    // But we'll still show the comparison visually
    const compareColors = createBaseColors(a.length);
    compareColors[i] = COLOR.comparing;
    setColorArray([...compareColors]);
    await sleep(delay);
  }

  // Mark all as sorted at the end
  const finalColors = createBaseColors(a.length);
  for (let i = 0; i < a.length; i++) finalColors[i] = COLOR.sorted;
  setColorArray([...finalColors]);
  return -1; // Not found (in actual implementation, this would return index if found)
}

export const linearSearch = async (array, target, setColorArray, delay) => {
  for (let i = 0; i < array.length; i++) {
    setColorArray(prevColors => {
      const newColors = [...prevColors];
      newColors[i] = 'yellow'; // Highlight the current element being checked
      return newColors;
    });

    await new Promise(resolve => setTimeout(resolve, delay));

    if (array[i] === target) {
      setColorArray(prevColors => {
        const newColors = [...prevColors];
        newColors[i] = 'green'; // Highlight the found element
        return newColors;
      });
      return i; // Return the index of the found element
    }

    setColorArray(prevColors => {
      const newColors = [...prevColors];
      newColors[i] = 'lightgrey'; // Reset color if not found
      return newColors;
    });
  }

  return -1; // Target not found
};