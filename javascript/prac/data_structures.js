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

LinkedList.prototype.append = function(val) {
  var newNode = new Node(val);
  this.last().nxt = newNode;
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
  if (this.store[idx]) {
    return this.store[idx].findValue(key);
  } else {
    return undefined;
  }
}
