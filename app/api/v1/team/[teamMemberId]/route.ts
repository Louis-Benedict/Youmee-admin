import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { UserRole } from '@prisma/client'
import withAuthGuard from '@/app/libs/middlewares/withAuthGuard'
import { withMiddleware } from '@/app/libs/middlewares/utils'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { ApiError } from '@/app/libs/middlewares/withLogging'
import { HttpStatusCode } from 'axios'
import { ApiRouteParameter } from '@/app/types'

async function deleteTeamMember(
    req: NextRequest,
    res: NextResponse,
    urlParameter?: ApiRouteParameter
) {
    const teamMemberId = urlParameter?.params.teamMemberId

    const deletedTeamMember = await prisma.user.delete({
        where: { id: teamMemberId },
    })

    if (!deletedTeamMember) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }
    return await NextResponse.json(
        { message: 'Success', status: 200, data: [deletedTeamMember] },
        { status: 200 }
    )
}

async function editTeamMember(
    req: NextRequest,
    res: NextResponse,
    urlParameter?: ApiRouteParameter
) {
    const teamMemberId = urlParameter?.params.teamMemberId

    const body = await req.json()
    const { name, phoneNumber, role, lineId, commissionPercentage } = body

    const editedTeamMember = await prisma.user.update({
        where: { id: teamMemberId },
        data: {
            name,
            phoneNumber,
            role,
            lineId,
            commissionPercentage,
        },
    })

    if (!editedTeamMember) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [editedTeamMember] },
        { status: 200 }
    )
}

async function getTeamMember(
    req: NextRequest,
    res: NextResponse,
    urlParameter?: ApiRouteParameter
) {
    const teamMemberId = urlParameter?.params.teamMemberId

    const teamMember = await prisma.user.findUnique({
        where: {
            id: teamMemberId,
        },
    })

    if (!teamMember) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [teamMember] },
        { status: 200 }
    )
}

export const DELETE = withExceptionFilter(deleteTeamMember)
export const PUT = withExceptionFilter(editTeamMember)

export const GET = withExceptionFilter(getTeamMember)
