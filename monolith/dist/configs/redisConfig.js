import "dotenv/config";
import redis from "redis";
let client;
async function connectRedis() {
    client = redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
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
export { getRedisClient, connectRedis };
//# sourceMappingURL=redisConfig.js.map