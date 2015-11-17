/*
  Implement a method to perform basic string compression using
  the counts of repeated characters. For example, the string aabcccccaaa
  would become a2blc5a3. If the "compressed" string would not become smaller
  than the orig- inal string, your method should return the original string.
*/

var stringCompression = function(input) {
  var array_count = [];
  input.split("").forEach(function(char) {
    if (array_count.length === 0 || (array_count[array_count.length - 1] && (array_count[array_count.length - 1][0] !== char))) {
      array_count.push([char, 1]);
    } else {
      array_count[array_count.length - 1][1] += 1;
    }
  });

  var alreadyCompressed = true;

  array_count.forEach(function(pair) {
    if (pair[1] !== 1) {
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

//slice() method returns a shallow copy of a portion of an array into a new array object

var rotateImageBy90 = function(matrix) {
  var layers = Math.floor(matrix.length / 2);
  var layer = 0;
  while (layer < layers) {
    var num_items = matrix.length - 1;
    for(var i = 0; i < num_items; i++) {
      //save top
      var top = matrix[layer][matrix.length - 1 - i];

      //move left to top pos
      matrix[layer][matrix.length - 1 - i] = matrix[layer + i][layer];

      //move bottom to left
      matrix[layer + i][layer] = matrix[matrix.length - 1 - layer][layer + i];

      //move right to bottom
      matrix[matrix.length - 1 - layer][layer + i] = matrix[matrix.length - 1 - layer - i][matrix.length - 1 - layer];

      //move saved top to right
      matrix[matrix.length - 1 - layer - i][matrix.length - 1 - layer] = top;
    }
    layer += 1;
  }
  return matrix;
}
