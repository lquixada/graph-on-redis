const Node = require('./model/node');

const node2 = new Node(2);
node2.set('data', 'Blake');

const node3 = new Node(3);
node3.set('data', 'Mary');

const node4 = new Node(4);
node4.set('data', 'Jack');

const node1 = new Node(1);
node1.set('data', 'John');
node1.addNeighbor(node2);
node1.addNeighbor(node3);
node1.addNeighbor(node4);

node1.getNeighbors().then(data => {
  console.log(data);
}).catch(err => console.error(err))