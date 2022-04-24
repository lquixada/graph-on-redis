const Node = require('./model/node');

const node1 = new Node(1);

node1.getNeighbors()
  .then(data => console.log(data))
  .then(process.exit)
  .catch(err => console.error(err))
