const { client } = require('./client');

class Node {
  constructor(id) {
    this.id = id;
  }

  async set(key, value) {
    return client.hSet(`node:${this.id}`, key, value);
  }

  async get(key) {
    if (key === 'neighbors') {
      return this.getNeighbors();
    }

    return client.hGet(`node:${this.id}`, key);
  }

  async addNeighbor(node) {
    return client.rPush(`node:${this.id}:neighbors`, node.id);
  }

  async getNeighbors() {
    const neighbors = await client.lRange(`node:${this.id}:neighbors`, 0, -1);

    return neighbors.map(id => new Node(id))
  }
}

const node2 = new Node();
node1.set('data', 'Blake');

const node3 = new Node();
node1.set('data', 'Mary');

const node4 = new Node();
node1.set('data', 'Jack');

const node1 = new Node();
node1.set('data', 'John');
node1.addNeighbor(node2);
node1.addNeighbor(node3);
node1.addNeighbor(node4);

console.log(node1.getNeighbors())
