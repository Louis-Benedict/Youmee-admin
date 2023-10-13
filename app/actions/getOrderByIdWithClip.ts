import prisma from '@/app/libs/prismadb';

interface IParams {
	orderId: string;
}

export default async function getOrderByIdWithClip(params: IParams) {
	try {
		const { orderId } = params;

		const order = await prisma.order.findUnique({
			where: {
				id: orderId,
			},
			include: { recipient: true, clip: true },
		});

		if (!order) {
			return null;
		}

		return order;
	} catch (error: any) {
		throw new Error(error);
	}
}
