const { createClient } = require('redis');

(async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  exports.client = client;
})();