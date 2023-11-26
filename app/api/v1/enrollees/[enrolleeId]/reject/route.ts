import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { EnrollmentStatus } from '@prisma/client'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { ApiRouteParameter } from '@/app/types'

async function rejectEnrollee(
    req: NextRequest,
    res: NextResponse,
    urlParameter?: ApiRouteParameter
) {
    const enrolleeId = urlParameter?.params.enrolleeId

    if (!enrolleeId) {
        throw new ApiError(HttpStatusCode.BadRequest, 'Something went wrong...')
    }

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

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [updatedEnrollee] },
        { status: 200 }
    )
}

export const POST = withExceptionFilter(rejectEnrollee)
