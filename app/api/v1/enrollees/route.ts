import { createEnrollee } from '@/app/actions/enrollee/createEnrollee'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import prisma from '@/app/libs/prismadb'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { ApiError } from 'next/dist/server/api-utils'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { UserRole } from '@prisma/client'

export async function getAllEnrollees(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new ApiError(
            HttpStatusCode.Unauthorized,
            'No permission to access this resource'
        )
    }

    let enrollees = []
    if (session.user.role === UserRole.RECRUITER) {
        enrollees = await prisma.enrollee.findMany({
            where: {
                recruiterUserId: session.user.id,
            },
        })
        return await NextResponse.json(
            { message: 'Success', status: 200, data: enrollees },
            { status: 200 }
        )
    }

    enrollees = await prisma.enrollee.findMany({
        include: {
            recruiter: {
                select: {
                    name: true,
                    image: true,
                    email: true,
                },
            },
        },
    })
    return await NextResponse.json(
        { message: 'Success', status: 200, data: enrollees },
        { status: 200 }
    )
}

async function newEnrollee(req: NextRequest) {
    const body = await req.json()
    console.log(body)
    const {
        fullname,
        phoneNumber,
        birthday,
        lineId,
        country,
        alias,
        email,
        referralCode,
        following,
        socialMediaHandle,
        additionalInformation,
        note,
        recruiterUserId,
    } = body

    const newEnrollee = await createEnrollee({
        fullname,
        phoneNumber,
        birthday,
        lineId,
        country,
        alias,
        email,
        referralCode,
        following,
        socialMediaHandle,
        additionalInformation,
        note,
        recruiterUserId,
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

export const POST = withExceptionFilter(newEnrollee)
export const GET = withExceptionFilter(getAllEnrollees)
