import { NextRequest, NextResponse } from 'next/server'
import JWT from 'jsonwebtoken'
import rateLimiter from '@/app/utils/RateLimiter'
import { UserRole } from '@prisma/client'
import { withExceptionFilter } from '@/app/utils/middlewares/withExceptionFilter'
import { create, getAll } from '@/app/actions/team'
import { inviteToAdmin } from '@/app/utils/email_templates/inviteToAdmin'
import { grantRoleAccess } from '@/app/actions/util/checkRoleAccess'
import { sendEmail } from '@/app/libs/aws/ses/sesClient'

async function getTeamMembers(req: NextRequest) {
    const headers = await rateLimiter(req)
    const teamMembers = await getAll()

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

    const createdTeamMember = await create({
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

    await sendEmail(email, 'Invitation to Youmee Admin', invitationTemplate)

    return NextResponse.json(
        { message: 'Success', status: 200, data: [createdTeamMember] },
        { status: 200, headers }
    )
}

export const GET = withExceptionFilter(getTeamMembers)
export const POST = withExceptionFilter(createTeamMember)
