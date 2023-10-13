import { NextResponse } from 'next/server';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { HTTP_METHOD } from 'next/dist/server/web/http';

export default function withMethodGuard(methods: HTTP_METHOD[]) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		return async (handler: NextApiHandler) => {
			if (methods.includes(req.method as HTTP_METHOD)) {
				await handler(req, res);
			} else {
				return NextResponse.json({ error: 'This method is not supported' });
			}
		};
	};
}
