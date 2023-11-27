import { TeamMember } from '@/app/(dashboard)/team/queries'
import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function _delete(teamMemberId: string) {
    await redis.del(`teammember:${teamMemberId}`)

    const deletedTeamMember = await prisma.user.delete({
        where: { id: teamMemberId },
    })

    if (!deletedTeamMember) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    await redis.get(`teammember:all`, (err, res) => {
        if (res) {
            const cached = JSON.parse(res) as TeamMember[]
            const updated = cached.filter(
                (teammember) => deletedTeamMember.id !== teamMemberId
            )
            redis.set(`teammember:all`, JSON.stringify(updated))
        } else {
            console.warn('[REDIS] Error updating Key == teammembers:all')
        }
    })

    return deletedTeamMember
}
