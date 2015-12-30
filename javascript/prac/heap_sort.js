//heap sort time complexity is O(n(log n)) and space complexity is O(1)
Array.prototype.heapSort = function() {
  if (this.length < 2) {
    return this;
  } else {
    this.heapify();
    this.unheapify();
    return this;
  }
}

Array.prototype.heapify = function() {
  //iterative solution
  this.forEach(function(num, index){
    //for each executes a provided function once per array element
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

Array.prototype.unheapify = function() {
  var heapSize = this.length;
  this.forEach(function(num, index) {
    var lastItemIdx = heapSize - index - 1;
    if (lastItemIdx != 0) {
      //swap max, the first item, and last item; heapSize one less now
      this.swap(0, lastItemIdx);
      var parentPos = 0;
      while (parentPos < lastItemIdx - 1) {
        childrenPos = this.childrenPos(parentPos, lastItemIdx - 1);
        if (childrenPos.length == 0) {
          break;
        }
        var maxChild = this.maxChildren(childrenPos);
        if (this[maxChild] > this[parentPos]) {
          this.swap(maxChild, parentPos);
          parentPos = maxChild;
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

Array.prototype.maxChildren = function(childrenPos) {
  if (childrenPos.length == 1) {
    return childrenPos[0];
  }

  if (this[childrenPos[0]] >= this[childrenPos[1]]) {
    return childrenPos[0];
  } else {
    return childrenPos[1];
  }
}

Array.prototype.childrenPos = function(parentPos, lastItemIdx) {
  childrenPos = [];
  if (parentPos * 2 + 1 <= lastItemIdx) {
    childrenPos.push(parentPos * 2 + 1);
  }

  if (parentPos * 2 + 2 <= lastItemIdx) {
    childrenPos.push(parentPos * 2 + 2);
  }
  return childrenPos;
}
