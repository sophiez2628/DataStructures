//set is an abstract data type - stores unordered, unique items

//stores only integers up to but not including max
function MaxIntSet(max) {
  this.max = max;
  this.store = new Array(max);
};

MaxIntSet.prototype.insert = function(num) {
  if (this.validate(num)) {
    this.store[num] = true;
  }
};

MaxIntSet.prototype.remove = function(num) {
  if (this.validate(num)) {
    this.store[num] = false;
  }
};

MaxIntSet.prototype.include = function(num) {
  return this.store[num] ? true : false;
};

MaxIntSet.prototype.validate = function(num) {
  if (num < this.max) {
    return true;
  } else {
    return false;
  }
};
