import prisma from '@/app/libs/prisma/prismadb'
import { grantRoleAccess } from '../util/checkRoleAccess'

export default async function getCurrentUserNotifications() {
    try {
        const { role, id } = await grantRoleAccess([])

        const notifications = await prisma.notification.findMany({
            where: {
                userId: id,
                active: true,
            },
        })

        if (!notifications) {
            return null
        }

        return notifications
    } catch (error: any) {
        return null
    }
}
