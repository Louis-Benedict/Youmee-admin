import prisma from '@/app/libs/prismadb'
import { Enrollee } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function update(
    enrolleeId: string,
    fields: Partial<Omit<Enrollee, 'id'>>
) {
    const updatedEnrollee = await prisma.enrollee.update({
        where: { id: enrolleeId },
        include: { recruiter: true },
        data: { ...fields },
    })

    if (!updatedEnrollee) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Update failed. Try again later.'
        )
    }

    return updatedEnrollee
}
