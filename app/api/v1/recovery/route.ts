import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import recoveryMail from '@/app/utils/email_templates/forgotPassword'

export async function POST(request: Request) {
    const body = await request.json()
    const { email } = body

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        })

        if (!user) return NextResponse.json({ error: 'User is not registered' })

        return NextResponse.json({
            error: 'There was a problem with your request',
        })
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}
