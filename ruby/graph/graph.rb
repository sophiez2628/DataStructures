#write some of the graph algorithms
#directed graph
class Edge
  def initialize(from, to, weight)
    @from, @to, @weight = from, to, weight
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

#week 13 day 3
#bfs - finding shortest paths in unweighted graph
#connected components (undirected)

#figure out demographics of customers, and see what the clusters are

connected_components = Set.new
vertices.each do |vertex|
  if !explored[vertex]
    connected_components << bfs(vertex)
  end
end

#bfs runs in O(v + e) - every graph has two inputs, i
#mportant to express time complexity in terms of these two inputs

#topological sort (directed graph)
#not necessarily unique
#how to generate a topological list quickly?

#sink vertex - edge goes in, but nothing goes out, last eliminate will definitely be a sink vertex

#dfs always finds a sink vertex

#how to pick the node that i should start searching at?
#worst case is O(v) for a linked-list

#two well-known algorithms: kahn's algorithm
#iterate through every vertex - mark the number of in edges going into the vertex

#move into queue or order
#dependency list is unsolvable if a cycle


#how to perform graph search with edge weights?
  #dijkstra's algorithm - greedy algorithm
  #make greedy choices one at a time, making greedy chocies one at a time, eventually reach a correct solution
#what if there are negative edge weights?
  #in a distance graph, does not make sense, but in a business transaction graph, it does make sense!

def dijkstra(source, destination = nil)
  #nodes that i have been to, do not want to look back inside myself
  visited = {}

  #vertices directly reachable from supernode
  frontier = {source => 0}

  #O(v)
  until frontier.empty?
    #O(v)
    vertex, cost = frontier.min_by(&:last)

    return cost if vertex.val == destination
    #eating node up
    frontier.delete(vertex)
    next if visited[vertex]
    vertex.out_edges.each do |edge|
      vertex2 = edge.to
      cost2 = edge.weight
      new_cost = cost + cost2
      if frontier[vertex2]
        frontier[vertex2] = min(frontier[vertex2], new_cost)
      else
        frontier[vertex2] = new_cost
      end
    end
    visited[vertex] = cost
  end
end

#what is the time and space complexity?
  #time complexity is O(v^2)
