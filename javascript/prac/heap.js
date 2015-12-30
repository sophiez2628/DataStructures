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
  if (parentPos * 2 + 1 <= this.arr.length - 1) {
    childrenPos.push(parentPos * 2 + 1);
  }

  if (parentPos * 2 + 2 <= this.arr.length - 1) {
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

MinHeap.prototype.swap = function(pos1, pos2) {
  var temp = this.arr[pos1];
  this.arr[pos1] = this.arr[pos2];
  this.arr[pos2] = temp;
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
    this.swap(parentPos, childPos);
    return this.heapifyUp(parentPos);
  }
}

MinHeap.prototype.min = function() {
  return this.arr[0];
}

MinHeap.prototype.minChildren = function(childrenPos) {
  if (childrenPos.length == 1) {
    return childrenPos[0];
  }
  
  if (this.arr[childrenPos[0]] <= this.arr[childrenPos[1]]) {
    return childrenPos[0];
  } else {
    return childrenPos[1];
  }
}

MinHeap.prototype.heapifyDown = function(parentPos) {
  //3 cases: no children, 1 child, 2 children
  childrenPos = this.childrenPos(parentPos);
  if (childrenPos.length == 0) {
    return this.arr;
  }
  minChildPos = this.minChildren(childrenPos);
  debugger;
  if (this.arr[minChildPos] < this.arr[parentPos]) {
    this.swap(minChildPos, parentPos);
    return this.heapifyDown(minChildPos);
  }

  return this.arr;
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
  return this.arr;
}
