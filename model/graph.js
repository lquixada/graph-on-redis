const redis = require('../redis');

class Graph {
  static id = 1

  static generateId() {
    return this.id++
  }

  constructor(id) {
    this.id = id || Graph.generateId();
  }

  async addNodes(nodes) {
    const ids = nodes.map(node => node.id);
    return redis.rpush(`graph:${this.id}:nodes`, ...ids);
  }

  async getNodes() {
    const ids = await redis.lrange(`graph:${this.id}:nodes`, 0, -1);
    return ids.map(id => new Graph.Node(id))
  }
}

class Node {
  static id = 1

  static generateId() {
    return this.id++
  }

  constructor(id) {
    this.id = id || Node.generateId();
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
    return neighbors.map(id => new Graph.Node(id))
  }
}

Graph.Node = Node;

module.exports = Graph;
