/*
  Implement a method to perform basic string compression using
  the counts of repeated characters. For example, the string aabcccccaaa
  would become a2blc5a3. If the "compressed" string would not become smaller
  than the orig- inal string, your method should return the original string.
*/

var stringCompression = function(input) {
  var array_count = [];
  input.split("").forEach(function(char) {
    if (array_count.length === 0 || array_count[-1][0] !== char) {
      array_count.push([char, 1]);
    } else {
      array_count[-1][-1] += 1;
    }
  });

  var alreadyCompressed = true;

  array_count.forEach(function(pair) {
    if (pair[-1] !== 1) {
      alreadyCompressed = false;
    }
  })

  if (alreadyCompressed === true) {
    return input;
  } else {
    var compressedString = "";
    array_count.forEach(function(pair) {
      compressedString += (pair[0] + pair[1]);
    });
    return compressedString;
  }
}
