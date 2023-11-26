import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { EnrollmentStatus, UserRole } from '@prisma/client'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import createCreatorFromEnrollee from '@/app/actions/creators/createCreatorFromEnrollee'
import { ApiRouteParameter } from '@/app/types'

async function promoteEnrollee(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const { enrolleeId } = urlParameter.params

    if (!enrolleeId) {
        throw new ApiError(HttpStatusCode.BadRequest, 'Bad Request')
    }
    const existingEnrollee = await prisma.enrollee.findUnique({
        where: { id: enrolleeId },
    })

    if (!existingEnrollee) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Enrollee could not be found'
        )
    }

    if (existingEnrollee.status === EnrollmentStatus.REJECTED) {
        const promotedEnrollee = await prisma.enrollee.update({
            where: {
                id: enrolleeId,
            },
            include: {
                recruiter: true,
            },
            data: {
                status: EnrollmentStatus.REQUESTED,
            },
        })

        if (!promotedEnrollee) {
            throw new ApiError(
                HttpStatusCode.InternalServerError,
                'Enrollee could not be promoted'
            )
        }
        return await NextResponse.json(
            { message: 'Success', data: [promotedEnrollee] },
            { status: 200 }
        )
    }

    const updatedEnrollee = await prisma.enrollee.update({
        where: { id: enrolleeId },
        include: { recruiter: true },
        data: { status: EnrollmentStatus.APPROVED },
    })

    if (!updatedEnrollee) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Enrollee could not be updated'
        )
    }
    const newCreator = await createCreatorFromEnrollee(updatedEnrollee)

    if (!newCreator) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'User could not be promoted'
        )
    }

    return await NextResponse.json(
        { message: 'Success', data: [updatedEnrollee] },
        { status: 200 }
    )
}

export const POST = withExceptionFilter(promoteEnrollee)
