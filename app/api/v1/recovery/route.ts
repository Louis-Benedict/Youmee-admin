import sendGrid from '@sendgrid/mail'
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

        if (user.email) {
            let otp = Math.floor(Math.random() * 9000 + 1000).toString()
            const mail = recoveryMail(user.email, otp)
            sendGrid
                .send(mail)
                .then(() => {
                    return NextResponse.json(
                        { success: `Email has been send to ${user.email}` },
                        { status: 200 }
                    )
                })
                .catch(() => {
                    return NextResponse.json({
                        error: `We couldn't find your email`,
                    })
                })
        }

        return NextResponse.json({
            error: 'There was a problem with your request',
        })
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}
