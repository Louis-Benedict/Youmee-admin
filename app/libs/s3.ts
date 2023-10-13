import S3 from 'aws-sdk/clients/s3';
import { S3_BUCKET_BASEURL, signPostConfig } from '../config/s3';
import { nanoid } from 'nanoid';

export const s3 = new S3({
	apiVersion: '2006-03-01',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
	signatureVersion: 'v4',
});

export default async function preSignFile(fileType: string, file: string) {
	let fileExtension = fileType.split('/')[1];
	let key = `${nanoid()}.${fileExtension}`;
	let getUrl = S3_BUCKET_BASEURL;

	const { url: postUrl, fields } = (await new Promise((resolve, reject) => {
		s3.createPresignedPost(signPostConfig(key, file), (err, signed) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			resolve(signed);
		});
	})) as { url: string; fields: any };

	return { postUrl, getUrl, fields, key };
}
