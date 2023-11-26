import { NextRequest, NextResponse } from 'next/server'
import JWT from 'jsonwebtoken'
import AWS from 'aws-sdk'
import { UserRole } from '@prisma/client'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import getAllTeamMembers from '@/app/actions/team/getAllTeamMembers'
import createNewTeamMember from '@/app/actions/team/postNewTeamMember'
import { inviteToAdmin } from '@/app/utils/email_templates/inviteToAdmin'
import { sesConfig } from '@/app/config/ses'
import rateLimiter from '@/app/libs/RateLimiter'
import { grantRoleAccess } from '@/app/actions/checkRoleAccess'

async function getTeamMembers(req: NextRequest) {
    const headers = await rateLimiter(req)
    const teamMembers = await getAllTeamMembers()

    return NextResponse.json(
        { message: 'Success', status: 200, data: teamMembers },
        { status: 200, headers }
    )
}

async function createTeamMember(req: NextRequest) {
    await grantRoleAccess([UserRole.ADMIN])

    const headers = await rateLimiter(req)

    const body = await req.json()
    var {
        name,
        email,
        phoneNumber,
        role,
        image,
        lineId,
        commissionPercentage,
    } = body

    if (role !== UserRole.RECRUITER) {
        commissionPercentage = undefined
    }

    const createdTeamMember = await createNewTeamMember({
        name,
        email,
        phoneNumber,
        role,
        image,
        lineId,
        commissionPercentage,
    })

    const resetToken = JWT.sign({ email }, process.env.NEXTAUTH_SECRET!, {
        expiresIn: '7d',
    })

    const invitationTemplate = inviteToAdmin(name, resetToken)
    const params = sesConfig(
        email,
        'Invitation to Youmee Team',
        invitationTemplate
    )

    var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
        .sendEmail(params)
        .promise()

    const response = await sendPromise
    console.log(sendPromise)

    return NextResponse.json(
        { message: 'Success', status: 200, data: [createdTeamMember] },
        { status: 200, headers }
    )
}

export const GET = withExceptionFilter(getTeamMembers)

export const POST = withExceptionFilter(createTeamMember)
