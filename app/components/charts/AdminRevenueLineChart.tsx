'use client'
import React, { useMemo, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    Filler,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { useRevenueChartQuery } from '@/app/(dashboard)/queries'
import { Loader2 } from 'lucide-react'
import useAnalyicsDashboardStore from '@/app/(dashboard)/analyticsStore'
import { parseRevenueData } from '@/app/(dashboard)/utils'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function AdminRevenueChart() {
    const dateRange = useAnalyicsDashboardStore((state) => state.range)
    const { data: chartData, isLoading } = useRevenueChartQuery(dateRange)

    const revenueData = useMemo(
        () => parseRevenueData(chartData, 'Orders per Day', 'count'),
        [chartData]
    )

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
                grid: {
                    display: false,
                },
                beginAtZero: true,
            },
        },
        lineTension: 0.3,
        fill: 'rgba(255,255,255,1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
    }

    return (
        <div className="relative col-span-2 dark:bg-primary-dark bg-white min-h-[400px] rounded-xl flex  items-center p-4">
            {isLoading ? (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 right-0">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                <Line options={options} data={revenueData} />
            )}
        </div>
    )
}
