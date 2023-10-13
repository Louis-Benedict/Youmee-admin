import prisma from '@/app/libs/prismadb'
import { Enrollee, Prisma, UserRole } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export default async function createCreatorFromEnrollee(enrollee: Enrollee) {
    try {
        const newCreator = await prisma.user.create({
            data: {
                role: UserRole.CREATOR,
                name: enrollee.fullname,
                phoneNumber: enrollee.phoneNumber,
                email: enrollee.email,
                lineId: enrollee.lineId,
                alias: enrollee.alias,
                country: enrollee.country,
                accountVerified: false,
            },
        })
        return newCreator
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ApiError(
                    HttpStatusCode.InternalServerError,
                    'Email is already taken'
                )
            }
        }
    }
}
