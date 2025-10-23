/* eslint-disable no-loop-func */
export const jumpSearch = async (array, target, setColorArray, delay) => {
    const n = array.length;
    const step = Math.floor(Math.sqrt(n)); // Set step size
    let prev = 0; // Use let so it can be changed
    let currentStep = step; // Define currentStep with let

    while (array[Math.min(currentStep, n) - 1] < target) {
        setColorArray(prevColors => {
            const newColors = [...prevColors];
            for (let i = prev; i < Math.min(currentStep, n); i++) {
                newColors[i] = 'lightgrey'; // Color the checked block
            }
            return newColors;
        });

        await new Promise(resolve => setTimeout(resolve, delay)); // Wait for a moment

        prev = currentStep; // Move previous to current step
        currentStep += step; // Update currentStep

        if (prev >= n) {
            return -1; // Target not found
        }
    }

    while (array[prev] < target) {
        setColorArray(prevColors => {
            const newColors = [...prevColors];
            newColors[prev] = 'yellow'; // Highlight current element
            return newColors;
        });

        await new Promise(resolve => setTimeout(resolve, delay)); // Wait for a moment

        prev++; // Move to the next index

        if (prev === Math.min(currentStep, n)) {
            return -1; // Target not found
        }
    }

    if (array[prev] === target) {
        setColorArray(prevColors => {
            const newColors = [...prevColors];
            newColors[prev] = 'green'; // Highlight found element
            return newColors;
        });
        return prev; // Return index of found element
    }

    return -1; // Target not found
};
