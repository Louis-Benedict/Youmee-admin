import prisma from '@/app/libs/prismadb'
import redis from '@/app/libs/redis'
import { HttpStatusCode } from 'axios'
import { TeamMember } from '@/app/(dashboard)/team/queries'
import { ApiError } from 'next/dist/server/api-utils'

function key(strings: TemplateStringsArray, ...expr: any[]) {
    let postfix = strings[0]
    return `teammember:${postfix}`
}

export async function update(
    teamMemberId: string,
    fields: Partial<Omit<TeamMember, 'id'>>
) {
    const editedTeamMember = await prisma.user.update({
        where: { id: teamMemberId },
        data: { ...fields },
    })

    if (!editedTeamMember) {
        await redis.del(key`${teamMemberId}`)

        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    await redis.set(key`${teamMemberId}`, JSON.stringify(editedTeamMember))

    return editedTeamMember
}
