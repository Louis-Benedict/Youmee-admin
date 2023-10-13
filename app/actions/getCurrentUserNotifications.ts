import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getCurrentUserNotifications() {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser) return null

		const notifications = await prisma.notification.findMany({
			where: {
				userId: currentUser.id,
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
