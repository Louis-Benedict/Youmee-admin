import prisma from '@/app/libs/prismadb'
import redis from '@/app/libs/redis'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function getOne(teamMemberId: string) {
    const cachedTeamMember = await redis.get(`teammember:${teamMemberId}`)

    if (cachedTeamMember) {
        return JSON.parse(cachedTeamMember)
    } else {
        const teamMember = await prisma.user.findUnique({
            where: { id: teamMemberId },
        })

        if (!teamMember) {
            throw new ApiError(
                HttpStatusCode.NotFound,
                'Resource could not be found'
            )
        }

        await redis.set(
            `teammember:${teamMemberId}`,
            JSON.stringify(teamMember)
        )

        return teamMember
    }
}
