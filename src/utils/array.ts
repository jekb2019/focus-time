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

export function changeElementIndex(
  arr: any[],
  oldIndex: number,
  newIndex: number
) {
  if (newIndex >= arr.length) {
    var k = newIndex - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}
