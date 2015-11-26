require 'byebug'
class BstNode
  attr_accessor :val, :parent
  attr_reader :left, :right
  def initialize(val, parent = nil)
    @val = val
    @left = nil
    @right = nil
    @parent = parent
  end

  def left=(node)
    @left = node
    node.parent = self
  end

  def right=(node)
    @right = node
    node.parent = self
  end
end

class Bst
  attr_accessor :root
  def initialize(root)
    @root = root
  end

  def node_to_be_added_to(val, node)
    return node if !node.left && !node.right
    return node if node.right.nil?
    return node if node.left.nil?

    if val > node.val
      return node_to_be_added_to(val, node.right)
    else
      return node_to_be_added_to(val, node.left)
    end
  end

  def insert(val)
    correct_node = node_to_be_added_to(val, @root)
    if val > correct_node.val
      correct_node.right = BstNode.new(val)
    else
      correct_node.left = BstNode.new(val)
    end
    self
  end

  #depth and breadth first search useful for binary tree, not bst
  def find(node, val)
    return node if node.val == val
    if val > node.val
      return find(node.right, val)
    else
      return find(node.left, val)
    end
  end

  def max(node = root)
    max_node = node
    until max_node.right.nil?
      max_node = max_node.right
    end
    max_node
  end

  def min(node = root)
    min_node = node
    until min_node.left.nil?
      min_node = min_node.left
    end
    min_node
  end

  def delete(val)
    #change the pointer to parent
    node_to_be_deleted = find(root, val)
    parent = node_to_be_deleted.parent
    new_root = min(node_to_be_deleted.right)
    new_root.parent.left = new_root.right if new_root.right
    new_root.left = node_to_be_deleted.left if node_to_be_deleted.left
    new_root.right = node_to_be_deleted.right if node_to_be_deleted.right
    self.root = node_to_be_deleted.val == val ? new_root : root
    self.root.parent = nil
    return self
  end
end

# root = BstNode.new(5)
# bst = Bst.new(root)
# bst.insert(8).insert(3).insert(7).insert(4).insert(1)
