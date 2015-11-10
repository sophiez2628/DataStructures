require_relative 'p02_hashing'

class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    if @count == num_buckets
      resize!
    end 
    index = key.hash % num_buckets
    @store[index].push(key)
    @count += 1
  end

  def include?(key)
    index = key.hash % num_buckets
    @store[index].include?(key)
  end

  def remove(key)
    index = key.hash % num_buckets
    @store[index].delete(key)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    @store[num]
  end

  def num_buckets
    @store.length
  end

  def resize!
      @count = 0
      old_store = @store
      @store = Array.new(num_buckets * 2) { Array.new }
      old_store.each do |bucket|
        bucket.each do |item|
          insert(integer)
        end
      end
  end
end
