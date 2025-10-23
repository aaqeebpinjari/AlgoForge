import { COLOR, createBaseColors, markAllSorted, sleep } from "../utils/sortingHelpers";

export async function strandSortWithStop(arr, setArray, setColorArray, delay, stopRef, updateStats) {
  const a = [...arr];
  const n = a.length;
  const counts = { comparisons: 0, swaps: 0 };
  
  const result = [];
  const inputList = [...a];

  const extractStrand = async (list, colors) => {
    if (list.length === 0) return [];
    
    const strand = [list[0]];
    colors[0] = COLOR.comparing;
    setColorArray([...colors]);
    await sleep(delay);
    
    const remaining = [];
    
    for (let i = 1; i < list.length; i++) {
      if (stopRef.current) throw new Error("Stopped");
      
      counts.comparisons++;
      colors[i] = COLOR.comparing;
      setColorArray([...colors]);
      await sleep(delay);
      
      if (list[i] >= strand[strand.length - 1]) {
        strand.push(list[i]);
        colors[i] = COLOR.swapping;
      } else {
        remaining.push(list[i]);
        colors[i] = COLOR.default;
      }
      
      setColorArray([...colors]);
      updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
    }
    
    return { strand, remaining };
  };

  const merge = async (list1, list2) => {
    const merged = [];
    let i = 0, j = 0;
    
    while (i < list1.length && j < list2.length) {
      if (stopRef.current) throw new Error("Stopped");
      
      counts.comparisons++;
      
      if (list1[i] <= list2[j]) {
        merged.push(list1[i]);
        i++;
      } else {
        merged.push(list2[j]);
        j++;
      }
      
      updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
    }
    
    while (i < list1.length) {
      merged.push(list1[i]);
      i++;
    }
    
    while (j < list2.length) {
      merged.push(list2[j]);
      j++;
    }
    
    return merged;
  };

  while (inputList.length > 0) {
    if (stopRef.current) throw new Error("Stopped");
    
    const colors = createBaseColors(n);
    const { strand, remaining } = await extractStrand(inputList, colors);
    
    // Visualize the extracted strand
    for (let i = 0; i < strand.length; i++) {
      colors[result.length + i] = COLOR.sorted;
    }
    setColorArray([...colors]);
    await sleep(delay);
    
    // Merge strand into result
    const prevResult = [...result];
    const mergedResult = await merge(result, strand);
    result.length = 0;
    result.push(...mergedResult);
    
    counts.swaps++;
    setArray([...result, ...remaining]);
    updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
    
    // Update colors to show merged portion
    const mergeColors = createBaseColors(n);
    for (let i = 0; i < result.length; i++) {
      mergeColors[i] = COLOR.sorted;
    }
    for (let i = result.length; i < n; i++) {
      mergeColors[i] = COLOR.default;
    }
    setColorArray([...mergeColors]);
    await sleep(delay);
    
    // Update input list
    inputList.length = 0;
    inputList.push(...remaining);
  }

  setArray([...result]);
  markAllSorted(n, setColorArray);
  updateStats({ comparisons: counts.comparisons, swaps: counts.swaps, time: 0 });
  
  return 0;
}