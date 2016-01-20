//connected components?

//find median using heaps?


//implemented using a min priority queue
//dijkstra's algo returns path
var MinHeap = function() {
  this.store = [];
  //purpose of hash is to find node fast in heap
  this.hash = {};
}

MinHeap.prototype.find = function(val) {
  var idx = this.hash[val];
  return this.store[idx];
}

MinHeap.prototype.insert = function(heapObj) {
  this.store.push(heapObj);
  this.hash[heapObj[1].val] = this.store.length - 1;
  this.heapifyUp(this.store.length - 1);
}

var parentIdx = function(idx) {
  if (idx === 0) {
    return undefined;
  } else {
    return Math.floor((idx - 1) / 2);
  }
}

var childrenIdx = function(idx) {
  return [2 * idx + 1, 2 * idx + 2];
}

var swap = function(arr, idx1, idx2) {
  var temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}


MinHeap.prototype.heapifyUp = function(idx) {
  var parent = parentIdx(idx);
  if (typeof parent === "number" && (this.store[parent][0] > this.store[idx][0])) {
    swap(this.store, idx, parent);
    this.hash[this.store[parent][1].val] = parent;
    this.hash[this.store[idx][1].val] = idx;
    this.heapifyUp(parent);
  }
}

var findMinChildIdx = function(arr, children) {
  if (arr[children[0]] && arr[children[1]]) {
    if (arr[children[0]][0] > arr[children[1]][0]) {
      return children[1];
    } else {
      return children[0];
    }
  } else if (arr[children[0]] || arr[children[1]]) {
    return typeof arr[children[0]] === "object" ? children[0] : children[1];
  } else {
    return undefined;
  }
}

MinHeap.prototype.heapifyDown = function(idx) {
  var children = childrenIdx(idx);
  var minChildIdx = findMinChildIdx(this.store, children);
  if (minChildIdx !== undefined && this.store[minChildIdx][0] < this.store[idx][0]) {
    swap(this.store, minChildIdx, idx);
    this.hash[this.store[minChildIdx][1].val] = minChildIdx;
    this.hash[this.store[idx][1].val] = idx;
    this.heapifyDown(minChildIdx);
  }
}

MinHeap.prototype.extractMin = function() {
  var min = this.store[0];
  this.hash[min[1].val] = undefined;

  var last = this.store.pop();
  if (this.store.length > 0) {
    this.store[0] = last;
    this.hash[last[1].val] = 0;
    this.heapifyDown(0);
  }
  return min;
}



var MinPriorityQueue = function() {
  //create minHeap based on distance
  this.minHeap = new MinHeap();
}

MinPriorityQueue.prototype.insert = function(node, dis) {
  this.minHeap.insert([dis, node]);
}

MinPriorityQueue.prototype.extractMin = function() {
  return this.minHeap.extractMin();
}


MinPriorityQueue.prototype.length = function() {
  return this.minHeap.store.length;
}

MinPriorityQueue.prototype.find = function(val) {
  return this.minHeap.find(val);
}

var Node = function(val) {
  this.val = val;
  this.outEdges = [];
  this.prev = null;
}

var Edge = function(fro, to, weight) {
  this.from = fro;
  this.to = to;
  this.weight = weight;
  this.from.outEdges.push(this);
}
var dijkstra = function(source) {
  var explored = {};
  var frontier = new MinPriorityQueue();
  frontier.insert(source, 0);

  while (frontier.length() > 0) {
    var min = frontier.extractMin();
    var minNode = min[1];
    var minDist = min[0];

    explored[minNode.val] = minDist;
    minNode.outEdges.forEach(function(edge) {
      var node = edge.to;
      var distance = explored[minNode.val] + edge.weight;
      //find index of the node in the frontier/queue in order to return distance
      var priorityQueueObj = frontier.find(node.val);
      if (priorityQueueObj && (priorityQueueObj[0] > distance))  {
        priorityQueueObj[0] = distance;
        node.prev = minNode.val;
      } else if (priorityQueueObj === undefined) {
        frontier.insert(node, distance);
        node.prev = minNode.val;
      }
    })

  }
  return explored;
}

var s = new Node("s");
var t = new Node("t");
var y = new Node("y");
var x = new Node("x");
var z = new Node("z");

var st = new Edge(s, t, 5);
var sy = new Edge(s, y, 2);
var yt = new Edge(y, t, 1);
var tx = new Edge(t, x, 8);
var yx = new Edge(y, x, 2);
var yz = new Edge(y, z, 10);
var xz = new Edge(x, z, 1);

// var min = new MinHeap();
// min.insert([0, s]);
// min.insert([1, t]);
// min.insert([2, y]);
// min.insert([3, x]);
// min.insert([4, z]);
