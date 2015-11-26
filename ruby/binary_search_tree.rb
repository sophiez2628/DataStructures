class BstNode
  attr_accessor :val, :left, :right
  def initialize(val)
    @val = val
    @left = nil
    @right = nil
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
  end
end

root = BstNode.new(5)
bst = Bst.new(root)
