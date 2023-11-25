import redis from '@/app/libs/redis'
import { NextRequest } from 'next/server'
import { getRequestIpAdress } from './getRequestIp'

type Result = {
    limit: string
    remaining: string
    success: boolean
}

const rateLimiter = async (
    request: NextRequest,
    limit: number = 10,
    duration: number = 60
): Promise<Result> => {
    const ip = getRequestIpAdress(request)
    const key = `rate_limit:${ip}`
    let currentCount = await redis.get(key)
    let count = parseInt(currentCount!, 10) || 0
    if (count >= limit) {
        return {
            limit: `${limit}`,
            remaining: `${limit - count}`,
            success: false,
        }
    }
    redis.incr(key)
    redis.expire(key, duration)
    return {
        limit: `${limit}`,
        remaining: `${limit - (count + 1)}`,
        success: true,
    }
}

export default rateLimiter
