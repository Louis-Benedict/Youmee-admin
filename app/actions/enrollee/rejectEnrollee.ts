import prisma from '@/app/libs/prismadb'
import { EnrollmentStatus } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function reject(enrolleeId: string) {
    const existingEnrollee = await prisma.enrollee.findUnique({
        where: { id: enrolleeId },
    })

    if (!existingEnrollee) {
        throw new ApiError(HttpStatusCode.NotFound, 'User could not be found')
    }

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
}
