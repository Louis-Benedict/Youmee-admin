import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ApiError } from '../libs/middlewares/withLogging'
import { HttpStatusCode } from 'axios'

export async function registerUser(
    password: string,
    email: string,
    name: string
) {
    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        })
        return user
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code == 'P2002')
                throw new ApiError(
                    HttpStatusCode.InternalServerError,
                    'Email is already taken'
                )
        }
    }
}
