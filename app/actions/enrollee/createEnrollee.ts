import prisma from '@/app/libs/prisma/prismadb'
import redis from '@/app/libs/redis/redis'
import { Enrollee, Prisma } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function create(
    fields: Omit<
        Enrollee,
        | 'id'
        | 'createdAt'
        | 'status'
        | 'isContacted'
        | 'referralCode'
        | 'profileLink'
    >
) {
    try {
        const createdEnrollee = await prisma.enrollee.create({
            data: { ...fields },
            include: { recruiter: true },
        })

        if (!createdEnrollee) {
            throw new ApiError(
                HttpStatusCode.InternalServerError,
                'Enrollee could not be created'
            )
        }

        await redis.get(`enrollee:all`, (_, res) => {
            if (res) {
                let cached = JSON.parse(res) as Enrollee[]
                cached.push(createdEnrollee)
                redis.set(`enrollee:all`, JSON.stringify(cached))
            } else {
                console.warn('[REDIS] Error updating Key == enrollee:all')
            }
        })

        return createdEnrollee
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ApiError(
                    HttpStatusCode.InternalServerError,
                    'This email is already associated with an Enrollee'
                )
            }
        }
    }
}
