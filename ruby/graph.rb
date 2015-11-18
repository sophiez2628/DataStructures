#write some of the graph algorithms
#directed graph
class Edge
  def initialize(from, to)
    @from, @to = from, to
    @from.out_edges << self
    @to.in_edges << self
  end
end

class Vertex
  def initialize(val)
    @val = val
    @out_edges = []
    @in_edges = []
  end
end

#DAG - directed acyclic graph (most common type of graph)
#many algorithms only work on DAG
#why are cyclic graphs bad? unable to determine max

#two graph algorithms: BFS and DFS
#BFS uses a queue - what problem does it solve? best algorithm for finding shortest paths in an unweighted graph
#how do i know that this is the shortest paths? finding all the paths of length 1...first path i find must be the shortest through brute force search
#can use a set of everything that has been explored
#ex: linkedin, runs a BFS (not a weighted graph)
#ex: follower follows followee, directed graph

def bfs(vertices, source, target = 0)
  paths = {}
  queue = [[source, 0]]
  until queue.empty?
    vertex, dist = queue.shift
    return dist if vertex.val == target
    paths[vertex] = dist
    vertex.out_edges.each do |edge|
      queue << [edge.to, dist + 1]
    end
  end
  paths
end
#bfs can also be run to find all the shortest paths

#running time of bfs? O(n) iterations until we reach the node. worst case is that the target is not in graph, so worst case is O(n)
#two measures of input for graphs: vertices and edges, do not just use n to describe running time
