import prisma from '@/app/libs/prismadb'
import redis from '@/app/libs/redis'

export async function getEnrollees() {
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
