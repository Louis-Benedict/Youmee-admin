import prisma from '@/app/libs/prisma/prismadb'
import { grantRoleAccess } from '../util/checkRoleAccess'

export default async function getOrdersWithRecipient() {
    try {
        const { role, id } = await grantRoleAccess([])

        const clips = await prisma.order.findMany({
            where: {
                senderUserId: id,
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
