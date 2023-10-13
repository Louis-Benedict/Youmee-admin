'use client'
import React, { useMemo } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useRevenueChartQuery } from '@/app/(dashboard)/queries'
import { Loader2 } from 'lucide-react'
import useAnalyicsDashboardStore from '@/app/(dashboard)/analyticsStore'
import { parseRevenueData } from '@/app/(dashboard)/utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function AdminRevenueChart({ title }: { title: string }) {
    const dateRange = useAnalyicsDashboardStore((state) => state.range)
    const { data: chartData, isLoading } = useRevenueChartQuery(dateRange)
    const revenueData = useMemo(
        () => parseRevenueData(chartData, 'Revenue', 'totalAmount'),
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
                    stepSize: 100,
                },
            },
        },
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }

    return (
        <div className="relative dark:bg-primary-dark bg-white min-h-[400px] max-w-[800px] rounded-xl flex  items-center p-4">
            {isLoading ? (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 right-0">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                <Bar options={options} data={revenueData} />
            )}
        </div>
    )
}
