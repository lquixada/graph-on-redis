const { client } = require('../client');

client.flushdb()
  .then(data => console.log(data))
  .catch(err => console.error(err));