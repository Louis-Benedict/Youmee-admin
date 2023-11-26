import prisma from '@/app/libs/prisma/prismadb'
import getCurrentUser from '../currentUser/getCurrentUser'

export default async function getRequests() {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) return null

        const request = await prisma.order.findMany({
            orderBy: [{ createdAt: 'desc' }],
            where: {
                recipientUserId: currentUser?.id,
            },
            include: {
                sender: true,
            },
        })

        if (!request) return null

        return request
    } catch (error: any) {
        throw new Error(error)
    }
}
