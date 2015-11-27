function MinHeap(arr) {
  this.arr = [];
  arr.forEach(function(num) {
    this.insert(num);
  }.bind(this));
}

MinHeap.prototype.parentPos = function(childPos) {
  return Math.floor((childPos - 1) / 2);
}

MinHeap.prototype.childrenPos = function(parentPos) {
  return [parentPos * 2 + 1, parentPos * 2 + 2];
}

MinHeap.prototype.insert = function(val) {
  this.arr.push(val);
  if (this.arr.length > 1) {
    this.heapifyUp(this.arr.length - 1);
  }
}
//heapifyUp is a recursive method
MinHeap.prototype.heapifyUp = function(childPos) {
  if (childPos == 0) {
    return this.arr;
  }
  parentPos = this.parentPos(childPos);
  if (this.arr[parentPos] <= this.arr[childPos]) {
    return this.arr;
  } else {
    var temp = this.arr[parentPos];
    this.arr[parentPos] = this.arr[childPos];
    this.arr[childPos] = temp;
    return this.heapifyUp(parentPos);
  }
}

MinHeap.prototype.min = function() {
  return this.arr[0];
}
