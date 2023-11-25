import redis from '@/app/libs/redis'
import { NextRequest, NextResponse } from 'next/server'
import { getRequestIpAdress } from './getRequestIp'
import { ApiError } from 'next/dist/server/api-utils'
import { HttpStatusCode } from 'axios'

const rateLimiter = async (
    request: NextRequest,
    response: NextResponse,
    limit: number = 60,
    duration: number = 60
) => {
    const ip = getRequestIpAdress(request)
    const key = `rate_limit:${ip}`
    let currentCount = await redis.get(key)
    let count = parseInt(currentCount!, 10) || 0

    if (count >= limit) {
        throw new ApiError(
            HttpStatusCode.TooManyRequests,
            'Too many requests. Try again later.'
        )
    }

    redis.incr(key)
    redis.expire(key, duration)

    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', `${limit - (count + 1)}`)
}

export default rateLimiter
