import "dotenv/config";
declare function connectRedis(): Promise<void>;
declare function getRedisClient(): any;
export { getRedisClient, connectRedis };
//# sourceMappingURL=redisConfig.d.ts.map