import prisma from '@/app/libs/prisma/prismadb'
import { UserRole } from '@prisma/client'
import { TempCreator } from '../../types'

export default async function getWithIntroductionClip(
    maxPrice?: number,
    take?: number
): Promise<TempCreator[] | null> {
    try {
        const creatorWithClip = await prisma.user.findMany({
            take: take,
            where: {
                AND: [
                    {
                        role: {
                            equals: UserRole.CREATOR,
                        },
                    },
                    {
                        rate: {
                            lt: maxPrice,
                        },
                    },
                ],
            },
            include: {
                clips: {
                    take: 1,
                },
            },
            orderBy: {
                recieved: {
                    _count: 'desc',
                },
            },
        })

        if (!creatorWithClip) {
            return null
        }

        const updated = creatorWithClip.map((item) => {
            return {
                id: item.id,
                image: item.image,
                name: item.name,
                rating: item.rating,
                rate: item.rate,
                knownFor: item.knownFor,
                clip: item.clips?.[0],
            }
        })

        return updated
    } catch (error: any) {
        throw new Error(error)
    }
}
