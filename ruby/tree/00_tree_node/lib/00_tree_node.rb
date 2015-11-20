module Searchable
  def dfs(target_value)
    if self.value == target_value
      return self
    else
      self.children.each do |child|
        return_value = child.dfs(target_value)
        return return_value if return_value
      end
    end
    return nil
  end

  def bfs(target_value)
    queue = [self]
    until queue.empty?
      check_node = queue.shift
      queue.concat(check_node.children)
      return check_node if check_node.value == target_value
    end
    return nil
  end
end

class PolyTreeNode
  include Searchable

  attr_reader :parent
  attr_accessor :children, :value
  def initialize(value)
    @value = value
    @parent = nil
    @children = []
  end

  def parent=(new_parent)
    if parent
      parent.children.delete(self)
    end
      @parent = new_parent
      parent.children << self if new_parent
  end

  def add_child(child_node)
    child_node.parent = self
  end

  def remove_child(child)
    raise "not a child" unless children.include?(child)
    child.parent = nil
  end
end
