import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { Review } from '@prisma/client';
import { NextResponse } from 'next/server';
import { reviewSchema } from '@/app/libs/validation/entityValidation';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) return NextResponse.error();

		const body = await request.json();

		const validatedReview = reviewSchema.safeParse(body);

		if (!validatedReview.success)
			return NextResponse.json({ error: 'Request invalid' });

		const { orderId, message, rating, recipientUserId, publicizeConsent } =
			validatedReview.data;

		const updatedOrderwithReview = await prisma.review.create({
			data: {
				senderUserId: currentUser.id,
				order: { connect: { id: orderId } },
				recipientUserId: recipientUserId,
				message: message,
				rating: rating,
				isPublic: publicizeConsent,
			},
		});

		const average_rating = await prisma.review.aggregate({
			where: { recipientUserId },
			_avg: { rating: true },
		});

		await prisma.user.update({
			where: { id: recipientUserId },
			data: { rating: average_rating._avg.rating },
		});

		if (!updatedOrderwithReview) return NextResponse.error();

		return NextResponse.json(updatedOrderwithReview);
	} catch (error) {
		console.log(error);
	}
}
