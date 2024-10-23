"use client";

import {
  generateRandomNumberFromInterval,
  MAX_ANIMATION_SPEED,
} from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";

const SortingAlgorithmContext = createContext(undefined);

export const SortingAlgorithmProvider = ({ children }) => {
  const [array, setArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(MAX_ANIMATION_SPEED / 2);
  const requiresReset = isAnimationComplete || isSorting; 
  const [activeIndexes, setActiveIndexes] = useState([]);

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
    setActiveIndexes([]);
  };

 /* const highestId = setTimeout(() => {
    for (let i = highestId; i >= 0; i--) {
      clearInterval(i);
    }
  }, 0);*/


  const value = {
    array,
    setArray,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    resetArrayAndAnimation,
    requiresReset,
    activeIndexes, 
    setActiveIndexes,
    setIsAnimationComplete,
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
