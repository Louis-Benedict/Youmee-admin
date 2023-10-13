import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NotificationType, OrderStatus } from '@prisma/client';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) return NextResponse.error();

		const body = await request.json();

		console.log(body);

		const { targetOrderId } = body;

		const cancelledOrder = await prisma.order.update({
			where: {
				id: targetOrderId,
			},
			data: {
				status: OrderStatus.CANCELLED,
			},
		});
		const notification = await prisma.notification.create({
			data: {
				userId: cancelledOrder.senderUserId,
				type: NotificationType.ORDERCANCELLED,
				targetId: targetOrderId,
			},
		});
		if (!cancelledOrder) {
			return NextResponse.error();
		}
		return NextResponse.json({ cancelledOrder });
	} catch (error) {
		console.log(error);
	}
}
