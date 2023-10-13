import prisma from '@/app/libs/prismadb'

export interface IClipsParams {
	userId?: string
	category?: string
	price?: string
}

export default async function getClips(params: IClipsParams) {
	try {
		const { userId, price, category } = params

		let query: any = {}

		if (userId) {
			query.userId = userId
		}

		if (category) {
			query.category = category
		}

		if (price) {
			query.price = price
		}

		const clips = await prisma.clip.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		})

		const safeClips = clips.map((clip: any) => ({
			...clip,
			createdAt: clip.createdAt.toISOString(),
		}))

		return safeClips
	} catch (error: any) {
		throw new Error(error)
	}
}
