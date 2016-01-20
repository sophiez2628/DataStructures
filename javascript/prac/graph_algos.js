//fast version of dijkstra algo
//using priority queue map to ensure fast min look up

var fastDijkstra = function() {

}

//priority queue using min heap
var PriorityQueueMap = function(arr) {
  this.hashTable = new HashTable();
  this.minHeap = new MinHeap(arr, this.hashTable);
}

var parent = function(i) {
  if (i === 0) {
    return i;
  } else {
    return Math.floor((i - 1)/2);
  }
}

var leftChild = function(i) {
  return 2 * i + 1;
}

var rightChild = function(i) {
  return 2 * i + 2;
}

var minHeapifyUp = function(arr, i) {
  var parentIdx = parent(i);
  if (parentIdx !== i && arr[parentIdx] > arr[i]) {
    swap(arr, parentIdx, i);
    minHeapifyUp(arr, parentIdx);
  }
}

var minChild = function(arr, left, right) {
  if (arr[right][0] > arr[left][0]) {
    return left;
  } else {
    return right;
  }
}

var swap = function(arr, idx1, idx2) {
  var temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

var minHeapifyDown = function(arr, i) {
  var left = leftChild(i);
  var right = rightChild(i);
  if (arr[left] && arr[right]) {
    var min = minChild(arr, left, right);
    if (arr[i][0] > arr[min][0]) {
      swap(arr, i, min);
      minHeapifyDown(arr, min);
    }
  } else if (arr[left] || arr[right]) {
    var swapIdx = arr[left] === undefined ? right : left;
    if (arr[i][0] > arr[swapIdx][0]) {
      swap(arr, i, swapIdx);
      minHeapifyDown(arr, swapIdx);
    }
  }
}
var MinHeap = function(arr, hash) {
  //how to build heap efficiently from array input?
  //why does building from bottom work?
  this.heap = this.buildMinHeap(arr);
  this.fillHashTable(hash);
}

MinHeap.prototype.buildMinHeap = function(arr) {
  for(var i = arr.length - 1; i >= 0; i--) {
    minHeapifyDown(arr, i);
  }
  return arr;
}

MinHeap.prototype.fillHashTable = function(hash) {
  debugger;
  for(var i = 0; i < this.heap.length; i++) {
    hash.insert(this.heap[i][1], i);
  }
}


//my version of dijkstra's algorithm - greedy algorithm
//adjacency list for undirected graph
var Node = function(val) {
  this.val = val;
  this.edges = [];
}

var Edge = function(fro, to, weight) {
  this.to = to;
  this.weight = weight;
  fro.edges.push(this);
}

var a = new Node(0);
var b = new Node(1);
var c = new Node(2);
var d = new Node(3);

var edgeAB = new Edge(a, b, 2);
var edgeBA = new Edge(b, a, 2);

var edgeAC = new Edge(a, c, 1);
var edgeCA = new Edge(c, a, 1);

var edgeBC = new Edge(b, c, 0);
var edgeCB = new Edge(c, b, 0);

var edgeBD = new Edge(b, d, 3);
var edgeDB = new Edge(d, b, 3);

var edgeCD = new Edge(c, d, 1);
var edgeDC = new Edge(d, c, 1);

var shortestAllFound = function(shortest) {
  for(var i = 0; i < shortest.length; i++) {
    if (shortest[i] === undefined) {
      return true;
    }
  }
  return false;
}

var findMin = function(currentDistance, nodes) {
  var minVal;
  var minNode;
  for(var i = 0; i < currentDistance.length; i++) {
    if (currentDistance[i] !== false && (minVal === undefined || currentDistance[i] < minVal)) {
      minVal = currentDistance[i];
      minNode = nodes[i];
    }
  }
  return minNode;
}

var dijkstra = function(nodes, source) {
  var shortest = [0, undefined, undefined, undefined];
  var currentDistance = [false, Infinity, Infinity, Infinity]
  var begin = source;
  var prevWeight = 0;
  while (shortestAllFound(shortest)) {
    debugger;
    begin.edges.forEach(function(edge) {
      var node = edge.to;
      if (currentDistance[node.val] !== false && currentDistance[node.val] > edge.weight + prevWeight) {
        currentDistance[node.val] = edge.weight + prevWeight;
      }
    })
    //choose smallest
    var node = findMin(currentDistance, nodes);
    //how can i calculate min faster than linear time?
    shortest[node.val] = currentDistance[node.val];
    currentDistance[node.val] = false;
    begin = node;
    prevWeight = shortest[node.val];
  }
  return shortest;
}
