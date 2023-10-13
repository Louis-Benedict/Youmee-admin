import { NextResponse } from 'next/server';
import preSignFile, { s3 } from '@/app/libs/s3';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
	const session = await getServerSession();
	if (!session) return NextResponse.error();

	try {
		const body = await request.json();

		const { fileType, targetOrderId } = body;

		const { postUrl, getUrl, fields, key } = await preSignFile(
			fileType,
			'video'
		);

		return NextResponse.json({ postUrl, getUrl, fields, key });
	} catch (error) {
		return NextResponse.json({ error: 'Something went wrong' });
	}
}
