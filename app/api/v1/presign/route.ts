import { NextResponse } from 'next/server';
import preSignFile from '@/app/libs/s3';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
	try {
		const session = await getServerSession();
		if (!session) return NextResponse.error();

		const body = await request.json();
		console.log('FIIIIIIILE SSSSEEEEEEEEERVER: ' + body);
		const { fileType } = body;

		const { postUrl, getUrl, fields, key } = await preSignFile(fileType, 'image');

		return NextResponse.json({ postUrl, getUrl, fields, key });
	} catch (error) {
		console.log(error);
	}
}
