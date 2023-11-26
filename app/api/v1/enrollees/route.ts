import rateLimiter from '@/app/utils/RateLimiter'
import { create, getByUserId, getAll } from '@/app/actions/enrollee'
import { withExceptionFilter } from '@/app/utils/middlewares/withExceptionFilter'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { grantRoleAccess } from '@/app/actions/util/checkRoleAccess'

async function getAllEnrollees(req: NextRequest) {
    const role = await grantRoleAccess([])
    const rateHeaders = await rateLimiter(req)

    if (role === UserRole.RECRUITER) {
        const enrollees = getByUserId(role)

        return NextResponse.json(
            { message: 'Success', status: 200, data: enrollees },
            { status: 200, headers: rateHeaders }
        )
    }

    const enrollees = await getAll()

    return NextResponse.json(
        { message: 'Success', status: 200, data: enrollees },
        { status: 200, headers: rateHeaders }
    )
}

async function addEnrollee(req: NextRequest) {
    const body = await req.json()

    const {
        fullname,
        phoneNumber,
        birthday,
        lineId,
        country,
        alias,
        email,
        additionalInformation,
        note,
        recruiterUserId,
        instagramHandle,
        instagramFollowers,
        facebookHandle,
        facebookFollowers,
        tiktokHandle,
        tiktokFollowers,
        youtubeHandle,
        youtubeFollowers,
    } = body

    const newEnrollee = await create({
        fullname,
        phoneNumber,
        birthday,
        lineId,
        country,
        alias,
        email,
        additionalInformation,
        note,
        recruiterUserId,
        instagramHandle,
        instagramFollowers,
        facebookHandle,
        facebookFollowers,
        tiktokHandle,
        tiktokFollowers,
        youtubeHandle,
        youtubeFollowers,
    })

    if (!newEnrollee) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Could not create Enrollee'
        )
    }

    return NextResponse.json(
        { message: 'Success', status: 200, data: [newEnrollee] },
        { status: 200 }
    )
}

export const POST = withExceptionFilter(addEnrollee)
export const GET = withExceptionFilter(getAllEnrollees)
