require 'byebug'
#tree
  #cannot contain cycles
  #nodes may or may not be in a particular order
  #may or may not have links back to their parent nodes
  #leaf node - has no children
  #binary tree - a tree in which each node has up to two children
  #binary search tree - a binary tree in which every node fits a specific ordering property
    #all left descendants <= n < all right descendants
  #two common types of balanced trees: red-black trees and AVL trees
  #what is a complete binary tree?
  #what is a full binary tree?
  #what is a perfect binary tree?

#binary tree traversal
  #in-order traversal
    #return all of the left children
    #return my value
    #return all of the right children 
  #post-order traversal
  #pre-order traversal

#tries (prefix trees)
  #variant of an n-ary tree in which characters are stored at each node

#two common ways to represent a graph: adjacency list and adjacency matrices
  #when is the adjacency matrix representation useful?
    #when the graph is dense, because...

  #operations that are inefficient to perform using adjacency lists?
    #consider the case of deleting a node

#fundamental problem:
#graph traversal - breadth first search and depth first search
  #depth first search - we must check if the node has been visited,
  #internally, the algorithm uses a stack

  #use a set to keep track of the visited nodes
  def depth_first_search(adj_matrix, source_index, end_index)
    node_stack = [source_index]
    while true
      curr_node = node_stack.pop
      return false if curr_node == nil
      return true if curr_node == end_index

      children = (0..adj_matrix.length - 1).to_a.select do |i|
        adj_matrix[curr_node][i] == 1
      end

      p node_stack = node_stack + children
    end

  end

  adj_matrix = [
    [0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ]

  # p depth_first_search(adj_matrix, 0, 4)
  #breadth first search - algorithm uses a queue
  def breadth_first_search(adj_matrix, source_index, end_index)
    node_queue = [source_index]

    while true
      curr_node = node_queue.pop

      return false if curr_node == nil
      return true if curr_node == end_index

      children = (0..adj_matrix.length - 1).to_a.select do |i|
        adj_matrix[curr_node][i] == 1
      end

      node_queue = children + node_queue
    end
  end
#4.2 Minimal Tree
#given a sorted(increasing order) array with unique integer elements, write an
#algorithm to create a binary search tree with minimal height
class TreeNode
  attr_accessor :left, :right, :visited
  attr_reader :val
  def initialize(val)
    @val = val
    @left = nil
    @right = nil
    @visited = false
  end
end

def createMinimalBST(arr)
  return TreeNode.new(arr.first) if arr.length == 1
  mid_index = (arr.length - 1) / 2
  #create node
  node = TreeNode.new(arr[mid_index])
  if mid_index == 0
    node.left = nil
  else
    node.left = createMinimalBST(arr[0...mid_index])
  end
  node.right = createMinimalBST(arr[(mid_index + 1)..-1])
  return node
end

#4.3 List of Depths
  #given a binary tree, design an algorithm which creates a linked list
  #of all the nodes at each depth

class Link
  attr_accessor :val, :next

  def initialize(val, nxt = nil)
    @val = val
    @next = nxt
  end
end

class LinkedList
  def initialize
    @head = Link.new
    @tail = nil
  end

  def first
    return head.next unless empty?
    nil
  end

  def empty?
    head.next.nil?
  end

  def last
    current_link = head
    next_link = head.next
    while next_link
      current_link = next_link
      next_link = current_link.next
    end
    current_link
  end

  def insert(val)
    last.next = Link.new(val)
    @tail = last
  end

end
#depth first search tends to be recursive
def bt_depth_first_search(node, target)
  node.visited = true
  return node if node.val == target
  left = node.left
  right = node.right

  if left && (left.visited == false)
    found = bt_depth_first_search(left, target)
    return found if found
  end

  if right && (right.visited == false)
    found = bt_depth_first_search(right, target)
    return found if found
  end
  nil
end

node = createMinimalBST([2,3,4,5,7,8])
p bt_depth_first_search(node, 100)

def bt_breadth_first_search(node, target)

end

def linked_list_bst(node)

end
