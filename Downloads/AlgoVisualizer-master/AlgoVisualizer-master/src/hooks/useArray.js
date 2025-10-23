import { useState } from 'react';

export const useArray = (initialArray) => {
    const [array, setArray] = useState(initialArray);

    const generateRandomArray = (length, maxValue) => {
        const randomArray = Array.from({ length }, () => Math.floor(Math.random() * maxValue));
        setArray(randomArray);
    };

    return { array, setArray, generateRandomArray };
};
