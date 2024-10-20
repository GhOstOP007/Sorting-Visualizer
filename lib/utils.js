export const sortingAlgorithmsData = {
    bubble: {
      title: "Bubble Sort",
      definition: "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process repeats until the list is sorted.",
      best_case: "O(n)",
      average_case: "O(n^2)",
      worst_case: "O(n^2)"
    },
  
    merge: {
      title: "Merge Sort",
      definition: "Merge Sort is a divide-and-conquer algorithm. It divides the array into two halves, recursively sorts them, and then merges the sorted halves.",
      best_case: "O(n log n)",
      average_case: "O(n log n)",
      worst_case: "O(n log n)"
    },
  
    quick: {
      title: "Quick Sort",
      definition: "Quick Sort is a highly efficient sorting algorithm that uses a divide-and-conquer approach. It selects a 'pivot' element and partitions the array around the pivot such that elements less than the pivot come before it, and those greater come after it. It then recursively sorts the subarrays.",
      best_case: "O(n log n)",
      average_case: "O(n log n)",
      worst_case: "O(n^2)"
    },
  
    selection: {
      title: "Selection Sort",
      definition: "Selection Sort is an in-place comparison-based algorithm. It repeatedly finds the minimum element from the unsorted portion and swaps it with the first unsorted element.",
      best_case: "O(n^2)",
      average_case: "O(n^2)",
      worst_case: "O(n^2)"
    },
  
    insertion: {
      title: "Insertion Sort",
      definition: "Insertion Sort is a simple sorting algorithm that builds the sorted array one element at a time. It takes one element from the input data and inserts it into its correct position in the sorted part.",
      best_case: "O(n)",
      average_case: "O(n^2)",
      worst_case: "O(n^2)"
    }
  }

export const MNI_ANIMATION_SPEED = 100;
export const MAX_ANIMATION_SPEED = 400;
  
export function generateRandomNumberFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const algorithmOptions = [
  { label: "Bubble", value: "bubble" },
  { label: "Quick", value: "quick" },
  { label: "Merge", value: "merge" },
  { label: "Insertion", value: "insertion" },
  { label: "Selection", value: "selection" },
];