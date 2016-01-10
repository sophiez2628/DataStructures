/*
matrix multiplication
  start by thinking about the last step,
  come up with equation to describe recursive substructure,
  figure out order to solve
*/

var tripleStep = function(n) {
  var hash = new HashTable();
  for(var i = 0; i <= n; i++) {
    if (i < 2) {
      hash.insert(i, 1);
    } else if (i < 3) {
      hash.insert(i, 2);
    } else {
      var count = hash.find(i - 1) + hash.find(i - 2) + hash.find(i - 3);
      hash.insert(i, count);
    }
  }
  return hash.find(n);
}
/*
how many ways are there to climb n steps if you take either 1 or 2 steps at a time?
*/

var stairs = function(n) {
  if (n <= 1) {
    return 1;
  }
  //why does this work?
  //how many ways are there to reach stairs that have 2 steps?
  //count the ways that it took to reach 1 step and 0 step
  return stairs(n - 1) + stairs(n - 2);
}

var stairsTopDown = function(n, memo) {
  if (typeof memo === "undefined") {
    memo = new HashTable();
  }

  if (n <= 1) {
    return 1;
  } else {
    var value = memo.find(n);
    if (value) {
      return value;
    } else {
      var answer = stairs(n - 1, memo) + stairs(n - 2, memo);
      memo.insert(n, answer);
      return answer;
    }
  }
}

var stairsBottomUp = function(n) {
  var memo = new HashTable();
  for(var i = 0; i <= n; i++) {
    if (i <= 1) {
      memo.insert(i, 1);
    } else {
      var num1 = i - 1;
      var num2 = i - 2;

      var answer = memo.find(num1) + memo.find(num2);
      memo.insert(i, answer);
    }
  }
  return memo.find(n);
}

//log cutter
//how to figure the pieces cut?
var bestCut = function(n, arr) {
  var memo = new HashTable();
  var choice = [0];
  for(var i = 0; i <= n; i++) {
    if (i === 0) {
      memo.insert(i, 0);
    } else {
      var max = 0;
      for(var j = 1; j <= i; j++) {
        var newMax = arr[j - 1] + memo.find(i - j);
        if (newMax > max) {
          max = newMax;
          choice[i] = j;
        }
      }
      memo.insert(i, max);
    }
  }
  return choice;
}
