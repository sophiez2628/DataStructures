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
