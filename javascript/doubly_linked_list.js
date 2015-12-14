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
