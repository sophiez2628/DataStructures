require_relative 'p05_hash_map'
require_relative 'p04_linked_list'

class LRUCache
  attr_reader :count
  def initialize(max, prc)
    @map = HashMap.new
    @store = LinkedList.new
    @max = max
    @prc = prc
  end

  def count
    @map.count
  end

  def get(key)
    link = @map.get(key)
    if link
      update_link!(link)
      link.val
    else
      value = @prc.call(key)
      new_link = @store.insert(key, value)
      @map.set(key, new_link)
      if count > @max
        eject!
      end
      new_link.val
    end
  end

  def to_s
    "Map: " + @map.to_s + "\n" + "Store: " + @store.to_s
  end

  private

  def calc!(key)
    # suggested helper method; insert an (un-cached) key
  end

  def update_link!(link)
    # suggested helper method; move a link to the end of the list
    prev_link = link.prev
    next_link = link.next
    prev_link.next = next_link
    next_link.prev = prev_link if next_link
    old_tail = @store.tail
    old_tail.next = link
    link.prev = old_tail
    @store.tail = link
  end

  def eject!
    first_link = @store.head.next
    second_link = first_link.next
    second_link.prev = @store.head
    @store.head.next = second_link
    @map.delete(first_link.key)
  end
end
