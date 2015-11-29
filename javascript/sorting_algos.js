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

//how to find the median of a stream of integers? build min and max heap
//store numbers greater than median to min heap, numbers smaller than median to max heap

//quicksort
Array.prototype.quickSort = function() {
  var sorted = []
  if (this.length < 2) {
    return this;
  } else {
    this.swap(0, Math.floor(Math.random() * (this.length - 1)));
    var pivotIdx = this.partition();
    sorted = this.slice(0,pivotIdx).quickSort().concat([this[pivotIdx]]);
    return sorted.concat(this.slice(pivotIdx + 1).quickSort());
  }
}

Array.prototype.partition = function() {
  var pivotIdx = 0;
  for(var i = 1; i < this.length; i++) {
    if (this[i] < this[pivotIdx]) {
      if (i == pivotIdx + 1) {
        this.swap(i, pivotIdx);
        pivotIdx = i;
      } else {
        this.swap(i, pivotIdx + 1);
        this.swap(pivotIdx, pivotIdx + 1);
        pivotIdx = pivotIdx + 1;
      }
    }
  }
  return pivotIdx;
}

Array.prototype.swap = function(pos1, pos2) {
  var temp = this[pos1];
  this[pos1] = this[pos2];
  this[pos2] = temp;
}
