import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import withAdmin from '@/app/libs/middlewares/withAdmin';
import { withMiddleware } from '@/app/libs/middlewares/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import withExceptionHandler from '@/app/libs/middlewares/withLogging';
import withMethodGuard from '@/app/libs/middlewares/withMethodGuard';
import dayjs from 'dayjs';
import { getByHour, getbyDay } from './aggregation';

export async function GET(request: NextRequest) {
	const startDate = request.nextUrl.searchParams.get('startDate');
	const endDate = request.nextUrl.searchParams.get('endDate');

	let query = {};
	let sDate = dayjs(startDate);
	let eDate = dayjs(endDate);

	if (sDate.diff(eDate, 'day') == 0) {
		console.log('fired');
		query = getByHour(sDate, eDate);
	} else {
		console.log('fired2');
		query = getbyDay(sDate, eDate);
	}

	console.log(startDate, endDate, sDate.diff(eDate, 'day'));

	try {
		const orders = await prisma.order.aggregateRaw(query);

		console.log(orders);

		return NextResponse.json(orders);
	} catch (error) {
		console.log(error);
	}
}

// export default withMiddleware(withAdmin, withExceptionHandler, handler);
