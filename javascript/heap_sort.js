Array.prototype.heapSort = function() {
  if (this.length < 2) {
    return this;
  } else {
    this.heapify();
    // this.unheapify();
    return this;
  }
}

Array.prototype.heapify = function() {
  //iterative solution
  this.forEach(function(num, index){
    //for each executes a provided function once per array element
    var lastItem = index;
    //maintain a max heap
    if (index != 0) {
      var childPos = index;
      while (childPos > 0) {
        var parentPos = this.parentPos(childPos);
        if (this[childPos] > this[parentPos]) {
          this.swap(childPos, parentPos);
          childPos = parentPos;
        } else {
          break;
        }
      }
    }
  }.bind(this))
}

Array.prototype.swap = function(pos1, pos2) {
  var temp = this[pos1];
  this[pos1] = this[pos2];
  this[pos2] = temp;
}

Array.prototype.parentPos = function(childPos) {
  return Math.floor((childPos - 1) / 2);
}

Array.prototype.childrenPos = function(parentPos) {
  childrenPos = [];
  if (parentPos * 2 + 1 <= this.length - 1) {
    childrenPos.push(parentPos * 2 + 1);
  }

  if (parentPos * 2 + 2 <= this.length - 1) {
    childrenPos.push(parentPos * 2 + 2);
  }
  return childrenPos;
}
