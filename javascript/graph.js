//represents a weighted graph
function Edge (fro, to, weight) {
  this.from = fro;
  this.to = to;
  this.weight = weight;
  this.from.out_edges.push(this);
  this.to.in_edges.push(this);
}

function Vertex (val) {
  this.val = val;
  this.out_edges = [];
  this.in_edges = [];
}

function min (num1, num2) {
  if (num1 < num2) {
    return num1;
  } else {
    return num2;
  }
}

Object.prototype.minCost = function() {
  var keys = Object.getOwnPropertyNames(this);
  var vertex = keys[0];
  for(var i = 1; i < keys.length; i++) {
    if (this[keys[i]][0] < this[vertex][0]) {
      vertex = keys[i][1];
    }
  }
  return vertex;
}

var dijkstra = function(source_vertex, destination) {
  var visited = {};
  var frontier = {};
  frontier[source_vertex.val] = [0, source_vertex];

  while (Object.getOwnPropertyNames(frontier).length > 0) {
    //get vertex with lowest cost
    var vertex = frontier.minCost();
    var cost = frontier[vertex.val][0];

    delete frontier.vertex.val;
    debugger;
    if (vertex.val === destination) {
      return cost;
    } else {
      vertex.out_edges.forEach(function(edge) {
        var new_cost = cost + edge.weight;
        if (frontier[edge.to.val]) {
          frontier[edge.to.val] = [min(frontier[edge.to], new_cost), edge.to];
        } else {
          frontier[edge.to] = [new_cost, edge.to];
        }
      }.bind(this));
    }
    visited.(vertex.val) = [cost, vertex];
  }
  return visited;
}

a = new Vertex("A");
b = new Vertex("B");
c = new Vertex("C");
d = new Vertex("D");
e = new Vertex("E");
a_e = new Edge(a, e, 1);
a_b = new Edge(a, b, 1);
a_c = new Edge(a, c, 2);
e_b = new Edge(e, b, 5);
b_d = new Edge(b, d, 4);
c_d = new Edge(c, d, 1);
