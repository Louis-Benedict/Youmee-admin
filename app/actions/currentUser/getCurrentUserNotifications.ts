import prisma from '@/app/libs/prisma/prismadb'
import { grantRoleAccess } from '../util/checkRoleAccess'
import { ApiError } from 'next/dist/server/api-utils'
import { HttpStatusCode } from 'axios'

export default async function getCurrentUserNotifications() {
    const { role, id } = await grantRoleAccess([])

    const notifications = await prisma.notification.findMany({
        where: {
            userId: id,
            active: true,
        },
    })

    if (!notifications) {
        throw new ApiError(
            HttpStatusCode.NotFound,
            'Resource could not be found'
        )
    }

    return notifications
}
