import prisma from '@/app/libs/prisma/prismadb'
import getCurrentUser from '../currentUser/getCurrentUser'

export default async function getOrdersWithRecipient() {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) return null

        const clips = await prisma.order.findMany({
            where: {
                senderUserId: currentUser.id,
            },
            include: {
                recipient: true,
            },
        })

        if (!clips) return null

        return clips
    } catch (error: any) {
        throw new Error(error)
    }
}
