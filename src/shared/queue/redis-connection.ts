import { Redis } from "ioredis";
import envs from "../config/envs";

export const redisConnection = new Redis(envs.REDIS_URL, {
    maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => console.log("Redis connected"));
redisConnection.on("error", (err) => console.error("Redis connection error:", err));