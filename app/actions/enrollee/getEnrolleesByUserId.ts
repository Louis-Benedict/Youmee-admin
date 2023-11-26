import prisma from '@/app/libs/prismadb'
import redis from '@/app/libs/redis'

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

        await redis.set(
            `enrollees:${userId}`,
            JSON.stringify(enrollees),
            'EX',
            60
        )
        return enrollees
    }
}
