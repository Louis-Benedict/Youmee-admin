import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'
import { HttpStatusCode } from 'axios'
import { TeamMember } from '@/app/(dashboard)/team/queries'
import { ApiError } from 'next/dist/server/api-utils'

export async function update(
    teamMemberId: string,
    fields: Partial<Omit<TeamMember, 'id'>>
) {
    const editedTeamMember = await prisma.user.update({
        where: { id: teamMemberId },
        data: { ...fields },
    })

    if (!editedTeamMember) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    await redis.set(
        `teammember:${teamMemberId}`,
        JSON.stringify(editedTeamMember)
    )

    await redis.get(`teammember:all`, (_, res) => {
        if (res) {
            const cached = JSON.parse(res) as TeamMember[]
            const updated = cached.filter(
                (teammember) => teammember.id !== teamMemberId
            )
            updated.push(editedTeamMember)
            redis.set(`teammember:all`, JSON.stringify(updated))
        } else {
            console.warn('[REDIS] Error updating Key == teammembers:all')
        }
    })

    return editedTeamMember
}
