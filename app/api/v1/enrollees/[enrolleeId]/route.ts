import { NextRequest, NextResponse } from 'next/server'
import { getOne, update, _delete } from '@/app/actions/enrollee'
import { withExceptionFilter } from '@/app/utils/middlewares/withExceptionFilter'
import { HttpStatusCode } from 'axios'
import { ApiRouteParameter } from '@/app/types'
import { ApiError } from 'next/dist/server/api-utils'
import rateLimiter from '@/app/utils/RateLimiter'

async function deleteEnrollee(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const headers = await rateLimiter(req)
    const { enrolleeId } = urlParameter.params

    if (!enrolleeId) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    const deletedEnrollee = await _delete(enrolleeId)

    return NextResponse.json(
        { message: 'Success', status: 200, data: [deletedEnrollee] },
        { status: 200, headers }
    )
}

async function getEnrollee(req: NextRequest, urlParameter: ApiRouteParameter) {
    const headers = await rateLimiter(req)
    const { enrolleeId } = urlParameter.params

    if (!enrolleeId) {
        throw new ApiError(
            HttpStatusCode.BadRequest,
            'Resource could not be found'
        )
    }

    const enrollee = await getOne(enrolleeId)

    return NextResponse.json(
        { message: 'Success', status: 200, data: [enrollee] },
        { status: 200, headers }
    )
}

async function editEnrollee(req: NextRequest, urlParameter: ApiRouteParameter) {
    const { enrolleeId } = urlParameter.params
    const headers = await rateLimiter(req)

    if (!enrolleeId) {
        throw new ApiError(
            HttpStatusCode.BadRequest,
            'Resource could not be found'
        )
    }

    const body = await req.json()

    const { isContacted } = body

    const updatedEnrollee = await update(enrolleeId, { isContacted })

    return NextResponse.json(
        { message: 'Success', status: 200, data: [updatedEnrollee] },
        { status: 200, headers }
    )
}

export const DELETE = withExceptionFilter(deleteEnrollee)
export const GET = withExceptionFilter(getEnrollee)
export const PUT = withExceptionFilter(editEnrollee)
