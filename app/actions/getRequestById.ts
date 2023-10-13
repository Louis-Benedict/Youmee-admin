import prisma from '@/app/libs/prismadb';

interface IParams {
	requestId: string;
}

export default async function getUserById(params: IParams) {
	try {
		const { requestId } = params;

		const request = await prisma.order.findUnique({
			where: {
				id: requestId,
			},
			include: {
				sender: true,
				clip: true,
			},
		});

		if (!request) {
			return null;
		}

		return request;
	} catch (error: any) {
		throw new Error(error);
	}
}
