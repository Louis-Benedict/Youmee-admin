import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

interface IParams {
	favoriteIds: any
}

export default async function getUsersById(params: IParams) {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser) throw new Error()
		const { favoriteIds } = params

		const user = await prisma.user.findMany({
			where: {
				id: { in: favoriteIds },
			},
		})

		if (!user) {
			return null
		}

		return user
	} catch (error: any) {
		throw new Error(error)
	}
}
