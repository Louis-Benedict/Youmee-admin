import prisma from '@/app/libs/prismadb'
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
}
