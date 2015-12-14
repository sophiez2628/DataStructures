// head is a dummy node 
var Link = function(val) {
  this.val = val;
  this.nxt = undefined;
}

var SinglyLinkedList = function() {
  this.head = new Link();
}

// if head's val is undefined, then the list is empty

SinglyLinkedList.prototype.first = function() {
  if (this.head.nxt) {
    return this.head.nxt;
  } else {
    return "Linked List is empty.";
  }
}

SinglyLinkedList.prototype.last = function() {
  var current = this.head;
  var next = this.head.nxt;
  while (next) {
    current = next
    next = next.nxt;
  }
  return current;
}

SinglyLinkedList.prototype.empty = function() {
  if (this.head.val) {
    return false;
  } else {
    return true;
  }
}

SinglyLinkedList.prototype.insert = function(val) {
  var newLink = new Link(val);
  this.last().nxt = newLink;
}
