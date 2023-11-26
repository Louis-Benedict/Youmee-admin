import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import { ApiRouteParameter } from '@/app/types'

async function getAllEnrollees(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const { teamMemberId } = urlParameter.params

    const enrollees = await prisma.enrollee.findMany({
        where: {
            recruiterUserId: teamMemberId,
        },
    })
    return await NextResponse.json(
        { message: 'Success', status: 200, data: [enrollees] },
        { status: 200 }
    )
}

export const GET = withExceptionFilter(getAllEnrollees)
