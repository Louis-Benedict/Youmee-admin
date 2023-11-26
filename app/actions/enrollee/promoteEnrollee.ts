import prisma from '@/app/libs/prismadb'
import { EnrollmentStatus } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function promote(enrolleeId: string) {
    const existingEnrollee = await prisma.enrollee.findUnique({
        where: { id: enrolleeId },
    })

    if (!existingEnrollee) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Enrollee could not be found'
        )
    }

    const promotedEnrollee = await prisma.enrollee.update({
        where: {
            id: enrolleeId,
        },
        include: {
            recruiter: true,
        },
        data: {
            status:
                existingEnrollee.status === EnrollmentStatus.REJECTED
                    ? EnrollmentStatus.REQUESTED
                    : EnrollmentStatus.APPROVED,
        },
    })

    if (!promotedEnrollee) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Enrollee could not be promoted'
        )
    }

    return promotedEnrollee
}
