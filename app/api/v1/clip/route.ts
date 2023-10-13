import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) return NextResponse.error();

		const body = await request.json();

		const { key } = body;

		const clip = await prisma?.clip.create({
			data: {
				userId: currentUser.id,
				duration: '0.50',
				clipUrl: key,
			},
		});

		if (!clip) return NextResponse.error();

		return NextResponse.json(clip);
	} catch (error) {
		console.log(error);
	}
}
