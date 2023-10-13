import prisma from '@/app/libs/prismadb'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { ApiError } from '@/app/libs/middlewares/withLogging'
import { HttpStatusCode } from 'axios'

async function changePassword(req: NextRequest) {
    const body = await req.json()
    const { token, password } = body

    const resetToken = JWT.verify(token, process.env.NEXTAUTH_SECRET!) as any

    const userEmail = resetToken.email

    if (!resetToken || !password) {
        throw new ApiError(
            HttpStatusCode.BadRequest,
            'Invalid information provided'
        )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const updatedUser = await prisma.user.update({
        where: { email: userEmail },
        data: {
            hashedPassword: hashedPassword,
            accountVerified: true,
        },
    })
    if (!updatedUser) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Could not change password'
        )
    }

    return NextResponse.json(
        { message: 'Success', status: 200, data: [updatedUser] },
        { status: 200 }
    )
}

export const PUT = withExceptionFilter(changePassword)
