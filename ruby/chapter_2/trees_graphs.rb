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

  p depth_first_search(adj_matrix, 0, 4)
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

#given a sorted(increasing order) array with unique integer elements, write an
#algorithm to create a binary search tree with minimal height
class TreeNode
  attr_accessor :left, :right
  attr_reader :val
  def initialize(val)
    @val = val
    @left = nil;
    @right = nil;
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
