import prisma from '@/app/libs/prisma/prismadb'
import { UserRole } from '@prisma/client'

export default async function getByOrderAmount() {
    try {
        const mostBookedCreators = await prisma.user.findMany({
            take: 6,
            where: {
                role: UserRole.CREATOR,
            },
            orderBy: {
                recieved: {
                    _count: 'desc',
                },
            },
        })

        if (!mostBookedCreators) {
            return null
        }

        return mostBookedCreators
    } catch (error: any) {
        throw new Error(error)
    }
}
