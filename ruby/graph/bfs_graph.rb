#finds the shortest path based on the number of steps taken in a directed graph
class Edge
  attr_reader :from, :to
  def initialize(from, to)
    @from, @to = from, to
    @from.out_edges << self
    @to.in_edges << self
  end
end

class Vertex
  attr_reader :val, :out_edges, :in_edges
  def initialize(val)
    @val = val
    @out_edges = []
    @in_edges = []
  end
end

a = Vertex.new("A")
b = Vertex.new("B")
c = Vertex.new("C")
d = Vertex.new("D")
e = Vertex.new("E")

p_ae = Edge.new(a, e)
p_ab = Edge.new(a, b)
p_ac = Edge.new(a, c)
p_eb = Edge.new(e, b)
p_bd = Edge.new(b, d)
p_cd = Edge.new(c, d)

def backtrace(node2, parent)
  path = [node2.val]
  prev = parent[node2]
  until prev == nil
    path.unshift(prev.val)
    prev = parent[prev]
  end
  path
end

#finds the shortest path 
def bfs(source, destination=nil)
  parent = {source => nil}
  queue = [source]
  until queue.empty?
    node = queue.shift
    node.out_edges.each do |edge|
      node2 = edge.to
      queue.push(node2)
      unless parent[node2]
        parent[node2] = node
      end
      return backtrace(node2, parent) if node2 == destination
    end
  end
  false
end
