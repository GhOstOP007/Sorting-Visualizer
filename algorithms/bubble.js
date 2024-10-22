function runBubbleSort(array, animations) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([[j, j + 1], false]);
      if (array[j] > array[j + 1]) {
        animations.push([[j, array[j + 1]], true]);
        animations.push([[j + 1, array[j]], true]);
        // Swap the values in the array
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
}

export function generateBubbleSortAnimationArray(
  isSorting,
  array,
  runAnimation
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations = [];
  const auxiliaryArray = array.slice();
  runBubbleSort(auxiliaryArray, animations);
  runAnimation(animations);
}
