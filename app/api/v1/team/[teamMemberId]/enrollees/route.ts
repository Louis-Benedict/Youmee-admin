import { withExceptionFilter } from '@/app/utils/middlewares/withExceptionFilter'
import { NextRequest, NextResponse } from 'next/server'
import { ApiRouteParameter } from '@/app/types'
import { getEnrollees } from '@/app/actions/team'
import { ApiError } from 'next/dist/server/api-utils'
import { HttpStatusCode } from 'axios'

async function getAllEnrollees(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const { teamMemberId } = urlParameter.params

    if (!teamMemberId) {
        throw new ApiError(
            HttpStatusCode.BadRequest,
            'Resource could not be found'
        )
    }

    const enrollees = await getEnrollees(teamMemberId)

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [enrollees] },
        { status: 200 }
    )
}

export const GET = withExceptionFilter(getAllEnrollees)
