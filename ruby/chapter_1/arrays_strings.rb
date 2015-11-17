require 'byebug'
=begin
Implement a method to perform basic string compression using
the counts of repeated characters. For example, the string aabcccccaaa
would become a2blc5a3. If the "compressed" string would not become smaller
than the orig- inal string, your method should return the original string.
=end

def string_compression(input)
  array_count = []
  input.each_char do |chr|
    if array_count.empty? || array_count.last.first != chr
      array_count << [chr, 1]
    else
      array_count.last[1] += 1
    end
  end

  if array_count.all? { |pair| pair.last == 1}
    input
  else
    compressed = ""
    array_count.each do |key, value|
      compressed << key << value.to_s
    end
    compressed
  end
end

=begin
Given an image represented by an NxN matrix, where each pixel in the image
is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
algorithm is O(N^2)
=end

 def rotate_image_by_90(matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]])
   layer = 0
   while layer < matrix.length / 2
     offset = layer
     num_items = matrix.length - 2 * layer
     i = 0

     while i < (num_items - 1)
       #save top
       top = matrix[layer][matrix.length - 1 - offset - i]

       #left num -> top
       matrix[layer][matrix.length - 1 - offset - i] = matrix[layer + i][layer]

       #bottom -> left
       matrix[layer + i][layer] = matrix[matrix.length - 1 - offset][i + offset]

       #right to bottom
       matrix[matrix.length - 1 - offset][i + offset] = matrix[matrix.length - 1 - offset - i][matrix.length - 1 - offset]

       #top to right
       matrix[matrix.length - 1 - offset - i][matrix.length - 1 - offset] = top

       i += 1
     end

     layer += 1
   end
   p matrix
 end
