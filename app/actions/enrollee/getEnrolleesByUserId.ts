import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'

export async function getByUserId(userId: string) {
    const cachedEnrolles = await redis.get(`enrollees:${userId}`)

    if (cachedEnrolles) {
        return JSON.parse(cachedEnrolles)
    } else {
        const enrollees = await prisma.enrollee.findMany({
            where: {
                recruiterUserId: userId,
            },
        })

        await redis.set(`enrollees:${userId}`, JSON.stringify(enrollees))
        return enrollees
    }
}
