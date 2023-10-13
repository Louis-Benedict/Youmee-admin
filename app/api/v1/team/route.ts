import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'
import { withMiddleware } from '@/app/libs/middlewares/utils'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import withAuthGuard from '@/app/libs/middlewares/withAuthGuard'
import getAllTeamMembers from '@/app/actions/team/getAllTeamMembers'
import createNewTeamMember from '@/app/actions/team/postNewTeamMember'
import AWS from 'aws-sdk'
import JWT from 'jsonwebtoken'
import { inviteToAdmin } from '@/app/utils/email_templates/inviteToAdmin'
import { sesConfig } from '@/app/config/ses'
import { ApiError } from 'next/dist/server/api-utils'

async function getTeamMembers(req: NextRequest) {
    const teamMembers = await getAllTeamMembers()

    return NextResponse.json(
        { message: 'Success', status: 200, data: teamMembers },
        { status: 200 }
    )
}

async function createTeamMember(req: NextRequest) {
    const body = await req.json()
    const { name, email, phoneNumber, role, image, password } = body

    const createdTeamMember = await createNewTeamMember({
        name,
        email,
        phoneNumber,
        role,
        image,
        password,
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

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [createdTeamMember] },
        { status: 200 }
    )
}

export const GET = withExceptionFilter(getTeamMembers)

export const POST = withMiddleware([withAuthGuard([UserRole.ADMIN])])(
    withExceptionFilter(createTeamMember)
)
