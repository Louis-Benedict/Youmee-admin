import Redis, { RedisOptions } from 'ioredis'

declare global {
    var redis: Redis | undefined
}

const options: RedisOptions = {
    host: process.env.REDIS_HOST!,
    password: process.env.REDIS_PASSWORD!,
    port: parseInt(process.env.REDIS_PORT!, 10),
}

const client = globalThis.redis || new Redis(options)

if (process.env.NODE_ENV !== 'production') globalThis.redis = client

export default client
