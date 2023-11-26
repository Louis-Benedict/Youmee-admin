import { TeamMember } from '@/app/(dashboard)/team/queries'
import prisma from '@/app/libs/prismadb'
import { Prisma } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import bcrypt from 'bcrypt'
import { ApiError } from 'next/dist/server/api-utils'

export async function create(
    fields: Partial<Omit<TeamMember, 'id'> & { password: string }>
) {
    try {
        const hashedPassword = await bcrypt.hash(
            fields.password || 'placeholder',
            12
        )

        const createdTeamMember = await prisma.user.create({
            data: { ...fields, hashedPassword },
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
