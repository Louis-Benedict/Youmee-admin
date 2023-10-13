import { UserRole } from '@prisma/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function withAdmin(req: NextApiRequest, res: NextApiResponse) {
	return async function (handler: NextApiHandler) {
		const token = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
		const isAdmin = token?.role === UserRole.ADMIN;
		if (!isAdmin) return new NextResponse('Not authorized', { status: 403 });

		return handler(req, res);
	};
}
