import prisma from '@/app/libs/prisma/prismadb'
import { EnrollmentStatus } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function reject(enrolleeId: string) {
    const updatedEnrollee = await prisma.enrollee.update({
        where: { id: enrolleeId },
        include: { recruiter: true },
        data: {
            status: EnrollmentStatus.REJECTED,
        },
    })

    if (!updatedEnrollee) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'User could not be updated'
        )
    }

    return updatedEnrollee
}
