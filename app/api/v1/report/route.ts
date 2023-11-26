import { NextRequest, NextResponse } from 'next/server'
import { withExceptionFilter } from '@/app/utils/middlewares/withExceptionFilter'
import { errorReportTemplate } from '@/app/utils/email_templates/errorReport'
import { grantRoleAccess } from '@/app/actions/util/checkRoleAccess'
import rateLimiter from '@/app/utils/RateLimiter'

async function sendReport(req: NextRequest) {
    await grantRoleAccess([])
    const rateHeaders = await rateLimiter(req)

    const body = await req.json()
    const { name, encounterLocation, description } = body

    return NextResponse.json(
        { message: 'Success', status: 200, data: [] },
        { status: 200, headers: rateHeaders }
    )
}

export const POST = withExceptionFilter(sendReport)
