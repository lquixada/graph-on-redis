const redis = require('../redis');

class LinkedList {
  static id = 1

  static generateId() {
    return this.id++
  }

  constructor(id) {
    this.id = id || LinkedList.generateId();
    this.head = null;
    this.tail = null;
  }

  async addNodes(node) {
    this.head = node?.id

    while (node && node.hasNext()) {
      node = node.getNext();
    }

    this.tail = node;

    redis.hget()

    return redis.hset(`list:${this.id}`, 'next', node.id);
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
    const id = redis.hget(`list-node:${this.id}`, 'next');
    return id ? new Node(id) : null;
  }

  async hasNext() {
    return this.getNext() !== null;
  }
}

const LinkedList = {
  Node
}

module.exports = LinkedList;
