import AWS from 'aws-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { sesConfig } from '@/app/config/ses'
import { ApiError } from 'next/dist/server/api-utils'
import { errorReportTemplate } from '@/app/utils/email_templates/errorReport'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { HttpStatusCode } from 'axios'

async function sendReport(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new ApiError(HttpStatusCode.Unauthorized, 'Not authorized')
    }

    const body = await req.json()
    const { name, encounterLocation, description } = body

    const invitationTemplate = errorReportTemplate(
        name,
        encounterLocation,
        description
    )
    const params = sesConfig(
        'info@louis-benedict.de',
        'New error report',
        invitationTemplate
    )

    var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
        .sendEmail(params)
        .promise()

    return NextResponse.json(
        { message: 'Success', status: 200, data: [] },
        { status: 200 }
    )
}

export const POST = withExceptionFilter(sendReport)
