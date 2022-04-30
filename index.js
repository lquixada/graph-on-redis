const Graph = require('./model/graph');

const node = new Graph.Node(1);

node.getNeighbors()
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .then(process.exit);
