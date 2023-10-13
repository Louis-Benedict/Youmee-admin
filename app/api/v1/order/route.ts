import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NotificationType, UserRole } from '@prisma/client';
import dayjs from 'dayjs';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();

		// if (!(currentUser?.role == UserRole.USER)) return NextResponse.error();

		const body = await request.json();

		const {
			recipientId,
			occasion,
			message,
			video_for,
			for: forName,
			for_gender,
			from,
			from_gender,
		} = body;

		let deadline = dayjs().add(7, 'day');

		if (currentUser?.id === recipientId)
			return NextResponse.json(
				{ error: 'Nice try. You cannot order yourself' },
				{ status: 403 }
			);

		try {
			const order = await prisma.order.create({
				data: {
					sender: { connect: { id: currentUser?.id } },
					recipient: { connect: { id: recipientId } },
					fromGender: from_gender,
					fromName: from,
					forGender: for_gender,
					forName: forName,
					forPerson: video_for,
					expiryDate: deadline.toISOString(),
					//isPaid is default false
					occasion: occasion,
					directions: message,
				},
			});

			await prisma.notification.create({
				data: {
					targetId: order.id,
					userId: recipientId,
					type: NotificationType.REQUEST,
				},
			});

			if (!order) {
				return NextResponse.error();
			}
			return NextResponse.json(
				{ message: 'Order created successfully', data: order.id },
				{ status: 200 }
			);
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
	}
}
