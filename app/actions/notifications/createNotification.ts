import { NotificationType } from '@prisma/client'
import prisma from '@/app/libs/prisma/prismadb'

type Args = {
    targetId: string
    userId: string
    notificationType: NotificationType
}

export default async function createNotification({
    targetId,
    userId,
    notificationType,
}: Args) {
    try {
        await prisma.notification.create({
            data: {
                targetId: targetId,
                userId: userId,
                type: notificationType,
            },
        })
    } catch (error) {
        console.error(error)
    }
}
