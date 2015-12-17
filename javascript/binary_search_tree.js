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
	//height vs depth of a tree?
	//how to find the height of a tree? find height of left and right subtree
	//counting the num of edges

	//how to find height of tree?
	//what are the sub-problems that need to be solved?
function findHeight (node) {
	var left = 0;
	var right = 0;

	if (node.left) {
		left = 1 + findHeight(node.left);
	}

	if (node.right) {
		right = 1 + findHeight(node.right);
	}

	if (left >= right) {
		return left;
	} else {
		return right;
	}
}

function checkBal (node) {

}

//validate bst



var bst = new BST(40);
bst.insert(25);
bst.insert(78);
bst.insert(10);
bst.insert(32);
bst.insert(1);

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
