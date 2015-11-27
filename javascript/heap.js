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
  childrenPos = [];
  if (parentPos * 2 + 1 < this.arr.length - 1) {
    childrenPos.push(parentPos * 2 + 1);
  }

  if (parentPos * 2 + 2 < this.arr.length - 1) {
    childrenPos.push(parentPos * 2 + 2);
  }
  return childrenPos;
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

MinHeap.prototype.heapifyDown = function(parentPos) {
  childrenPos = this.childrenPos(parentPos);
  if (childrenPos.length == 1) {
    this.swap(childrenPos, parentPos);
    this.heapifyDown(childrenPos);
  } else {
    return this.arr;
  }
}

MinHeap.prototype.popMin = function() {
  min = this.arr[0];
  if (this.arr <= 1) {
    return min;
  } else {
    tail = this.arr.pop();
    this.arr[0] = tail;

    if (this.arr.length > 1) {
      this.heapifyDown(0);
    }
  }
}
