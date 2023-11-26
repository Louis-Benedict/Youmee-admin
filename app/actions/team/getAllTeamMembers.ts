import prisma from '@/app/libs/prismadb'
import redis from '@/app/libs/redis'
import { UserRole } from '@prisma/client'

export async function getAll() {
    const cachedTeamMembers = await redis.get('team:all')

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

        await redis.set('team:all', JSON.stringify(teamMembers))
        return teamMembers
    }
}
