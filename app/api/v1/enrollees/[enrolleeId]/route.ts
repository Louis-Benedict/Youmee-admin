import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { UserRole } from '@prisma/client'
import getEnrolleeById from '@/app/actions/enrollee/getEnrolleeById'
import withAuthGuard from '@/app/libs/middlewares/withAuthGuard'
import { withMiddleware } from '@/app/libs/middlewares/utils'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { HttpStatusCode } from 'axios'
import { ApiRouteParameter } from '@/app/types'
import { ApiError } from 'next/dist/server/api-utils'

async function deleteEnrollee(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const { enrolleeId } = urlParameter.params

    console.log(enrolleeId)

    if (!enrolleeId) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    const deletedEnrollee = await prisma.enrollee.delete({
        where: { id: enrolleeId },
    })

    if (!deletedEnrollee) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }
    return NextResponse.json(
        { message: 'Success', status: 200, data: [deletedEnrollee] },
        { status: 200 }
    )
}

async function getEnrollee(
    req: NextRequest,

    urlParameter: ApiRouteParameter
) {
    const { enrolleeId } = urlParameter.params

    if (!enrolleeId) {
        throw new ApiError(
            HttpStatusCode.BadRequest,
            'Resource could not be found'
        )
    }

    const enrollee = await getEnrolleeById(enrolleeId)

    if (!enrollee) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    return NextResponse.json(
        { message: 'Success', status: 200, data: [enrollee] },
        { status: 200 }
    )
}

async function editEnrollee(req: NextRequest, urlParameter: ApiRouteParameter) {
    const { enrolleeId } = urlParameter.params

    if (!enrolleeId) {
        throw new ApiError(
            HttpStatusCode.BadRequest,
            'Resource could not be found'
        )
    }

    const body = await req.json()

    const { isContacted } = body

    if (!enrolleeId) {
        throw new ApiError(
            HttpStatusCode.BadRequest,
            'Resource could not be found'
        )
    }

    const enrollee = await prisma.enrollee.update({
        where: { id: enrolleeId },
        include: { recruiter: true },
        data: {
            isContacted,
        },
    })

    if (!enrollee) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    return NextResponse.json(
        { message: 'Success', status: 200, data: [enrollee] },
        { status: 200 }
    )
}

export const DELETE = withExceptionFilter(deleteEnrollee)

export const GET = withExceptionFilter(getEnrollee)
export const PUT = withExceptionFilter(editEnrollee)
