import prisma from '@/app/libs/prisma/prismadb'
import { UserRole } from '@prisma/client'

export default async function getCreatorByOrderAmount(rate: number) {
    try {
        const creatorsByRate = await prisma.user.findMany({
            take: 6,
            where: {
                AND: [
                    {
                        role: {
                            equals: UserRole.CREATOR,
                        },
                    },
                    {
                        rate: {
                            lt: rate,
                        },
                    },
                ],
            },
            orderBy: {
                recieved: {
                    _count: 'desc',
                },
            },
        })

        if (!creatorsByRate) {
            return null
        }

        return creatorsByRate
    } catch (error: any) {
        throw new Error(error)
    }
}
