const redis = require('../redis');

class GraphNode {
  constructor(id) {
    this.id = id;
  }

  async set(key, value) {
    return redis.hset(`node:${this.id}`, key, value);
  }

  async get(key) {
    if (key === 'neighbors') {
      return this.getNeighbors();
    }

    return redis.hget(`node:${this.id}`, key);
  }

  async addNeighbor(node) {
    return redis.rpush(`node:${this.id}:neighbors`, node.id);
  }

  async getNeighbors() {
    const neighbors = await redis.lrange(`node:${this.id}:neighbors`, 0, -1);

    return neighbors.map(id => new GraphNode(id))
  }
}

module.exports = GraphNode;
