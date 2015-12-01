//Write a function that takes an integer and returns it in binary form.
function formString(digits) {
  var stringForm = ""
  for(var i = 0; i < digits.length; i++) {
    stringForm = digits[i] + stringForm;
  }
  return stringForm;
}

function binaryForm(int) {
  var timesWentInto = int;
  var digits = [];

  while (timesWentInto > 0) {
    var remainder = timesWentInto % 2;
    timesWentInto = Math.floor(timesWentInto / 2);
    digits.push(remainder);
  }
  return formString(digits);
}

// Implement factorial with and without recursion.
// What is a potential disadvantage of the recursive way?

// What is tail-recursion? Does Ruby have tail-call optimization?
// Pretend it did; write a tail-recursive version of rec_fac.

function fac(n) {
  var answer = 1;
  for(var i = n; i > 0; i--) {
    answer *= i;
  }
  return answer;
}

function recFac(n) {
  if (n === 1) {
    return n;
  } else {
    return n * recFac(n - 1);
  }
}

function tailRecFac(n, current) {
  if (typeof current === "undefined") {
    current = 1;
  }

  if (n === 1) {
    return current;
  } else {
    return tailRecFac(n - 1, current * (n));
  }
}



  //tail recursion is a special kind of recursion where the recursive call
  //is the very last thing in the function

  //a function is tail recursive if the final result of the recursive call
  //is also the final result of the function itself

  //tail call optimization is the process by which a tail recursive function call
  //is optimized to just one stack frame

  //loops are more efficient than recursion since they don't require stack space
  //and are easier to optimize

//max_unique_psub
