"use client";

import { Select } from "@/Components/Select";
import { Slider } from "@/Components/Slider";
import { useSortingAlgorithmContext } from "./VisualizerContext";
import { sortingAlgorithmsData } from "@/lib/utils";
import { useEffect } from "react";

export default function Home() {
  const {
    array,
    isSorting,
    setAnimationSpeed,
    animationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requiresReset,
    resetArrayAndAnimation,
  } = useSortingAlgorithmContext();

  const handleStart = () => {
    
  };

  useEffect(() => {
    if (requiresReset) {
      resetArrayAndAnimation(); // Reset array if required
    }
  }, [requiresReset, resetArrayAndAnimation]);

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
              <Select value={selectedAlgorithm} disabled={isSorting} onChange={(e)=>setSelectedAlgorithm(e.target.value)}/>
              <button onClick={handleStart} disabled={isSorting}>Start</button>
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
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {array.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
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
