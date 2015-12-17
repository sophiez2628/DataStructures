// how to leave properties undefined?
// can javascript handle empty returns? yes

var BSTNode = function(val) {
	this.val = val;
	this.right = undefined;
	this.left = undefined;
}

var BST = function(root) {
	this.root = new BSTNode(root);
}

BST.prototype.insert = function(val, node) {
	if (typeof node === "undefined") {
		node = this.root;
  }

  if (node.val > val) {
  	if (typeof node.left === "undefined") {
  		node.left = new BSTNode(val);
  		return;
    }
    this.insert(val, node.left);
  } else {
	   if (typeof node.right === "undefined") {
		  node.right = new BSTNode(val);
      return;
    }
    this.insert(val, node.right);
  }
}

function minTree (array, tree) {
  if (array.length === 0) {
  	return;
  }

	var idx = Math.floor(array.length / 2);

	if (typeof tree === "undefined") {
    debugger;
		tree = new BST(array[idx]);
  } else {
	   tree.insert(array[idx]);
  }
    minTree(array.slice(0, idx), tree);
		minTree(array.slice(idx + 1), tree);
    return tree;

}

//implement a func to check if bt is balanced


//validate bst

	//height vs depth of a tree?

var bst = new BST(40);
bst.insert(25);
bst.insert(78);
bst.insert(10);
bst.insert(32);

//pre order traversal
	//each node is processed before any nodes in its subtrees
function preOrder (node) {
	console.log(node);

	if (node.left) {
		preOrder(node.left);
	}

	if (node.right) {
		preOrder(node.right);
	}
}
//post order traversal
	//each node is processed after all nodes in both its subtrees
function postOrder (node) {
	if (node.left) {
		postOrder(node.left);
	}

	if (node.right) {
		postOrder(node.right);
	}

	console.log(node);
}

//in order traversal
