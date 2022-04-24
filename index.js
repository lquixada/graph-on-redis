const GraphNode = require('./model/graph-node');

const node1 = new GraphNode(1);

node1.getNeighbors()
  .then(data => console.log(data))
  .then(process.exit)
  .catch(err => console.error(err))
