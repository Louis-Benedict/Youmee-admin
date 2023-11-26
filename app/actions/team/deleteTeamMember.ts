import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function _delete(teamMemberId: string) {
    const deletedTeamMember = await prisma.user.delete({
        where: { id: teamMemberId },
    })

    if (!deletedTeamMember) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    return deletedTeamMember
}
