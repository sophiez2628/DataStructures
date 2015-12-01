#max_unique_psub
def find_psubs(str)
  psubs = [str.dup]
  chars = str.split("")
  chars.each_with_index do |char, index|
    psubs.push(char.dup)
    #add next char to current char
    next_char_idx = index + 1
    while next_char_idx < chars.length
      subb = char.dup + chars[next_char_idx].dup
      psubs.push(subb)
      i = next_char_idx + 1
      while i < chars.length
        psubs.push(subb + chars[i])
        i += 1
      end
      next_char_idx += 1
    end
  end
  return psubs
end

def max_unique_psub(str)
  psubs = find_psubs(str)
  max = psubs[0]
  i = 1
  while i < psubs.length
    if psubs[i] > max
      max = psubs[i]
    end
    i += 1
  end
  return max
end
