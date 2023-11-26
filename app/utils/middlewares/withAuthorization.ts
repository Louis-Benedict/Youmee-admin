import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';
import { UserRole } from '@prisma/client';

export const withAuthorization: MiddlewareFactory = (next) => {
	return async (request: NextRequest, _next: NextFetchEvent) => {
		const pathname = request.nextUrl.pathname;
		const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

		const sensitiveAdminRoutes = ['/admin', '/analytics'];
		const sensitiveCreatorRoutes = ['/creator'];

		const isAdmin = token?.role == UserRole.ADMIN;
		const isCreator = token?.role == UserRole.CREATOR;

		if (!isAdmin && sensitiveAdminRoutes.some((route) => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL('/not-authorized', request.url));
		}
		if (!isCreator && sensitiveCreatorRoutes.some((route) => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL('/not-authorized', request.url));
		}

		return next(request, _next);
	};
};
