import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'

export async function getEnrollees(teamMemberId: string) {
    const cachedEnrollees = await redis.get(
        `$teammember:${teamMemberId}:enrollees`
    )

    if (cachedEnrollees) {
        return JSON.parse(cachedEnrollees)
    } else {
        const enrollees = await prisma.enrollee.findMany({
            where: {
                recruiterUserId: teamMemberId,
            },
        })

        await redis.set(
            `$teammember:${teamMemberId}:enrollees`,
            JSON.stringify(enrollees)
        )

        return enrollees
    }
}
