var maxSubArr = function(arr) {
  var bestSum;
  var currentSum = 0;
  var startIdx;
  var endIdx;
  for(var i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    if (bestSum === undefined || arr[i] > currentSum) {
      if (bestSum === undefined || arr[i] >= 0 ||(arr[i] < 0 && arr[i] > bestSum)) {
        bestSum = arr[i];
        currentSum = arr[i];
        startIdx = i;
        endIdx = i;
      }
    } else if (currentSum > bestSum) {
      endIdx = i;
    }
  }
  return arr.slice(startIdx, endIdx + 1);
}
