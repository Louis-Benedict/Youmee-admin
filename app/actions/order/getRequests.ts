import prisma from '@/app/libs/prisma/prismadb'
import { grantRoleAccess } from '../util/checkRoleAccess'

export default async function getRequests() {
    try {
        const { role, id } = await grantRoleAccess([])

        const request = await prisma.order.findMany({
            orderBy: [{ createdAt: 'desc' }],
            where: {
                recipientUserId: id,
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
