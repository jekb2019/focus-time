export function findClosestAndBiggerNumber(
  inputNum: number,
  numArray: number[]
) {
  let closestBigger = Infinity;
  let smallest = Infinity;

  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] > inputNum && numArray[i] < closestBigger) {
      closestBigger = numArray[i];
    }
    if (numArray[i] < smallest) {
      smallest = numArray[i];
    }
  }

  return closestBigger !== Infinity ? closestBigger : smallest;
}
