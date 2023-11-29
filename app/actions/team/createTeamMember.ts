import { TeamMember } from '@/app/(dashboard)/team/queries'
import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'
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

        if (!createdTeamMember) {
            throw new ApiError(
                HttpStatusCode.NotFound,
                'User could not be created'
            )
        }

        await redis.get(`teammember:all`, (_, res) => {
            if (res) {
                let cached = JSON.parse(res) as TeamMember[]
                cached.push(createdTeamMember)
                redis.set(`teammember:all`, JSON.stringify(cached))
            } else {
                console.warn('[REDIS] Error updating Key == teammembers:all')
            }
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
