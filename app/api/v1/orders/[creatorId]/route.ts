import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(request: Request, { params }: { params: { creatorId: string } }) {
	const id = params.creatorId;

	try {
		const orders = await prisma.order.findMany({
			orderBy: { createdAt: 'desc' },
			where: { recipientUserId: id },
			include: { sender: true },
		});
		return NextResponse.json(orders);
	} catch (error) {
		return NextResponse.json(error);
	}
}
