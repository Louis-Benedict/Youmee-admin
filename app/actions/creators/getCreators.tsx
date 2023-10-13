import prisma from '@/app/libs/prismadb';
import { Category, UserRole } from '@prisma/client';
import { CATEGORIES_PAGINATION_TAKE } from '../../static/config';

type PriceRange = {
	minPrice: string;
	maxPrice: string | undefined;
};

export default async function getCreators(
	category?: Category,
	priceRange?: PriceRange
) {
	let query: any = {
		role: UserRole.CREATOR,
	};

	if (category) query.category = category;

	if (priceRange?.maxPrice && priceRange.minPrice) {
		query.AND = [
			{
				rate: {
					gte: +priceRange.minPrice,
				},
			},
			{
				rate: {
					lte: +priceRange.maxPrice!,
				},
			},
		];
	}

	try {
		const creators = await prisma.user.findMany({
			where: query,
			take: CATEGORIES_PAGINATION_TAKE,
		});

		const count = await prisma.user.count({
			where: query,
		});

		const nextId = creators[CATEGORIES_PAGINATION_TAKE - 1]?.id;

		let data = {
			creatorCount: count,
			pages: [{ creators, nextId }],
			pageParam: [null],
		};

		return data;
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	}
}
