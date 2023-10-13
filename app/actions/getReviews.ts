import prisma from '@/app/libs/prismadb';

export default async function getReviews(creatorId?: string) {
	if (creatorId === 'undefined' || undefined) return null;
	try {
		const reviews = await prisma.review.findMany({
			where: {
				isPublic: true,
				recipientUserId: creatorId,
			},
			include: {
				sender: { select: { name: true, image: true } },
				order: { select: { occasion: true } },
			},
		});

		if (!reviews) throw new Error();
		const updated = reviews.map((item) => {
			return {
				id: item.id,
				occasion: item.order?.[0]?.occasion,
				image: item.sender.image,
				senderName: item.sender.name,
				senderImage: item.sender.image,
				message: item.message,
				rating: item.rating,
			};
		});

		return updated;
	} catch (error: any) {
		throw new Error(error);
	}
}
