import prisma from '@/app/libs/prismadb'
import redis from '@/app/libs/redis'

export async function getEnrollees(teamMemberId: string) {
    const cachedEnrollees = await redis.get(`$enrollees:${teamMemberId}`)

    if (cachedEnrollees) {
        return JSON.parse(cachedEnrollees)
    } else {
        const enrollees = await prisma.enrollee.findMany({
            where: {
                recruiterUserId: teamMemberId,
            },
        })

        await redis.set(`enrollees:${teamMemberId}`, JSON.stringify(enrollees))

        return enrollees
    }
}
