import { NextRequest, NextResponse } from 'next/server'
import { withExceptionFilter } from '@/app/utils/middlewares/withExceptionFilter'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { ApiRouteParameter } from '@/app/types'
import { reject } from '@/app/actions/enrollee/rejectEnrollee'
import rateLimiter from '@/app/utils/RateLimiter'

async function rejectEnrollee(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const rateHeaders = await rateLimiter(req)
    const { enrolleeId } = urlParameter.params

    if (!enrolleeId) {
        throw new ApiError(
            HttpStatusCode.BadRequest,
            'Resource could not be found'
        )
    }

    const rejectedEnrollee = await reject(enrolleeId)

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [rejectedEnrollee] },
        { status: 200, headers: rateHeaders }
    )
}

export const POST = withExceptionFilter(rejectEnrollee)
