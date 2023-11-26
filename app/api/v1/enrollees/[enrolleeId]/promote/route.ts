import { NextRequest, NextResponse } from 'next/server'
import { EnrollmentStatus, UserRole } from '@prisma/client'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import createCreatorFromEnrollee from '@/app/actions/creators/createCreatorFromEnrollee'
import { ApiRouteParameter } from '@/app/types'
import { grantRoleAccess } from '@/app/actions/checkRoleAccess'
import { promote } from '@/app/actions/enrollee/promoteEnrollee'

async function promoteEnrollee(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    await grantRoleAccess([UserRole.ADMIN, UserRole.RECRUITER])

    const { enrolleeId } = urlParameter.params

    if (!enrolleeId) {
        throw new ApiError(HttpStatusCode.BadRequest, 'Bad Request')
    }

    const promotedEnrollee = await promote(enrolleeId)

    if (promotedEnrollee.status === EnrollmentStatus.APPROVED) {
        const newCreator = await createCreatorFromEnrollee(promotedEnrollee)

        if (!newCreator) {
            throw new ApiError(
                HttpStatusCode.InternalServerError,
                'User could not be promoted'
            )
        }
    }

    return await NextResponse.json(
        { message: 'Success', data: [promotedEnrollee] },
        { status: 200 }
    )
}

export const POST = withExceptionFilter(promoteEnrollee)
