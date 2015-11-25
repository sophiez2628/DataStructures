class DynamicArray
  def initialize(size = 8)
    @store = StaticArray.new(size)
    @start_index = 0
    @count = 0
    @cap = size
  end

  def idx(i)
    (@start_index + i) % @cap
  end

  def [](i)
    @store[idx(i)]
  end

  def []=(i, val)
    #within bounds of the static array
    @store[idx(i)] = val
  end

  def pop
    @count -= 1
    i = (@start_index + @count) % @cap
    @store[i]
  end

  def shift
    @count -= 1
    i = (@start_index) % @cap
    @start_index += 1
    @store[i]
  end 
end
