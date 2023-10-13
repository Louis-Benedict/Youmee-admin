import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session) return NextResponse.json('Not authorized', { status: 403 });

	const body = await req.json();
	const { creatorId, for_name, video_for, occasion, message } = body;
	console.log('🚀 ~ file: route.ts:15 ~ POST ~ body:', body);

	try {
		const creator = await prisma.user.findUnique({
			where: {
				id: creatorId,
			},
		});

		if (!creator || !creator.rate)
			return NextResponse.json('Resource is not available', { status: 404 });

		const { client_secret } = await stripe.paymentIntents.create({
			amount: creator.rate * 100,
			currency: 'THB',
			metadata: {
				userId: session.user.id,
				creatorId: creatorId,
				forName: for_name,
				forPerson: video_for,
				occasion: occasion,
				message: message,
			},
			automatic_payment_methods: { enabled: true },
		});

		return NextResponse.json({ client_secret });
	} catch (error: any) {
		console.log('🚀 ~ file: route.ts:43 ~ POST ~ error:', error);
		return new NextResponse(error, {
			status: 400,
		});
	}
}
