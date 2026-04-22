const redis = require('redis');

let client;

async function connectRedis() {
  client = redis.createClient({
    url: 'redis://localhost:6379',
  });

  client.on('error', (err) => {
    console.error('Redis error:', err);
  });

  await client.connect();

  console.log('Redis connected');
}

function getRedisClient() {
  if (!client) {
    throw new Error('Redis not initialized');
  }
  return client;
}

module.exports = {
  connectRedis,
  getRedisClient,
};