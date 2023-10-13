import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { s3 } from '@/app/libs/s3';
import { S3_BUCKET_BASEURL, S3_PUB_CONTENT_BUCKET_NAME, signPostConfig } from '@/app/config/s3';

interface IParams {
	fileType?: string;
}

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.error();

	const body = await request.json();
	const { fileType } = body;

	let fileExtension = fileType.split('/')[1];
	let key = `${nanoid()}.${fileExtension}`;
	let getUrl = S3_BUCKET_BASEURL;

	try {
		// Create a presigned POST request to upload the file to S3
		const { url: postUrl, fields } = (await new Promise((resolve, reject) => {
			s3.createPresignedPost(signPostConfig(key, 'image'), (err, signed) => {
				if (err) {
					console.log(err);
					return reject(err);
				}
				resolve(signed);
			});
		})) as { url: string; fields: any };

		const image = await prisma?.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				image: key,
			},
		});

		if (!image) return NextResponse.error();

		return NextResponse.json({ postUrl, getUrl, fields, key });
	} catch (error) {
		if (error) {
			return NextResponse.json(error);
		}

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message });
		}

		return NextResponse.json({ error: 'Something went wrong' });
	}
}
