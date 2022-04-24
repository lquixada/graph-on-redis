const { client } = require('../client');

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

module.exports = Node;
