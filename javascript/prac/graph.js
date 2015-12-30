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

//Object.getOwnPropertyNames(obj) - gets passed in an obj and returns the names of object keys 
Object.prototype.minCost = function() {
  var keys = Object.getOwnPropertyNames(this);
  var vertex_key = keys[0];
  var vertex = this[vertex_key][1];
  debugger;
  for(var i = 1; i < keys.length; i++) {
    debugger;
    if (this[keys[i]][0] < this[vertex_key][0]) {
      debugger;
      vertex = this[keys[i]][1];
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
    var vertex_val = vertex.val;
    debugger;
    var cost = frontier[vertex.val][0];

    delete frontier[vertex_val];
    if (visited[vertex_val] === undefined) {
      if (vertex.val === destination) {
        return cost;
      } else {
        vertex.out_edges.forEach(function(edge) {
          var new_cost = cost + edge.weight;
          if (frontier[edge.to.val]) {
            frontier[edge.to.val] = [min(frontier[edge.to.val][0], new_cost), edge.to];
            debugger;
          } else {
            frontier[edge.to.val] = [new_cost, edge.to];
          }
        }.bind(this));
      }
    }
    visited[vertex_val] = [cost, vertex];
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
