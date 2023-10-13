import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
	try {
		const userSession = await getServerSession(authOptions);
		if (!userSession || !userSession.user.id) return NextResponse.error();

		const notifications = await prisma.notification.findMany({
			where: {
				userId: userSession.user.id,
				active: true,
			},
			orderBy: { createdAt: 'desc' },
			take: 6,
		});

		if (!notifications) {
			return NextResponse.error();
		}
		return NextResponse.json(notifications);
	} catch (error) {
		console.log(error);
	}
}

interface IParams {
	targetId?: string;
}

export async function PATCH(request: Request) {
	try {
		const userSession = await getServerSession(authOptions);
		if (!userSession) return NextResponse.error();

		const { targetId } = await request.json();

		if (!targetId || typeof targetId !== 'string') {
			throw new Error('Invalid ID');
		}

		const notifications = await prisma.notification.updateMany({
			where: {
				AND: [{ userId: userSession.user.id }, { targetId: targetId }],
			},
			data: {
				active: false,
			},
		});

		console.log(notifications);

		if (!notifications) {
			return NextResponse.error();
		}
		return NextResponse.json(notifications);
	} catch (error) {
		console.log(error);
	}
}
