//merge sort
Array.prototype.mergeSort = function() {
  var left, right;
  if (this.length == 1) {
    return this;
  } else if (this.length == 2) {
    left = [this[0]];
    right = [this[1]];
  } else {
    var mid = Math.floor(this.length / 2);
    //slice method returns a shallow copy
    //slice extracts up to but not including end
    left = this.slice(0, mid);
    right = this.slice(mid);
  }
  return this.mergeHelper(left.mergeSort(), right.mergeSort());
}

Array.prototype.mergeHelper = function(left, right) {
  var sorted = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      sorted.push(right.shift());
    } else {
      sorted.push(left.shift());
    }
  }
  sorted = sorted.concat(left);
  sorted = sorted.concat(right);
  return sorted;
}
