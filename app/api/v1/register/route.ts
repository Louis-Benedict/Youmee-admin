import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { userRegisterSchema } from '@/app/libs/validation/authValidation'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

async function handler(request: Request) {
    try {
        const body = await request.json()
        if (!body) {
            return NextResponse.json({ error: 'Invalid Request' })
        }

        const result = userRegisterSchema.safeParse(body)
        if (!result.success)
            return NextResponse.json(
                { error: 'Invalid Request', status: 400 },
                { status: 400 }
            )

        const { password, email, name } = result.data
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        })
        return NextResponse.json(user)
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code == 'P2002')
                return NextResponse.json(
                    { error: 'Email is already taken' },
                    { status: 403 }
                )
        }
        return NextResponse.error()
    }
}

const routeHandler = handler
export { routeHandler as POST }
