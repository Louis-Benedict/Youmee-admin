import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'
import { Notification } from '@prisma/client'
import { ApiError } from 'next/dist/server/api-utils'
import { HttpStatusCode } from 'axios'

export async function create(fields: Omit<Notification, 'id' | 'createdAt'>) {
    const { userId } = fields

    const cachedNotification = await redis.get(`user:${userId}:notifications`)

    if (cachedNotification) return JSON.parse(cachedNotification)

    const notification = await prisma.notification.create({
        data: { ...fields },
    })

    if (!notification) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    await redis.set(
        `user:${userId}:notifications`,
        JSON.stringify(notification)
    )

    return notification
}
