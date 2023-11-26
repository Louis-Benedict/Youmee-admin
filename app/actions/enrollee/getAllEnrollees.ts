import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'

export async function getAll() {
    const cachedEnrolles = await redis.get('enrollees')

    if (cachedEnrolles) {
        return JSON.parse(cachedEnrolles)
    } else {
        const enrollees = await prisma.enrollee.findMany({
            include: {
                recruiter: {
                    select: {
                        name: true,
                        image: true,
                        email: true,
                    },
                },
            },
        })
        await redis.set(`enrollees`, JSON.stringify(enrollees), 'EX', 60)

        return enrollees
    }
}
