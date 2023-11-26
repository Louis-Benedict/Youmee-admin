import prisma from '@/app/libs/prismadb'
import redis from '@/app/libs/redis'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function getOne(enrolleeId: string) {
    const cachedEnrollee = await redis.get(`enrollee:${enrolleeId}`)

    if (cachedEnrollee) {
        return JSON.parse(cachedEnrollee)
    } else {
        const enrollee = await prisma.enrollee.findUnique({
            where: { id: enrolleeId },
        })

        if (!enrollee) {
            throw new ApiError(
                HttpStatusCode.BadRequest,
                'Resource could not be found'
            )
        }

        await redis.set(`enrollee:${enrolleeId}`, JSON.stringify(enrollee))

        return enrollee
    }
}
