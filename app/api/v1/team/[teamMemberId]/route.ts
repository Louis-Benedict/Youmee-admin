import { NextRequest, NextResponse } from 'next/server'
import { withExceptionFilter } from '@/app/utils/middlewares/withExceptionFilter'
import { ApiRouteParameter } from '@/app/types'
import { _delete, update, getOne } from '@/app/actions/team'

async function deleteTeamMember(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const { teamMemberId } = urlParameter.params

    const deletedTeamMember = await _delete(teamMemberId)

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [deletedTeamMember] },
        { status: 200 }
    )
}

async function editTeamMember(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const { teamMemberId } = urlParameter.params

    const body = await req.json()
    const { name, phoneNumber, role, lineId, commissionPercentage } = body

    const editedTeamMember = await update(teamMemberId, {
        name,
        phoneNumber,
        role,
        lineId,
        commissionPercentage,
    })

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [editedTeamMember] },
        { status: 200 }
    )
}

async function getTeamMember(
    req: NextRequest,
    urlParameter: ApiRouteParameter
) {
    const { teamMemberId } = urlParameter.params

    const teamMember = await getOne(teamMemberId)

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [teamMember] },
        { status: 200 }
    )
}

export const DELETE = withExceptionFilter(deleteTeamMember)
export const PUT = withExceptionFilter(editTeamMember)
export const GET = withExceptionFilter(getTeamMember)
