#A: hash dictionary

#find_path should return an array of paths, but when i call function, i want to return the key
def find_path(hash)
  paths = []
  hash.each do |item, nested_item|
    if nested_item.is_a?(Hash)
      folder = item
      nested_files = find_path(nested_item)
      nested_files.each { |file| paths << "#{folder}/#{file}" }
    else
      paths << item
    end
  end
  paths
end

#write recursive functions based on the simpliest example possible
#figure out how to use base case and build up to an answer
def find_path_version2(hash)
  paths = []
  hash.keys.each do |key|
    if hash[key].is_a?(Hash)
      sub_paths = find_path_version2(hash[key])
      sub_paths.each { |sub_path| paths << "#{key}/#{sub_path}" }
    else
      paths << key
    end
  end
  paths
end

#B: is_shuffle?

# Given three strings, return whether the third is an interleaving of the first two.
# Interleaving means it only contains characters from the other two, no more no less,
# and preserves their character ordering. "abdecf" is an interleaving of "abc" and "def".
# Note that the first two strings needn't be in alphabetical order like these.
# You may assume that the first two strings do not contain any characters in common.

class String
  def shift
    self.split("").drop(1).join("")
  end
end
# know the difference between break and return
def is_shuffle?(str1, str2, str3)
  until str3.empty?
    if str1[0] == str3[0]
      str1 = str1.shift
      str3 = str3.shift
    elsif str2[0] == str3[0]
      str2 = str2.shift
      str3 = str3.shift
    else
      return false
    end
  end
  return true
end

def is_shuffle_v2?(str1, str2, str3)
  if str1[0] == str3[0]
    return true if is_shuffle_v2(str1[1..-1], str2, str3[1..-1])
  end

  if str2[0] == str3[0]
    return true if is_shuffle_v2(str1, str2[1..-1],str3[1..-1])
  end

  return false
end
