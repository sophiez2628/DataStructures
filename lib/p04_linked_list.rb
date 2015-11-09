require 'byebug'
class Link
  attr_accessor :key, :val, :next

  def initialize(key = nil, val = nil, nxt = nil)
    @key, @val, @next = key, val, nxt
  end

  def to_s
    "#{@key}, #{@val}"
  end
end

class LinkedList
  include Enumerable
  attr_reader :head

  def initialize
    @head = Link.new
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
      last.next = Link.new(key, val)
  end

  def remove(key)
    #keep track of prev link in order to properly remove a link 
    current_link = head
    next_link = head.next
    while true && include?(key)
      if next_link.key == key
        current_link.next = next_link.next
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
