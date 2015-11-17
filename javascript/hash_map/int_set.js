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

//keeps track of an arbitrary range of integers
Array.prototype.insertEmptyArr = function(num_buckets) {
  for (var i = 0; i < num_buckets; i++) {
    this[i] = new Array(1);
  }
};

function IntSet(num_buckets) {
  this.num_buckets = num_buckets;
  this.store = new Array(num_buckets);
  this.store.insertEmptyArr(num_buckets);
};
