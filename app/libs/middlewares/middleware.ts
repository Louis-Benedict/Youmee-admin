import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareFactory } from './types';

export const withLogging: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const device = request.headers.get('Sec-Ch-Ua-Platform');
		console.log('Accessing', request.nextUrl.pathname, 'using ', device);
		return next(request, _next);
	};
};
