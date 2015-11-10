require_relative 'p02_hashing'
require_relative 'p04_linked_list'

class HashMap
  include Enumerable
  attr_reader :count, :store

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    index = key.hash % num_buckets
    @store[index].include?(key)
  end

  def set(key, val)
    if @count == num_buckets
      resize!
    end
    index = key.hash % num_buckets
    @store[index].insert(key, val)
    @count += 1
  end

  def get(key)
    index = key.hash % num_buckets
    @store[index].get(key)
  end

  def delete(key)
    index = key.hash % num_buckets
    @store[index].remove(key)
    @count -= 1
  end

  def each(&prc)
    i = 0
    while i < num_buckets
      #linked list has a each method
      @store[i].each do |node|
        prc.call(node.key, node.val)
      end
      i += 1
    end
  end

  # uncomment when you have Enumerable included
  def to_s
    pairs = inject([]) do |strs, (k, v)|
      strs << "#{k.to_s} => #{v.to_s}"
    end
    "{\n" + pairs.join(",\n") + "\n}"
  end

  alias_method :[], :get
  alias_method :[]=, :set



  def num_buckets
    @store.length
  end

  def resize!
    old_store = @store
    @store = Array.new(num_buckets * 2) { LinkedList.new }

    old_store.each do |list|
      list.each do |node|
        index = node.key.hash % (num_buckets)
        @store[index].insert(node.key, node.val)
      end
    end

  end

  def bucket(key)
    # optional but useful; return the bucket corresponding to `key`
  end
end
