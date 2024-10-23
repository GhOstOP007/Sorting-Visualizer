/*import { delay } from "@/lib/utils";

export const runBubbleSort = async (array,animationSpeed,setIsSorting,setActiveIndexes,setArray,setIsAnimationComplete) => {
  const inverseSpeed = (1/animationSpeed) * 200;
  setIsSorting(true);
  const arr = [...array];
  const n = arr.length;
  for (let i = 0; i < n ; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setActiveIndexes([j, j + 1]); 
      if (arr[j] > arr[j + 1]) {          
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        setActiveIndexes([j, j + 1]);
      }
      await delay(inverseSpeed);
    }
  }
  setActiveIndexes([]);
  setIsAnimationComplete(true);
  setIsSorting(false);
};*/