"use client";

import { Select } from "@/Components/Select";
import { Slider } from "@/Components/Slider";
import { useSortingAlgorithmContext } from "./VisualizerContext";
import { delay, sortingAlgorithmsData } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    array,
    isSorting,
    setIsSorting,
    setArray,
    setAnimationSpeed,
    animationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requiresReset,
    setActiveIndexes,
    activeIndexes,
    resetArrayAndAnimation,
    isAnimationComplete,
    setIsAnimationComplete,
  } = useSortingAlgorithmContext();

  const inverseSpeed = (1 / animationSpeed) * 500;  

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const runMergeSort = async () => {
  setIsSorting(true);
  const arr = [...array];
  await mergeSort(arr, 0, arr.length - 1);
  setActiveIndexes([]);
  setIsAnimationComplete(true);
  setIsSorting(false);
};

const mergeSort = async (arr, left, right) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  }
};

const merge = async (arr, left, mid, right) => {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    setActiveIndexes([left + i, mid + 1 + j]);
    await delay(inverseSpeed);

    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
    setArray([...arr]);
  }

  while (i < n1) {
    setActiveIndexes([left + i]);
    await delay(inverseSpeed);
    arr[k] = L[i];
    i++;
    k++;
    setArray([...arr]);
  }

  while (j < n2) {
    setActiveIndexes([mid + 1 + j]);
    await delay(inverseSpeed);
    arr[k] = R[j];
    j++;
    k++;
    setArray([...arr]);
  }
};

const runQuickSort = async () => {
  setIsSorting(true);
  const arr = [...array];
  await quickSort(arr, 0, arr.length - 1);
  setActiveIndexes([]);
  setIsAnimationComplete(true);
  setIsSorting(false);
};

const quickSort = async (arr, low, high) => {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
};

const partition = async (arr, low, high) => {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    setActiveIndexes([j, high]);
    await delay(inverseSpeed);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setArray([...arr]);
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  setArray([...arr]);
  return i + 1;
};

const runBubbleSort = async () => {
  setIsSorting(true);
  const arr = [...array];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setActiveIndexes([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
      }
      await delay(inverseSpeed);
    }
  }
  setActiveIndexes([]);
  setIsAnimationComplete(true);
  setIsSorting(false);
};

const runSelectionSort = async () => {
  setIsSorting(true);
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      setActiveIndexes([j, minIndex]);
      await delay(inverseSpeed);

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
    }
  }

  setActiveIndexes([]);
  setIsAnimationComplete(true);
  setIsSorting(false);
};

const runInsertionSort = async () => {
  setIsSorting(true);
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i]; 
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      setActiveIndexes([j, i]);
      await delay(inverseSpeed);

      arr[j + 1] = arr[j];
      setArray([...arr]);
      j--;
    }
    arr[j + 1] = key;
    setArray([...arr]);
  }

  setActiveIndexes([]);
  setIsAnimationComplete(true);
  setIsSorting(false);
};


  const handleStart = () => {
    if (requiresReset) {
      resetArrayAndAnimation();
      const highestId = setTimeout(() => {
        for (let i = highestId; i >= 0; i--) {
          clearInterval(i);
        }
      }, 0);
      return;
    }

    switch (selectedAlgorithm) {
      case "bubble":
        runBubbleSort();
        break;
        case "merge":
        runMergeSort();
        break;
      case "quick":
        runQuickSort();
        break;
      case "insertion":
        runInsertionSort();
        break;
      case "selection":
        runSelectionSort();
        break;
      default:
        break;
    }
  };

  return (
    <main className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4"
        >
          <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-gray-300 text-2xl poppins-semibold hidden md:flex">
              Sorting Visualizer
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Slider
                isDisabled={isSorting}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(e.target.value)}
              />
              <Select
                value={selectedAlgorithm}
                disabled={isSorting}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
              />
              <div className="font-sans text-sm tracking-widest uppercase text-[#2363a2] cursor-pointer border-3 border-[#2363a2] px-2 py-1 shadow-[1px_1px_0px_0px,2px_2px_0px_0px,3px_3px_0px_0px,4px_4px_0px_0px,5px_5px_0px_0px] relative select-none active:shadow-none active:top-[5px] active:left-[5px] md:px-3">
                <button
                  className="flex items-center justify-center disabled:cursor-not-allowed"
                  disabled={isSorting}
                  onClick={handleStart}
                >
                  {requiresReset ? <span>Reset</span> : <span>Start</span>}
                </button>
              </div>
            </div>
            <div className="hidden sm:flex absolute top-[120%] left-0 w-full">
              <div className="flex w-full text-gray-400 p-4 rounded border border-system-purple20 bg-system-purple80 bg-opacity-10 gap-6">
                <div className="flex flex-col items-start justify-start w-3/4">
                  <h3 className="text-lg">
                    {sortingAlgorithmsData[selectedAlgorithm].title}
                  </h3>
                  <p className="text-sm text-grey-500 pt-2">
                    {sortingAlgorithmsData[selectedAlgorithm].definition}
                  </p>
                </div>

                <div className="flex flex-col items-start justify-start w-1/4 gap-2">
                  <h3 className="text-lg">Time Complexity</h3>
                  <div className="flex flex-col gap-2">
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Worst Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].worst_case}
                      </span>
                    </p>
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Average Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].average_case}
                      </span>
                    </p>
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Best Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].best_case}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Array part*/}
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {array.map((value, index) => (
                <div
                  key={index}
                  className={`relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg ${
                    activeIndexes.includes(index)
                      ? "bg-orange-500"
                      : isAnimationComplete
                      ? "bg-green-500"
                      : "bg-blue-500" // Sorted tower
                  }`}
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
