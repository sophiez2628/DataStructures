//solution to parens
String.prototype.insert = function(idx, letter) {
	var arr = this.split("");
	arr[idx] = letter;
	return arr.join("");
}

var generateParens = function(count) {
	var arr = [];
	var str = "";
	addParens(arr, str, count, count, 0);
	return arr;
}

var addParens = function(arr, str, leftCount, rightCount, idx) {
	if (rightCount === 0) {
		arr.push(str);
	}

	if (leftCount > 0) {
		str = str.insert(idx, "(");
		addParens(arr, str, leftCount - 1, rightCount, idx + 1);
	}

	if (rightCount > leftCount) {
		str = str.insert(idx,")");
		addParens(arr, str, leftCount, rightCount - 1, idx + 1);
	}
}

//parens - contains duplicates though
var parens = function(n) {
	if (n === 1) {
		return ["()"]
	} else {
		var ans = parens(n - 1);
		var newParens = [];
		ans.forEach(function(item) {
			var newItem = item + " ()";
			var nextNew = "() " + item;
			newParens.push(newItem);

			if (newItem !== nextNew) {
				newParens.push(nextNew);
			}

			newParens.push("(" + item + ")");
		})
		return newParens;
	}
}
//max subarray in linear time
var maxSubArrayLinearTime = function(arr) {
	var startIdx = 0;
	var endIdx = 0;
	var currentMax = arr[startIdx];
	var runningTotal = arr[startIdx]
	for(var i = 1; i < arr.length; i++) {
		if (arr[i] > currentMax) {
			startIdx = i;
			endIdx = i;
			currentMax = arr[i];
			runningTotal = arr[i];
		} else {
			runningTotal += arr[i];
			if (runningTotal > currentMax) {
				currentMax = runningTotal;
				endIdx = i;
			}
		}
	}
	return arr.slice(startIdx, endIdx + 1);
}


//max subarray -> example of divide and conquer method
var findMidpointMaxSub = function(arr, low, mid, high) {
	//low -> mid - 1
	//mid -> high

	var leftSum = null;
	var leftIdx = null;
	var sum = 0;
	for(var i = mid - 1; i >= low; i--) {
		sum += arr[i]
		if (sum > leftSum || !leftSum) {
			leftSum = sum;
			leftIdx = i;
		}
	}

	var rightSum = null;
	var rightIdx = null;
	sum = 0
	for(var i = mid; i <= high; i++) {
		sum += arr[i];
		if (sum > rightSum || !rightSum) {
			rightSum = sum;
			rightIdx = i;
		}
	}
	//return low, high, sum
	return [leftIdx, rightIdx, leftSum + rightSum]
}

var findMaxSub = function(arr, low, high) {
	if (high - low === 0) {
		return [low, high, arr[low]];
	} else {
		var mid = Math.floor((high + low + 1) / 2);
		var left = findMaxSub(arr, low, mid - 1);
		var right = findMaxSub(arr, mid, high);
		var midSub = findMidpointMaxSub(arr, low, mid, high);

		if (left[2] > right[2] && left[2] > midSub[2]) {
			return left;
		} else if (right[2] > midSub[2] && right[2] > left[2]) {
			return right;
		} else {
			return midSub;
		}
	}
}

Array.prototype.insertionSort = function() {
	this.forEach(function(num, index) {
		for(var i = index - 1; i >= 0; i--) {
			if (num < this[i]) {
				//swap
				this[i + 1] = this[i];
				this[i] = num;
			}
		}
	}.bind(this))
	return this;
}


//permutationWithoutDups
String.prototype.splice = function(idx, insert) {
	var arrStr = this.split("");
	arrStr.splice(idx, 0, insert);
	return arrStr.join("");
}

var permutationWithoutDups = function(str, hash) {
	if (typeof hash === "undefined") {
		hash = new HashTable( );
	}

	if (str.length <= 1) {
		return [str];
	} else {
		var last = str[str.length - 1];
		var permutations = permutationWithoutDups(str.slice(0, str.length - 1), hash)
		var newPermutations = [];
		permutations.forEach(function(permutation){
			for(var i = 0; i <= permutation.length; i++) {
				var newP = permutation.splice(i, last);
				if (!hash.find(newP)) {
					newPermutations.push(newP);
					hash.insert(newP, true)
				}
			}
		})
		return newPermutations;
	}
}


//recursive multiply
var recursiveMultiply = function(num1, num2) {
	if (num1 === 0 || num2 === 0) {
		return 0;
	}

	if (num1 === 1) {
		return num2;
	} else if (num2 === 1) {
		return num1;
	}


	if (num1 > num2) {
			return num1 + recursiveMultiply(num1, num2 - 1);
	} else {
		return num2 + recursiveMultiply(num2, num1 - 1);
	}
}


//power set
var subsets = function(arr) {
	if (arr.length === 0) {
		return [[ ]];
	} else {
		var num = arr.pop();
		var subs = subsets(arr);
		var newSubs = []
		for (var i = 0; i < subs.length; i++) {
			var copy = subs[i].slice(0);
			copy.push(num);
			newSubs.push(copy);
		}
		return subs.concat(newSubs);
	}
}


//magic index

var magicIndex = function( arr, start, end) {
	if (typeof start === "undefined" && typeof end === "undefined") {
		start = 0;
		end = arr.length - 1;
}

if (arr[start] === undefined || arr[end] === undefined) {
	return false;
} else if (end - start == 0) {
return	arr[start] === start ? start : false;
}


var middle = Math.floor((end + start + 1)/ 2 );

if (middle === arr[middle]) {
	return middle;
} else if (middle > arr[middle]) {
	//look at upper half of arr
	return magicIndex(arr, middle + 1, end);
} else {
	//look at lower half
	return magicIndex(arr, start, middle - 1);
}
}

//robot
var robotGrid = [
  [true, false, true],
  [true, true, true],
  [true, false, true],
  [false, false, true]
];

var robotGrid2 = [
  [true, false, true],
  [false, true, true],
  [true, false, true],
  [false, false, true]
];

var robotGrid3 = [
  [true, true, true, true, true],
  [false, true, false, true, true],
  [true, true, true, false, false],
  [false, false, true, true, true],
  [true, false, false, true, false],
  [true, true, false, true, true]
]

var reachStart = function(end) {
  if (end[0] == 0 && end[1] == 0) {
    return true;
  } else {
    return false;
  }
}

var leftStep = function(end) {
  if (end[1] - 1 < 0) {
    return false;
  } else {
    var newEnd = [end[0], end[1] - 1];
    return newEnd;
  }
}

var upStep = function(end) {
  if (end[0] - 1 < 0) {
    return false;
  } else {
    var newEnd = [end[0] - 1, end[1]];
    return newEnd;
  }
}

var isTherePathForRobot = function(grid, end) {
  var start = [0,0];
  if (typeof end === "undefined") {
    end = [grid.length - 1, grid[0].length - 1];
  }

  var step = reachStart(end);
  if (step) {
    return true;
  }

  var left = leftStep(end);
  if (left && grid[left[0]][left[1]]) {
    if (findPathForRobot(grid, left)) {
      return true;
    }
  }

  var up = upStep(end);
  if (up && grid[up[0]][up[1]]) {
    if (findPathForRobot(grid, up)) {
      return true;
    }
  }

  return false;

};

var findPathForRobot = function(grid, end) {
  var start = [0,0];
  if (typeof end === "undefined") {
    end = [grid.length - 1, grid[0].length - 1];
  }
  var path = [];

  var step = reachStart(end);
  if (step) {
    return path;
  }

  var left = leftStep(end);
  if (left && grid[left[0]][left[1]]) {
    var value = findPathForRobot(grid, left)
    if (value) {
      value.push(left);
      return value;
    }
  }

  var up = upStep(end);
  if (up && grid[up[0]][up[1]]) {
    var value = findPathForRobot(grid, up);
    if (value) {
      value.push(up);
      return value;
    }
  }

  return false;

};

//how to stop prematurely
[1,2,3].some(function(num) {
  console.log(num);
  if (num == 2) {
    return num;
  }
})

//how to get myEach to return early

Array.prototype.myEach = function(callback) {
  for(var i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      return;
    }
  }
}

/*
palindrome permutation
*/

var palindromePermutation = function(str) {
  var sorted = str.split(" ").join("").split("").sort();
  var odd;
  if (sorted.length % 2 === 0) {
    odd = false;
  } else {
    odd = true;
  }

  var oddLetter = 0;
  var start = 0;

  for(var i = 0; i < sorted.length - 2; i++) {
    if (start === i) {
      if(sorted[i] === sorted[i + 1]) {
        start = i + 2;
      } else {
        if (odd && oddLetter == 0) {
          oddLetter = 1;
        } else {
          return false;
        }
      }
    }
  }

  return true;
}

/*
check permutation
*/
var checkPermutation = function(str1, str2) {
  var sorted1 = str1.split("").sort().join("");
  var sorted2 = str2.split("").sort().join("");
  if (sorted1 === sorted2) {
    return true;
  } else {
    return false;
  }
}

/*
  is unique
*/

var isUnique = function(str) {
  for(var i = 0; i < str.length - 2; i++) {
    for(var j = 1; j + i < str.length; j++) {
      if(str[i] == str[j + i]) {
        return false;
      }
    }
  }
  return true;
}

/*
find permutations of substr in str
*/
var populateHashTable = function(substr, hash) {
  for(var i = 0; i < substr.length; i++) {
    var idx = substr.charCodeAt(i) - 97;
    var found = hash.find(idx);
    if (found) {
      hash.insert(idx, found + 1);
    } else {
      hash.insert(idx, 1);
    }
  }

  return hash;
}

var compare = function(arr, hash) {
  for(var i = 0; i < arr.length; i++) {
    var value = arr[i];
    if (value && hash.find(i) !== value) {
      return false;
    }
  }
  return true;
}

var locations = function(substr, str) {
  var hash = new HashTable();
  var indices = [];

  hash = populateHashTable(substr, hash);

  for(var i = 0; i < str.length - substr.length; i++) {
    var arr = [];
    for(var j = 0; j < substr.length; j++) {
      var idx = str[j + i].charCodeAt(0) - 97;
      var found = hash.find(idx);
      if (found) {
        if (arr[idx]) {
          arr[idx] += 1;
        } else {
          arr[idx] = 1;
        }
      } else {
        break;
      }
    }

    if (compare(arr, hash)) {
      indices.push(i);
    }
  }

  return indices;
}

/*
print all positive integer solutions
*/
var intSolutions = function() {
  var pairs = [];
  for(var i = 1; i <= 10; i++) {
    for(var j = 1; j <= 10; j++) {
      var result = Math.pow(i, 3) + Math.pow(j, 3);
      if (pairs[result] === undefined) {
        pairs[result] = [[i, j]];
      } else {
        pairs[result].push([i,j]);
      }
    }
  }

  for(var i = 0; i < pairs.length; i++) {
    if(pairs[i] && pairs[i].length == 2) {
      console.log(pairs[i]);
    }
  }
}
/*
given an array of distinct integer values,
count the number of pairs of integers that have diff k.
*/

var countPairs = function(k, arr) {
  var hash = new HashTable();
  for(var i = 0; i < arr.length; i++) {
    hash.insert(arr[i], true);
  }

  var pairs = [];
  arr.forEach(function(num) {
    var other = num + 2;
    if (hash.find(other)) {
      pairs.push([num, other]);
    }
  })
  return pairs;
}

//check if num is prime
//sieve of eratosthenes

var eratosthenes = function(n) {
  var array = [], upperLimit = Math.sqrt(n), output = [];

  for(var i = 0; i <= n; i++) {
    array.push(true);
  }

  for(var i = 2; i <= upperLimit; i++) {
    if (array[i]) {
      for(var j = i + i; j <= n; j += i) {
        array[j] = false;
      }
    }
  }

  for(var i = 2; i <= n; i++) {
    if(array[i]) {
      output.push(i);
    }
  }

  return output;
}

var checkPrime = function(n) {
  var primes = eratosthenes(n);
  for(var i = 0; i < primes.length; i++) {
    if (primes[i] === n) {
      return true;
    } else if (n % (primes[i]) === 0) {
      return false;
    }
  }
}
//linked lists
function DoublelyLLNode(val) {
  this.val = val;
  this.prev = null;
  this.nxt = null;
}

function DoublyLinkedList() {
  this.head = new DoublelyLLNode();
  this.tail = new DoublelyLLNode();
  this.head.nxt = this.tail;
  this.tail.prev = this.head;
  this.length = 0;
}

DoublyLinkedList.prototype.append = function(val) {
  var newNode = new DoublelyLLNode(val);
  var prev = this.tail.prev;
  prev.nxt = newNode;
  newNode.prev = prev;
  newNode.nxt = this.tail;
  this.tail.prev = newNode;
  this.length++;
  return this;
}

DoublyLinkedList.prototype.insert = function(val, pos) {
  var newNode = new DoublelyLLNode(val);
  var idx = 0;
  var node = this.head.nxt;
  while (idx < pos) {
    node = node.nxt;
    idx++;
  }

  node.prev.nxt = newNode;
  newNode.prev = node.prev;
  newNode.nxt = node;
  node.prev = newNode;

  return this;
}



function Node(val) {
  this.val = val;
  this.nxt = null;
}

function LinkedList() {
  this.length = 0;
  this.head = new Node();
}

LinkedList.prototype.append = function(pair) {
	//linked lists are made up of nodes
  this.last().nxt = new Node(pair);
  this.length++;
}

LinkedList.prototype.findValue = function(key) {
  var current = this.head.nxt;
  while (current) {
    if (current.val.key === key) {
      return current.val.val;
    }
    current = current.nxt;
  }
  return undefined;
}

LinkedList.prototype.last = function() {
  var current = this.head;
  var nxt = this.head.nxt;
  while (nxt) {
    current = nxt;
    nxt = current.nxt;
  }
  return current;
}

LinkedList.prototype.removeAt = function(pos) {
  if (pos < this.length && pos >= 0) {
    var idx = 0;
    var prev = this.head;
    var node = this.head.nxt;
    while (idx < pos) {
      prev = node;
      node = node.nxt;
      idx++;
    }
    prev.nxt = node.nxt;
    this.length--;
  } else {
    console.log("Invalid position.");
  }
}

LinkedList.prototype.insert = function(val, pos) {
  var newNode = new Node(val);
  if (pos >= 0 && pos <= this.length) {
    var idx = 0;
    var prev = this.head;
    var node = this.head.nxt;
    while (idx < pos) {
      prev = node;
      node = node.nxt;
      idx++;
    }
    prev.nxt = newNode;
    newNode.nxt = node;
    this.length++;
  } else {
    console.log("Invalid position.");
  }
}

//hash table
function ValuePair(key, val) {
  this.val = val;
  this.key = key;
}

function HashTable() {
  this.store = [];
  this.length = 10;
}

HashTable.prototype.findIndex = function(key) {
  var hash = 5381;
  var stringKey = String(key);
  for(var i = 0; i < stringKey.length; i++) {
    hash = hash * 33 + stringKey.charCodeAt(i);
    i++;
  }
  return hash % this.length;
}

HashTable.prototype.insert = function(key, val) {
  var idx = this.findIndex(key);
	console.log(idx);
  var loc = this.store[idx];
  var pair = new ValuePair(key, val);
  if (loc) {
    loc.append(pair);
  } else {
    this.store[idx] = new LinkedList();
    this.store[idx].append(pair);
  }
  return this;
}

HashTable.prototype.find = function(key) {
  var idx = this.findIndex(key);
	console.log(idx);
  if (this.store[idx]) {
    return this.store[idx].findValue(key);
  } else {
    return undefined;
  }
}
