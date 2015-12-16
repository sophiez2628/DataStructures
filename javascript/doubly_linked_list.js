// head and tail are dummy nodes

var Link = function(val) {
  this.val = val;
  this.nxt = undefined;
  this.prev = undefined;
}

var DoublyLinkedList = function() {
  this.head = new Link();
  this.tail = new Link();
  this.head.nxt = this.tail;
  this.tail.prev = this.head;
}

// can easily check if linked list is empty
DoublyLinkedList.prototype.empty = function() {
  if (this.head.nxt === this.tail) {
    return true;
  } else {
    return false;
  }
}

DoublyLinkedList.prototype.insert = function(val) {
  var newLink = new Link(val);
  this.tail.prev.nxt = newLink;
  newLink.prev = this.tail.prev;
  this.tail.prev = newLink;
  newLink.nxt = this.tail;

  return newLink;
}

DoublyLinkedList.prototype.removeFirst = function() {
  var removed = this.head.nxt;
  this.head.nxt = removed.nxt;
  removed.nxt.prev = this.head;

  return removed;
}

//build queue using doubly linked list
var Queue = function() {
  this.store = new DoublyLinkedList();
}

Queue.prototype.enqueue = function(val) {
  this.store.insert(val);
}

Queue.prototype.dequeue = function() {
  return this.store.removeFirst();
}

Queue.prototype.empty = function() {
  return this.store.empty();
}

//implement bfs using queue, so that runtime is linear
//graph given is an adjacency matrix

//{} is not the same as a hash table in javascript
var graph = [
  [0,1,0,1],
  [0,0,1,0],
  [1,0,0,1],
  [0,0,0,0]
];

var bfs = function(graph, src, target) {
  var visited = {};
  var q = new Queue();
  q.enqueue(src);
  while (q.empty() === false) {
    var node = q.dequeue();
    console.log(node);
    if (node.val === target) {
      return node.val;
    };

    for(var i = 0; i < graph[src].length; i++) {
      if (visited[i] === undefined && graph[node.val][i] === 1) {
        debugger;
        q.enqueue(i);
      }
    }
    visited[node.val] = true;
  }
  return "Target not found";
}

var dfs = function(graph, src, visited, order) {
  if (typeof visited === "undefined") {
    var visited = {};
  }

  if (typeof order === "undefined") {
    var order = [];
  }
  console.log(src);
  visited[src] = true;
  for(var i = 0; i < graph[src].length; i++) {
    if(graph[src][i] === 1 && !visited[i]) {
      dfs(graph, i, visited, order);
    }
  }
  order.unshift(src);
  return order;
}

// topological sort using dfs
var graph = [
  [0,0,1,1,1,0,0,0],
  [0,0,1,0,0,1,1,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,1],
  [0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

//how to keep track of incoming and outcoming edges for linear time complexity?
var toposort = function(graph) {
  return dfs(graph, 0);
}
