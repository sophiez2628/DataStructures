Array.prototype.heapSort = function() {
  if (this.length < 2) {
    return this;
  } else {
    this.heapify();
    this.unheapify();
    return this;
  }
}

Array.prototype.parentPos = function(childPos) {
  return Math.floor((childPos - 1) / 2);
}

Array.prototype.childrenPos = function(parentPos) {
  childrenPos = [];
  if (parentPos * 2 + 1 <= this.arr.length - 1) {
    childrenPos.push(parentPos * 2 + 1);
  }

  if (parentPos * 2 + 2 <= this.arr.length - 1) {
    childrenPos.push(parentPos * 2 + 2);
  }
  return childrenPos;
}
