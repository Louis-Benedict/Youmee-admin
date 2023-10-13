import prisma from '@/app/libs/prismadb';
import { UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { take: string } }) {
	try {
		const creators = await prisma.user.findMany({
			where: { role: UserRole.CREATOR },
			orderBy: { createdAt: 'desc' },
		});
		return NextResponse.json(creators);
	} catch (error) {
		console.log(error);
	}
}


export async function POST(request: Request, { params }: { params: { id: string } }) {
	const body = await request.json();
	const { id } = body;

	try {
		const creators = await prisma.user.delete({
			where: {
				id: id,
			},
		});
		return NextResponse.json(creators);
	} catch (error) {
		console.log(error);
	}
}
