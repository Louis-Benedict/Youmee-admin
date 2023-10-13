'use client';
import React, { useMemo, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useRevenueChartQuery } from '@/app/(admin)/admin/queries';
import { Loader2 } from 'lucide-react';
import useAnalyicsDashboardStore from '@/app/(admin)/admin/analyticsStore';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function AdminRevenueChart() {
	const dateRange = useAnalyicsDashboardStore((state) => state.range);
	const {
		data: chartData,
		isLoading,
		isSuccess: chartSuccess,
		error,
	} = useRevenueChartQuery(dateRange);

	const revenueData = useMemo(() => {
		return {
			labels: chartData?.map((data: any) => {
				let date = new Date(data.date);
				return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
					date
				);
			}),
			datasets: [
				{
					label: 'Orders per day',
					data: chartData?.map((data: any) => data.count),
				},
			],
		};
	}, [chartData]);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				ticks: {
					stepSize: 1,
				},
			},
		},
		backgroundColor: 'rgba(255, 99, 132, 0.6)',
	};

	return (
		<div className='relative col-span-2 dark:bg-primary-dark bg-white min-h-[400px] rounded-xl flex  items-center p-4'>
			{isLoading ? (
				<div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 right-0'>
					<Loader2 className='animate-spin' />
				</div>
			) : (
				<Bar
					options={options}
					data={revenueData}
				/>
			)}
		</div>
	);
}
