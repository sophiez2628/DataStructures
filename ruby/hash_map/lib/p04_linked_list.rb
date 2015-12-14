# why do we need key for linked list?

require 'byebug'
#doubly linked list
#why do we need key and val?
class Link
  attr_accessor :key, :val, :next, :prev

  def initialize(key = nil, val = nil, nxt = nil, prev = nil)
    @key, @val, @next, @prev = key, val, nxt, prev
  end

  def to_s
    "#{@key}, #{@val}"
  end
end

class LinkedList
  include Enumerable
  attr_accessor :head, :tail

  def initialize
    @head = Link.new
    @tail = nil
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    return head.next unless empty?
    nil
  end

  def last
      current_link = head
      next_link = head.next
      while next_link
        current_link = next_link
        next_link = next_link.next
      end
      current_link
  end

  def empty?
    head.next.nil?
  end

  def get(key)
    self.each do |link|
      return link.val if key == link.key
    end
  end

  def include?(key)
    self.each do |link|
      return true if link.key == key
    end
    false
  end

  def insert(key, val)
      new_link = Link.new(key, val, nil, last)
      last.next = new_link
      @tail = new_link
  end

  def remove(key)
    #keep track of prev link in order to properly remove a link
    current_link = head
    next_link = head.next
    while true && include?(key)
      if next_link.key == key
        current_link.next = next_link.next
        next_link.next.prev = current_link if next_link.next
        break
      end
      current_link = next_link
      next_link = next_link.next
    end
  end

  def each(&prc)
    current_link = head
    next_link = head.next
    while next_link
      prc.call(next_link)
      next_link = next_link.next
    end
  end

  #uncomment when you have `each` working and `Enumerable` included
  def to_s
    inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  end
end
