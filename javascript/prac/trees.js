//longest substring
var removeChar = function(twoUniqueChars, str, idx) {
  var keep = str[idx];
  debugger;
  if (twoUniqueChars[0] === keep) {
    twoUniqueChars.splice(1, 1);
  } else {
    twoUniqueChars.splice(0,1);
  }
}

Array.prototype.doesInclude = function(char) {
  for(var i = 0; i < this.length; i++) {
    if (this[i] === char) {
      return true;
    }
  }
  return false;
}

var longestSub = function(str) {
  //use hash map to track where it first appears
  var hash = {};
  var maxStartIdx;
  var maxEndIdx;
  var startIdx;
  var endIdx;
  var twoUniqueChars = [];

  str.split("").forEach(function(char, idx) {
    if (twoUniqueChars.length === 0) {
      startIdx = idx;
    }

    if (twoUniqueChars.doesInclude(char)) {
      endIdx = idx;
    } else if (twoUniqueChars.length === 2) {
      //keep idx - 1
      removeChar(twoUniqueChars, str, idx - 1);
      twoUniqueChars.push(char);
      hash[char] = idx;
      if (maxStartIdx === undefined || (maxEndIdx - maxStartIdx) < (endIdx - startIdx)) {
        maxEndIdx = endIdx;
        maxStartIdx = startIdx;
      }
      startIdx = hash[str[idx - 1]];
      endIdx = idx;
    } else if (twoUniqueChars.length < 2) {
      twoUniqueChars.push(char);
      endIdx = idx;
      hash[char] = idx;
    }
  })

  if ((maxEndIdx - maxStartIdx) < (endIdx - startIdx)) {
    maxEndIdx = endIdx;
    maxStartIdx = startIdx;
  }
  return str.slice(maxStartIdx, maxEndIdx + 1);
}


//trapping rain water O(N)
var maxVolume = function(arr) {
  var maxSeenLeft = [];
  var maxSeenRight = [];

  for(var i = 0; i < arr.length; i++) {
    if (i == 0) {
      maxSeenLeft.push(arr[i]);
    } else {
      maxSeenLeft.push(Math.max(maxSeenLeft[i - 1], arr[i]));
    }
  }

  for(var i = arr.length - 1; i >= 0; i--) {
    if ( i == arr.length - 1) {
      maxSeenRight.push(arr[i]);
    } else {
      maxSeenRight.unshift(Math.max(maxSeenRight[0], arr[i]));
    }
  }
  console.log(maxSeenLeft);
  console.log(maxSeenRight);

  var totalVol = 0;
  for(var i = 0; i < arr.length; i++) {
    totalVol += Math.min(maxSeenLeft[i], maxSeenRight[i]) - arr[i];
  }
  return totalVol;
}


//trapping rain water O(N^2)
var searchForSide = function(arr, i) {
  var sideHeight = 0;
  var sideIdx;
  for(var j = i + 1; j < arr.length; j++) {
    if (arr[j] > sideHeight) {
      sideHeight = arr[j];
      sideIdx = j;
    }

    if (sideHeight >= arr[i]) {
      return sideIdx;
    }
  }
  return sideIdx;
}

var calculateVol = function(arr, i, sideIdx) {
  //height is smaller of the two
  if (sideIdx === undefined) {
    return 0;
  }
  var height;
  if (arr[i] > arr[sideIdx]) {
    height = arr[sideIdx];
  } else {
    height = arr[i];
  }
  var width = sideIdx - i - 1;
  var volume = height * width;
  for(var j = i + 1; j < sideIdx; j++) {
    volume -= arr[j] * 1;
  }
  return volume;
}

var waterVolume = function(arr) {
  var totalVol = 0;
  var i = 0;
  while (i < arr.length) {
    if (arr[i] > 0) {
      var sideIdx = searchForSide(arr, i);
      totalVol += calculateVol(arr, i, sideIdx);
    }

    if (sideIdx === undefined) {
      i++;
    } else {
      i = sideIdx;
    }
  }

  return totalVol;
}

//binary tree traversal
var getTrees = function(arr, start, end) {
  var trees = [];
  debugger;
  if (start > end) {
    trees.push(null);
    return trees;
  }
  //use each node as a root
  for(var i = start; i <= end; i++) {
    var leftTrees = getTrees(arr, start, i - 1)
    var rightTrees = getTrees(arr, i + 1, end);

    for(var l = 0; l < leftTrees.length; l++) {
      for(var r = 0; r < rightTrees.length; r++) {
        debugger;
        var node = new Node(arr[i], rightTrees[r], leftTrees[l]);
        trees.push(node);
      }
    }
  }
  return trees;
}

var runGetTrees = function(arr, start, end) {
  var results = getTrees(arr, start, end);
  for(var i = 0; i < results.length; i++) {
    preOrderTraversal(results[i]);
    console.log(" ");
  }
}

//construct binary tree from inorder and pre-order/post-order traversal
var findIdx = function(inOrder, root) {
  for(var i = 0; i < inOrder.length; i++) {
    if (root == inOrder[i]) {
      return i;
    }
  }
}

var preOrder = [7,10,4,3,1,2,8,11];
var inOrder = [4,10,3,1,7,11,8,2];

var constructBT = function(preOrder, inOrder) {
  console.log(inOrder);
  debugger;
  if (inOrder.length === 0) {
    return undefined;
  }
  var root = preOrder.shift();
  var node = new Node(root);
  if (inOrder.length > 1) {
    var idx = findIdx(inOrder, root);
    node.left = constructBT(preOrder, inOrder.slice(0, idx));
    node.right = constructBT(preOrder, inOrder.slice(idx + 1));
  }
  return node;
}

var Node = function(val, right, left) {
  this.val = val;
  this.right = right;
  this.left = left;
}

var ninetyTwo = new Node(92);
var sixtyFour = new Node(64);
var seventyOne = new Node(71, undefined, sixtyFour);
var eightyNine = new Node(89, ninetyTwo, seventyOne);
var thirtySeven = new Node(37);
var fourtyFour = new Node(44, undefined, thirtySeven);
var one = new Node(1);
var thirteen = new Node(13, undefined, one);
var twentySeven = new Node(27, fourtyFour, thirteen);
var fiftyFour = new Node(54, eightyNine, twentySeven);

var preOrderTraversal = function(node) {
  if (node) {
    console.log(node.val);
    preOrderTraversal(node.left);
    preOrderTraversal(node.right);
  }
}
//
// var inOrder = function(node) {
//   if (node) {
//     inOrder(node.left);
//     console.log(node.val);
//     inOrder(node.right);
//   }
// }
//
// var postOrder = function(node) {
//   if (node) {
//     postOrder(node.left);
//     postOrder(node.right);
//     console.log(node);
//   }
// }
