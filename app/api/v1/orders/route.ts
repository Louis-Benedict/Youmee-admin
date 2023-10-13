import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(request: Request) {
	try {
		const orders = await prisma.order.findMany({
			include: {
				recipient: {
					select: {
						id: true,
						name: true,
					},
				},
				sender: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
		return NextResponse.json(orders);
	} catch (error) {
		console.log(error);
	}
}
