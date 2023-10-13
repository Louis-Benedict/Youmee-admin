import prisma from '@/app/libs/prismadb'
import { Prisma } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import bcrypt from 'bcrypt'
import { ApiError } from 'next/dist/server/api-utils'

export default async function createNewTeamMember({
    name,
    email,
    phoneNumber,
    role,
    image,
    password,
}: any) {
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const createdTeamMember = await prisma.user.create({
            data: {
                name,
                email,
                phoneNumber,
                role,
                image,
                hashedPassword,
            },
        })
        return createdTeamMember
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ApiError(
                    HttpStatusCode.InternalServerError,
                    'This email is already associated with an account.'
                )
            }
        }
    }
}
