import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';
import { HttpStatusCode } from 'axios';
import { getToken } from 'next-auth/jwt';
import logger from '@/app/utils/logger';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export declare class ApiError extends Error {
	readonly statusCode: number;
	constructor(statusCode: number, message: string);
}

function getExceptionStatus(exception: unknown) {
	return exception instanceof ApiError ? exception.statusCode : HttpStatusCode.InternalServerError;
}

function getExceptionMessage(exception: unknown) {
	return isError(exception) ? exception.message : `Internal Server Error`;
}

function getExceptionStack(exception: unknown) {
	return isError(exception) ? exception.stack : undefined;
}

function isError(exception: unknown): exception is Error {
	return exception instanceof Error;
}
export default function withExceptionHandler(req: NextApiRequest, res: NextApiResponse) {
	return async (handler: NextApiHandler) => {
		try {
			await handler(req, res);
		} catch (exception) {
			const { url, headers } = req;

			const statusCode = getExceptionStatus(exception);
			const message = getExceptionMessage(exception);
			const stack = getExceptionStack(exception);

			const user = await getToken({ req });
			const userId = user?.id ?? 'Not Authenticated';

			console.log(headers);

			// const referer = headers.get('referer');
			// const userAgent = headers.get('user-agent');

			// this is the context being logged
			const requestContext = { url, userId, message };

			// edit the message according to your preferences
			const exceptionMessage = `An unhandled exception occurred.`;

			logger.error(requestContext, exceptionMessage);

			if (stack) {
				logger.debug(stack);
			}

			const timestamp = new Date().toISOString();

			const responseBody = {
				statusCode,
				timestamp,
				path: req.url,
			};
			return res.status(statusCode).send(responseBody);
		}
	};
}
