"use client";

import {
  generateRandomNumberFromInterval,
  MAX_ANIMATION_SPEED,
} from "@/lib/utils";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const SortingAlgorithmContext = createContext(undefined);

export const SortingAlgorithmProvider = ({ children }) => {
  const [array, setArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(MAX_ANIMATION_SPEED / 2);
  const requiresReset = isAnimationComplete || isSorting; 

  useEffect(() => {
    resetArrayAndAnimation();
    window.addEventListener("resize", resetArrayAndAnimation);

    return () => {
      window.removeEventListener("resize", resetArrayAndAnimation);
    };
  }, []);

  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");

    if (!contentContainer) return;

    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray = [];
    const numLines = contentContainerWidth / 8;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);

    for (let i = 0; i < numLines; i++) {
      tempArray.push(generateRandomNumberFromInterval(100, maxLineHeight));
    }

    setArray(tempArray);
    setIsSorting(false);
    setIsAnimationComplete(false);
  };

  const highestId = setTimeout(() => {
    for (let i = highestId; i >= 0; i--) {
      clearInterval(i);
    }
  }, 0);

  setTimeout(() => {
    const arrLines = document.querySelectorAll(".array-line");
    for (let i = 0; i < arrLines.length; i++) {
      arrLines[i].classList.remove("change-line-color");
      arrLines[i].classList.add("default-line-color");
    }
  }, 0);


  const runAnimation = (animations) => {
    setIsSorting(true);

    const inverseSpeed = (1 / animationSpeed) * 200;
    
    const arrLines = document.getElementsByClassName("array-line");
  
    const updateClassList = (indexes, addClassName, removeClassName) => {
      indexes.forEach((index) => {
        arrLines[index].classList.add(addClassName);
        arrLines[index].classList.remove(removeClassName);
      });
    };
  
    const updateHeightValue = (lineIndex, newHeight) => {
      if (newHeight !== undefined) {
        arrLines[lineIndex].style.height = `${newHeight}px`;
      }
    };
  
    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [lineIndexes, isSwap] = animation;
        
        if (!isSwap) {
          updateClassList(lineIndexes, "change-line-color", "default-line-color");
  
          setTimeout(() => {
            updateClassList(lineIndexes, "default-line-color", "change-line-color");
          }, inverseSpeed);
        } else {
          const [lineIndex, newHeight] = lineIndexes;
          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
      console.log(animation);
    });
  
    // Timeout for the final animation step
    const finalTimeout = animations.length * inverseSpeed;
    setTimeout(() => {
     /* Array.from(arrLines).forEach((line) => {
        line.classList.add("pulse-animation", "change-line-color");
        line.classList.remove("default-line-color");
      });*/
  
      // Reset the state after the final pulse
      setTimeout(() => {
       /* Array.from(arrLines).forEach((line) => {
          line.classList.remove("pulse-animation", "change-line-color");
          line.classList.add("default-line-color");
        });*/
  
        // Mark sorting as complete
        setIsSorting(false);
        setIsAnimationComplete(true);
      }, 1000); // Duration for the final pulse
    }, finalTimeout+1000);
  };
  

  const value = {
    array,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    resetArrayAndAnimation,
    requiresReset,
    runAnimation,
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
    const context = useContext(SortingAlgorithmContext);
    if (!context) {
      throw new Error(
        "useSortingAlgorithmContext must be used within a SortingAlgorithmProvider"
      );
    }
    return context;
};
