import prisma from '@/app/libs/prismadb';
import { UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { creatorId: string } }) {
	const { creatorId } = params;
	try {
		console.log(creatorId);
		const creator = await prisma.user.findUnique({
			where: { id: creatorId },
		});

		return NextResponse.json(creator);
	} catch (error) {
		console.log(error);
	}
}
