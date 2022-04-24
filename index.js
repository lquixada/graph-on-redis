const GraphNode = require('./model/graph-node');

const node1 = new GraphNode(1);

node1.getNeighbors()
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .then(process.exit);
