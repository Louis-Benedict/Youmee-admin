import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'
import { UserRole } from '@prisma/client'

export async function getAll() {
    const cachedTeamMembers = await redis.get('teammember:all')

    if (cachedTeamMembers) {
        return JSON.parse(cachedTeamMembers)
    } else {
        const teamMembers = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        role: UserRole.RECRUITER,
                    },
                    {
                        role: UserRole.ADMIN,
                    },
                    {
                        role: UserRole.TEAM,
                    },
                ],
            },
        })

        await redis.set('teammember:all', JSON.stringify(teamMembers))
        return teamMembers
    }
}
