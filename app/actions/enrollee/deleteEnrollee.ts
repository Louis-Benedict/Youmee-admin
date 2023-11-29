import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'
import { Enrollee } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function _delete(enrolleeId: string) {
    const deletedEnrollee = await prisma.enrollee.delete({
        where: { id: enrolleeId },
    })

    if (!deletedEnrollee) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    await redis.get('enrollee:all', (_, res) => {
        if (res) {
            const cached = JSON.parse(res) as Enrollee[]
            const updated = cached.filter(
                (enrollee) => enrollee.id !== enrolleeId
            )
            redis.set('enrollee:all', JSON.stringify(updated))
        } else {
            console.warn('[REDIS] Error updating Key == enrollee:all')
        }
    })
}
