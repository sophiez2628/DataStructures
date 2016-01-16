

//adjacency list for undirected graph
// var Node = function(val) {
//   this.val = val;
//   this.children = [];
//   this.visited = false;
// }
//
// one = new Node(1);
// two = new Node(2);
// three = new Node(3);
// four = new Node(4);
// five = new Node(5);
// six = new Node(6);
// seven = new Node(7);
// eight = new Node(8);
// nine = new Node(9);
//
// one.children = [two, five];
// two.children = [one, three];
// three.children = [two, four];
// four.children = [three];
// five.children = [one, six, nine];
// six.children = [five, seven, eight];
// seven.children = [six];
// eight.children = [six];
// nine.children = [five];

//binary tree
var Node = function(val) {
  this.val = val;
  this.children = [];
}

one = new Node(1);
two = new Node(2);
three = new Node(3);
four = new Node(4);
five = new Node(5);
six = new Node(6);
seven = new Node(7);
eight = new Node(8);
nine = new Node(9);

one.children = [two, five];
two.children = [three];
three.children = [four];
four.children = [];
five.children = [six, nine];
six.children = [seven, eight];
seven.children = [];
eight.children = [];
nine.children = [];
//dfs for two items
var dfsExist = function(item, node1, node2, arr) {
  if (typeof arr === "undefined") {
    arr = [];
  }
  if (item === node1 || item === node2) {
    arr.push(1);
  }
  item.children.forEach(function(child) {
    dfsExist(child, node1, node2, arr);
  })

  if (arr.length === 2) {
    return true;
  } else {
    return false;
  }
}

//first common ancestor

var firstCommonAncestor = function(parentNode, node1, node2) {
  var mostRecentAncestor;
  var queue = [parentNode];
  while (queue.length > 0) {
    var item = queue.shift();
    var result = dfsExist(item, node1, node2);
    if (result) {
      mostRecentAncestor = item;
    }
    item.children.forEach(function(child) {
      queue.push(child);
    })
  }

  return mostRecentAncestor;
}

var dfs = function(parentNode) {
  //visited = has seen node
  parentNode.visited = true;
  console.log(parentNode.val);
  parentNode.children.forEach(function(child) {
    if (child.visited == false) {
      dfs(child);
    }
  })
}

//what happens when you don't mark them as visited? then infinite loop
var bfs = function(parentNode) {
  var queue = [parentNode];
  while (queue.length > 0) {
    var item = queue.shift();
    item.visited = true;
    console.log(item);
    item.children.forEach(function(child) {
      if (child.visited == false) {
        queue.push(child);
      }
    })
  }
}

var uniquePathsCountDP = function(m, n) {
  //make 2D matrix for grid m x n

  var matrix = [];
  for(var i = 0; i < m; i++) {
    matrix.push([]);
  }

  //fill up last row with 1
  for(var i = 0; i < n - 1; i++) {
    matrix[m - 1][i] = 1;
  }

  //fill up last column with 1
  for(var i = 0; i < m - 1; i++) {
    matrix[i][n - 1] = 1;
  }

  for(var r = m - 2; r >= 0; r--) {
    for(var c = n - 2; c >= 0; c--) {
      matrix[r][c] = matrix[r + 1][c] + matrix[r][c + 1];
    }
  }

  return matrix;
}

// Here we create an object representing the date of Christmas, 2001
// The variable xmas contains a reference to the object, not the object itself
var xmas = new Date(2001, 11, 25);

// When we copy by reference, we get a new reference to the original object
var solstice = xmas;  // Both variables now refer to the same object value

// Here we change the object through our new reference to it
solstice.setDate(21);

// The change is visible through the original reference, as well
xmas.getDate( );  // Returns 21, not the original value of 25

// The same is true when objects and arrays are passed to functions.
// The following function adds a value to each element of an array.
// A reference to the array is passed to the function, not a copy of the array.
// Therefore, the function can change the contents of the array through
// the reference, and those changes will be visible when the function returns.
function add_to_totals(totals, x)
{
    totals[0] = totals[0] + x;
    totals[1] = totals[1] + x;
    totals[2] = totals[2] + x;
}

// Finally, we'll examine comparison by reference.
// When we compare the two variables defined above, we find they are
// equal, because they refer to the same object, even though we were trying
// to make them refer to different dates:
(xmas == solstice)  // Evaluates to true

// The two variables defined next refer to two distinct objects, both
// of which represent exactly the same date.
var xmas = new Date(2001, 11, 25);
var solstice_plus_4 = new Date(2001, 11, 25);

// But, by the rules of "compare by reference," distinct objects are not equal!
(xmas != solstice_plus_4)  // Evaluates to true



// First we illustrate copying by value
var n = 1;  // Variable n holds the value 1
var m = n;  // Copy by value: variable m holds a distinct value 1

// Here's a function we'll use to illustrate passing by value
// As we'll see, the function doesn't work the way we'd like it to
function add_to_total(total, x)
{
    total = total + x;  // This line changes only the internal copy of total
}

// Now call the function, passing the numbers contained in n and m by value.
// The value of n is copied, and that copied value is named total within the
// function. The function adds a copy of m to that copy of n. But adding
// something to a copy of n doesn't affect the original value of n outside
// of the function. So calling this function doesn't accomplish anything.
add_to_total(n, m);

// Now, we'll look at comparison by value.
// In the following line of code, the literal 1 is clearly a distinct numeric
// value encoded in the program. We compare it to the value held in variable
// n. In comparison by value, the bytes of the two numbers are checked to
// see if they are the same.
if (n == 1) m = 2;  // n contains the same value as the literal 1; m is now 2


//how do references work in js?

function changeParam(x, y, z) {
  //new reference to original object
  x = 3;
  y = "new string";
  z["key2"] = "new";
  z["key3"] = "newer";
  //assigning z a new reference
  z = {"new" : "object"};
}
var a = 1,
    b = "something",
    c = {"key1" : "whatever", "key2" : "original value"};

// at this point a is still 1
// b is still "something"
// c still points to the same object but its properties have been updated
// so it is now {"key1" : "whatever", "key2" : "new", "key3" : "newer"}
// c definitely doesn't point to the new object created as the last line
// of the function with z = ...




var add = function(arr) {
  arr.push(1);
}
var la = function(arr) {
  if (typeof arr === "undefined") {
    arr = [];
  }
  add(arr);
  return arr;
}

var addOne = function(num) {
  return num = num + 1;
}
var hi = function(num) {
  if (typeof num === "undefined") {
    num = 0;
  }

  addOne(num);

  return num;


}

//robot on a grid
//number of unique paths if robot can move only right or down at any point

var uniquePaths = function(r, c, m, n) {

  if (r == m && c == n) {
    return 1;
  } else if (r <= m && c <= n) {
    return uniquePaths(r + 1, c, m, n) + uniquePaths(r, c + 1, m, n);
  } else {
    return 0;
  }
}

var uniquePathsCount = function(r, c, m, n, arr) {

  if (typeof arr === "undefined") {
   arr = [];
  }
  if (r == m && c == n) {
   arr.push(1);
  } else if (r <= m && c <= n) {
    uniquePathsCount(r + 1, c, m, n, arr);
    uniquePathsCount(r, c + 1, m, n, arr);
  }

  return arr.length;
}

//fib with memoization top down
var fibMemo = function(num, hash) {
  debugger;
  if (typeof hash === "undefined") {
    hash = new HashTable();
  }
  if (num <= 1) {
    return num;
  } else {
    if (hash.find(num) === undefined) {
      var fibNum = fibMemo(num - 1, hash) + fibMemo(num - 2, hash);
      hash.insert(num, fibNum);
      return fibNum;
    } else {
      return hash.find(num);
    }
  }
}

var maxSubArr = function(arr) {
  var bestSum;
  var currentSum = 0;
  var startIdx;
  var endIdx;
  for(var i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    if (bestSum === undefined ||
        (arr[i] > currentSum && (arr[i] >= 0 || (arr[i] < 0 && arr[i] > bestSum)))) {
        bestSum = arr[i];
        currentSum = arr[i];
        startIdx = i;
        endIdx = i;
    } else if (currentSum > bestSum) {
      endIdx = i;
    }
  }
  return arr.slice(startIdx, endIdx + 1);
}
