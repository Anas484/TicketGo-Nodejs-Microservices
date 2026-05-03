import "dotenv/config";
import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();
// let client : any;
// async function connectRedis() {
//   client = redis.createClient({
//     url: process.env.REDIS_URL || 'redis://localhost:6379',
//   });
//   client.on('error', (err :any) => {
//     console.error('Redis error:', err);
//   });
//   await client.connect();
//   console.log('Redis connected');
// }
// function getRedisClient() {
//   if (!client) {
//     throw new Error('Redis not initialized');
//   }
//   return client;
// }
export { redis };
//# sourceMappingURL=redisConfig.js.map