import prisma from '@/app/libs/prismadb';
import { CreatorWithClip } from '../types';

export default async function getUserByIdWithClips(
	userId?: string
): Promise<CreatorWithClip | null> {
	if (userId === 'undefined' || undefined) return null;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				clips: true,
			},
		});

		if (!user) {
			return null;
		}

		return {
			id: user.id,
			image: user.image,
			name: user.name,
			rating: user.rating,
			role: user.role,
			bio: user.bio,
			category: user.category,
			rate: user.rate,
			knownFor: user.knownFor,
			clip: user.clips,
		};
	} catch (error: any) {
		throw new Error(error);
	}
}
