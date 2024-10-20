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
    const numLines = contentContainerWidth / 5;
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

 /* setTimeout(() => {
    const arrLines = document.getElementsByClassName("array-line");
    for (let i = 0; i < arrLines.length; i++) {
      arrLines[i].classList.remove("change-line-color");
      arrLines[i].classList.add("default-line-color");
    }
  }, 0);*/

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
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
    const context = useContext(SortingAlgorithmContext);
    if (context === undefined) {
      throw new Error(
        "useSortingAlgorithmContext must be used within a SortingAlgorithmProvider"
      );
    }
    return context;
};
