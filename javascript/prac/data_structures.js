
//max subarray linear time for all negative values?


//animal shelter

//dfs iterative vs recursive




//build order
// topoBuildOrder(["a", "b", "c", "d", "e", "f"],
// 							 [["d", "a"], ["b","f"], ["d","b"], ["a", "f"], ["c", "d"]]);

var searchFor = function(dependencies, hash, item) {
	for(var i = 0; i < dependencies.length; i++) {
		if (dependencies[i][0] === item && hash.find(dependencies[i][1]) === undefined) {
			return dependencies[i][1];
		}
	}
	return undefined;
}

var dfsForBuildOrder = function(projects, dependencies) {
	debugger;
	var visited = new HashTable();
	var stack = [projects[0]];
	var order = [];
	for(var i = 1; i < projects.length; i++) {
		while (stack.length > 0) {
			var found = searchFor(dependencies, visited, stack[stack.length - 1]);
			if (found) {
				stack.push(found);
			} else {
				visited.insert(stack[stack.length - 1], true);
				order.push(stack[stack.length - 1]);
				stack.pop();
			}
		}

		if (visited.find(projects[i]) === undefined) {
			stack.push(projects[i]);
		}
	}

	return order;
}

var topoBuildOrder = function(projects, dependencies) {
	return dfsForBuildOrder(projects, dependencies);
}
//sort stack - merge sort or quicksort on a stack
var StackV = function() {
	this.store = [];
}

StackV.prototype.push = function(val) {
	this.store.push(val);
	return this;
}

StackV.prototype.pop = function() {
	return this.store.pop();
}

StackV.prototype.peekTop = function() {
	return this.store[this.store.length - 1];
}

var mergeHelper = function(stackOne, stackTwo) {
	debugger;
	var newStack = new StackV();
	while (stackOne.store.length > 0 && stackTwo.store.length > 0) {
		if (stackOne.peekTop() < stackTwo.peekTop()) {
			var val = stackOne.pop();
			newStack.push(val);
		} else {
			var val = stackTwo.pop();
			newStack.push(val);
		}
	}

	while (stackOne.store.length > 0) {
		newStack.push(stackOne.pop());
	}

	while (stackTwo.store.length > 0) {
		newStack.push(stackTwo.pop());
	}

	while (newStack.store.length > 0) {
		stackTwo.push(newStack.pop());
	}
	return stackTwo;
}

StackV.prototype.mergeSort = function() {
	if (this.store.length > 1) {
		var mid = Math.floor((this.store.length) / 2);
		var stackOne = new StackV();
		var stackTwo = new StackV();
		var length = this.store.length;
		for(var i = 0; i < length; i++) {
			var val = this.pop();
			if (i < mid) {
				stackOne.push(val);
			} else {
				stackTwo.push(val);
			}
		}
		return mergeHelper(stackOne.mergeSort(), stackTwo.mergeSort());
	} else {
		return this;
	}
}



//quicksort again
var swap = function(arr, idx1, idx2) {
	var temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp;
}
var partition = function(arr, start, end) {
	var pivot = arr[end];
	var i = start - 1;
	for(var j = start; j < end; j++) {
		if (arr[i] <= pivot) {
			i += 1;
			swap(arr, i, j);
			}
	}
	swap(arr, i + 1, end);
	return i + 1;
}
var quicksort = function(arr, start, end) {
	//ideally divides arr in half
	if (end > start) {
		var idx = partition(arr, start, end);
		quicksort(arr, start, idx - 1);
		quicksort(arr, idx + 1, end);
	}
	return arr;
}
//implement queue via stacks
var MyQueue = function() {

}
//set of stacks
var SetOfStacks = function() {
	this.store = [[]];
	//refers to idx
	this.stacks = 0;
}

SetOfStacks.prototype.push = function(val) {
	//max 3 items
	if (this.store[this.stacks].length > 2) {
		var newStack = [val];
		this.store.push(newStack);
		this.stacks += 1;
	} else {
		this.store[this.stacks].push(val);
	}
}

SetOfStacks.prototype.pop = function() {
	this.store[this.stacks].pop();
	if (this.store[this.stacks].length === 0) {
		this.store.pop();
		this.stacks -= 1;
	}
}

//stack min
var Stack = function() {
	this.store = [];
	this.minStore = [];
}

Stack.prototype.push = function(val) {
	this.store.push(val);
	if (this.minStore.length === 0) {
		this.minStore.push(val);
	} else {
		var lastIdx = this.minStore.length - 1;
		if (this.minStore[lastIdx] > val) {
			this.minStore.push(val);
		} else {
			this.minStore.push(this.minStore[lastIdx]);
		}
	}
}

Stack.prototype.pop = function(val) {
	this.store.pop();
	this.minStore.pop();
}

Stack.prototype.min = function() {
	return this.minStore[this.minStore.length - 1];
}

//time and space complexity?

//max subarray linear time
var maxContiguousSum = function(arr) {
	var bestSum = null;
	var currentSum = 0;
	var bestStartIdx = null;
	var bestEndIdx = null;
	for(var i = 0; i < arr.length; i++) {
		currentSum += arr[i];

		if (arr[i] > currentSum || bestEndIdx === null) {
			bestStartIdx = i;
			bestEndIdx = i;
			bestSum = arr[i];
			currentSum = arr[i];
		} else if (bestSum === null || currentSum > bestSum) {
			bestSum = currentSum;
			bestEndIdx = i;
		}
	}
	return arr.slice(bestStartIdx, bestEndIdx + 1);
}

//letters and numbers
var test = ["e","d", "a", 3, "z", 1, 2, "b", "c", "d"];
var subArray = function(arr) {
	var max = 0;
	var maxS;
	var maxE;
	for(var start = 0; start < arr.length; start++) {
		var num = 0;
		var letter = 0;
		for(var end = start; end < arr.length; end++) {
			if (typeof arr[end] === "string") {
				letter += 1;
			} else {
				num += 1;
			}

			if (letter === num && num > max) {
				max = num;
				maxS = start;
				maxE = end;
			}
		}
	}

	if (max > 0) {
		return arr.slice(maxS, maxE + 1);
	} else {
		return undefined;
	}
}
//shuffle array
var shuffle = function(arr) {
	for(var i = 0; i < arr.length; i++) {
		var idx = Math.floor(Math.random() * arr.length);
		var temp = arr[i];
		arr[i] = arr[idx];
		arr[idx] = temp;
	}
	return arr;
}

//random set
var randomSet = function(arr, setSize) {
	var set = [];
	while (true) {
			var idx = Math.floor(Math.random() * setSize);
			if (arr[idx]) {
				set.push(arr[idx]);
				arr[idx] = undefined;
			}
			if (set.length == setSize) {
				return set;
			}
	}
}

//sorted search for matrix
var matrix = [[1,2,3],[4,5,6],[7,8,9]];
var bSearch = function(input, start, end, val) {
	debugger;
	if (end >= start) {
		var mid = Math.floor((start + end) / 2);
		var compareVal;
		if (Array.isArray(input[0])) {
			//search array
			compareVal = input[mid][0];
		} else {
			compareVal = input[mid];
		}
		if (compareVal === val) {
			return mid;
		} else if (val > compareVal) {
			return bSearch(input, mid + 1, end, val);
		} else {
			return bSearch(input, start, mid - 1, val);
		}
	} else {
		return undefined;
	}
}
var sortedMatrixSearch = function(matrix, val) {
	var mid = Math.floor(matrix.length / 2);
	debugger;
	var ans = bSearch(matrix, 0, mid, val) || bSearch(matrix, mid + 1, matrix.length - 1, val);

	if (ans) {
		return ans;
	} else {
		//perform search on columns
		if (val < mid) {
			var start = 0;
			var end = mid;
		} else {
			var start = mid + 1;
			var end = matrix.length;
		}

		for(var i = start; i < end; i++) {
			var val = bSearch(matrix[i], 1, matrix[i].length - 1, val);
			if (val) {
				return val;
			}
		}
	}
	return undefined;
}

//what happens to binary search if there are duplicates?
	//look after or before to check

//search in rotated array
var rotationIdx = function(arr) {
	for(var i = 1; i < arr.length; i++) {
		if (arr[i] < arr[0]) {
			return i;
		}
	}
}

var binarySearch = function(arr, val, start, end) {
	if (end >= start) {
		var mid = Math.floor((start + end)/2);
		if (arr[mid] === val) {
			return mid;
		} else if (arr[mid] > val) {
			return binarySearch(arr, val, start, mid - 1);
		} else {
			return binarySearch(arr, val, mid + 1, end);
		}
	} else {
		return undefined;
	}
}

var binarySearchForRotated = function(arr, val) {
	var idx = rotationIdx(arr);
	return binarySearch(arr, val, 0, idx - 1) || binarySearch(arr, val, idx, arr.length - 1);
}

//first count the number of times the letter appears
//and put information into an array

String.prototype.sort = function() {
	return this.split("").sort().join("");
}

var swap = function(arr, idx, j) {
	var temp = arr[idx];
	arr[idx] = arr[j];
	arr[j] = temp;
}

var groupAnagram = function(arr) {
	var idx = 0;
	while (idx < arr.length - 1) {
		for(var i = idx + 1; i < arr.length; i++) {
			var sortedStr = arr[i].sort();
			if (sortedStr === arr[idx].sort()) {
				idx += 1;
				swap(arr, idx, i);
			}
		}
		idx += 1;
	}
	return arr;
}

//permutations of a string without duplicates?
	//possibly a visited table

//setting timers
var printDate = function() {
	debugger;
	console.log(new Date());
	timer = setTimeout(printDate, 1000);
}

// var timer = setTimeout(printDate, 1000);

//radix sort - works well on fixed length strings as well
	//use ten buckets to sort 0 - 9
	//pad numbers if necessary so that all numbers have the same digits

var radixSort = function(arr) {
	var holder = [0,0,0,0,0,0,0,0,0];
	for(var place = (arr[0] + "").length - 1; place >= 0; place--) {
		for(var i = 0; i < arr.length; i++) {
			var strVersion = arr[i] + "";
			holder[Number(strVersion[place])] += 1;
		}
	}

	var sortedArr = [];
	for(var i = 0; i < holder.length; i++) {
		for(var j = 0; j < holder[i]; j++) {
			sortedArr.push(i);
		}
	}
	return sortedArr;
}
//bucket sort


//quicksort - nonrandomized version
var quickSort = function(arr, startIdx, endIdx) {
	if (startIdx < endIdx) {
		var midIdx = partition(arr, startIdx, endIdx);
		quickSort(arr, startIdx, midIdx - 1);
		quickSort(arr, midIdx + 1, endIdx);
	}
	return arr;
}


var partition = function(arr, startIdx, pivotIdx) {
	//after each parition, pivot is at correct place
	var pivotValue = arr[pivotIdx];
	var i = startIdx - 1;
	for(var j = startIdx; j < pivotIdx; j++) {
		if (arr[j] <= pivotValue) {
			i += 1;
			swap(arr, i, j);
		}
	}
	swap(arr, pivotIdx, i + 1)
	return i + 1;
}
//build two heaps to find a median

//heap data structure & heapsort (worst case n log n, in place)
var MinHeap = function(arr) {
	this.store = arr;
	this.heapSize = arr.length;
}
var MaxHeap = function(arr) {
	this.store = arr;
	this.heapSize = arr.length;
	this.buildMaxHeap();
}

var heapSort = function(maxHeap) {
	for(var i = 1; i < maxHeap.store.length; i++) {
		swap(maxHeap.store, 0, maxHeap.heapSize - 1);
		maxHeap.heapSize -= 1;
		maxHeapify(maxHeap, 0);
	}
}

var leftChild = function(idx) {
	return 2 * idx + 1;
}

var rightChild = function(idx) {
	return 2 * idx + 2;
}

var findMaxIdx = function(heap, idx) {
	//figure out the biggest of the three
	var leftIdx = leftChild(idx);
	var rightIdx = rightChild(idx);
	var largestIdx;
	if (leftIdx < heap.heapSize && heap.store[leftIdx] > heap.store[idx]) {
		//if leftIdx does not exist, no need to check
		largestIdx = leftIdx
	} else {
		largestIdx = idx;
	}

	if (rightIdx < heap.heapSize && heap.store[rightIdx] > heap.store[largestIdx]) {
		largestIdx = rightIdx;
	}

	return largestIdx;
}

var swap = function(arr, idx1, idx2) {
	var temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp;
}
var maxHeapify = function(heap, idx) {
	//push element down
	var maxIdx = findMaxIdx(heap, idx);
	if (maxIdx && maxIdx !== idx) {
		//swap
		swap(heap.store, idx, maxIdx);
		return maxHeapify(heap, maxIdx);
	}
	return heap.store;
}

MaxHeap.prototype.buildMaxHeap = function() {
	for(var i = this.store.length - 1; i >= 0; i--) {
		maxHeapify(this,i);
	}
}

// minCost
var small = [[1, 5],
						[4, 8]];

var grid = [[1, 5, 0],
						[4, 8, 2],
						[1, 5, 3]];
//time complexity with memoization?
var minCost = function(arr, start, end, memo) {
	if (typeof memo === "undefined") {
		memo = [[],[],[]];
	}
	if (!(start[0] < arr.length) || !(start[1] < arr[0].length)) {
		return Infinity;
	} else if (start[0] == end[0] && start[1] == end[1]) {
		return arr[end[0]][end[1]];
	} else if (memo[start[0]][start[1]]) {
		return memo[start[0]][start[1]];
	} {
		var valStart = arr[start[0]][start[1]];
		var rightMove = [start[0],start[1] + 1];
		var downMove = [start[0] + 1, start[1]];
		var diagonalMove = [start[0] + 1, start[1] + 1];
		var min = Math.min(valStart + minCost(arr, rightMove, end, memo),
						 valStart + minCost(arr, downMove, end, memo),
					 	 valStart + minCost(arr, diagonalMove, end, memo));
		memo[start[0]][start[1]] = min;
		console.log(memo);
		return min;
	}
}


/*selling wine*/
//recursive solution - time complexity 2^N
var wineProfit = function(arr, leftIdx, rightIdx, day) {
  if (typeof day === "undefined") {
    day = 1;
  }
  if (leftIdx === rightIdx) {
    return arr[leftIdx] * arr.length;
  } else {
    return Math.max(day * arr[rightIdx] + wineProfit(arr, leftIdx, rightIdx - 1, day + 1),
    day * arr[leftIdx] + wineProfit(arr, leftIdx + 1, rightIdx, day + 1));
  }
}

//paint fill
var image = [[1, 1, 1, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1, 0, 0],
	            [1, 0, 0, 1, 1, 0, 1, 1],
	            [1, 2, 2, 2, 2, 0, 1, 0],
	            [1, 1, 1, 2, 2, 0, 1, 0],
	            [1, 1, 1, 2, 2, 2, 2, 0],
	            [1, 1, 1, 1, 1, 2, 1, 1],
	            [1, 1, 1, 1, 1, 2, 2, 1],
	            ];
var findPoint = function(arr, point, val) {
	var newPoint = [point[0] + val[0], point[1] + val[1]];
	if (newPoint[0] < arr.length && newPoint[1] < arr[0].length) {
		return newPoint;
	} else {
		return false;
	}
}

CONSTANTS = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]
var paintFill = function(arr, point, newColor, prevColor) {
	var currentColor = arr[point[0]][point[1]];
	if (typeof prevColor === "undefined") {
		prevColor = currentColor;
	}

	if (prevColor === currentColor && currentColor !== newColor) {
		arr[point[0]][point[1]] = newColor;
		CONSTANTS.forEach(function(val) {
			var newPoint = findPoint(arr, point, val);
			if (newPoint) {
				paintFill(arr, newPoint, newColor, prevColor);
			}
		})
	}
	return arr;
}

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
