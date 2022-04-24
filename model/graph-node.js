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

  async addNeighbors(nodes) {
    const ids = nodes.map(node => node.id);
    return redis.rpush(`node:${this.id}:neighbors`, ...ids);
  }

  async addNeighbor(node) {
    return this.addNeighbors([node]);
  }

  async getNeighbors() {
    const neighbors = await redis.lrange(`node:${this.id}:neighbors`, 0, -1);
    return neighbors.map(id => new GraphNode(id))
  }
}

module.exports = GraphNode;
