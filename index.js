const { client } = require('./client');

class Node {
  constructor(id) {
    this.id = id;
  }

  async set(key, value) {
    return client.hset(`node:${this.id}`, key, value);
  }

  async get(key) {
    if (key === 'neighbors') {
      return this.getNeighbors();
    }

    return client.hget(`node:${this.id}`, key);
  }

  async addNeighbor(node) {
    return client.rpush(`node:${this.id}:neighbors`, node.id);
  }

  async getNeighbors() {
    const neighbors = await client.lrange(`node:${this.id}:neighbors`, 0, -1);

    return neighbors.map(id => new Node(id))
  }
}

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
