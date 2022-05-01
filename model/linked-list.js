const redis = require('../redis');

class Node {
  static id = 1

  static generateId() {
    return this.id++
  }

  constructor(id) {
    this.id = id || Node.generateId();
  }

  async setNext(node) {
    this.next = node.id;
    return redis.hset(`list-node:${this.id}`, 'next', node.id);
  }

  async setData(value) {
    this.data = value;
    return redis.hset(`list-node:${this.id}`, 'data', value);
  }

  async getData() {
    return redis.hget(`list-node:${this.id}`, 'data');
  }

  async getNext() {
    return redis.hget(`list-node:${this.id}`, 'next');
  }
}

const LinkedList = {
  Node
}

module.exports = LinkedList;
