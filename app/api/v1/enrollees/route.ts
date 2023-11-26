import rateLimiter from '@/app/libs/RateLimiter'
import { createEnrollee } from '@/app/actions/enrollee/createEnrollee'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { ApiError } from 'next/dist/server/api-utils'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { UserRole } from '@prisma/client'
import { getEnrollees } from '@/app/actions/enrollee/getAllEnrollees'
import { getEnrolleesByUserId } from '@/app/actions/enrollee/getEnrolleesByUserId'

async function getAllEnrollees(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new ApiError(
            HttpStatusCode.Unauthorized,
            'No permission to access this resource'
        )
    }

    const headers = await rateLimiter(req)

    if (session.user.role === UserRole.RECRUITER) {
        const enrollees = getEnrolleesByUserId(session.user.id)

        return NextResponse.json(
            { message: 'Success', status: 200, data: enrollees },
            { status: 200, headers }
        )
    }

    const enrollees = await getEnrollees()

    return NextResponse.json(
        { message: 'Success', status: 200, data: enrollees },
        { status: 200, headers }
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

    const newEnrollee = await createEnrollee({
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
