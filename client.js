// Import ioredis.
// You can also use `import Redis from "ioredis"`
// if your project is an ESM module or a TypeScript project.
const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis();

exports.client = redis;