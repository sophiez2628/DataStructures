#hash dictionary

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
