'use client'

import {
    useCreatorQuery,
    useCreatorsQuery,
    useOrderQuery,
    useUsersQuery,
} from '@/app/(dashboard)/queries'
import { Order } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC, useMemo } from 'react'

interface DashboardOverviewProps {}

const DashboardOverview: FC<DashboardOverviewProps> = ({}) => {
    const router = useRouter()
    const { data: creators } = useCreatorsQuery()
    const { data: orders } = useOrderQuery()
    const { data: users } = useUsersQuery()

    console.log(orders)

    const revenue = useMemo(() => {
        if (orders && orders?.length > 0) {
            return orders?.reduce((acc: any, order: Order) => {
                return acc + order.amount
            }, 0)
        }
    }, [orders])

    const ordersByDay = useMemo(() => {
        orders?.filter((acc, order) => {})
    }, [])

    const averageOrderPrice = useMemo(() => {
        if (orders && orders?.length > 0) {
            return Math.round(revenue / orders.length)
        }
    }, [revenue])

    const revenuePerUser = useMemo(() => {
        if (users && orders) {
            return Math.round(revenue / users.length)
        }
    }, [revenue])

    return (
        <div id="fullWidthTabContent">
            <div
                className="p-4  rounded-lg md:p-8 dark:bg-primary-dark bg-white bg-opacity-50"
                id="stats"
                role="tabpanel"
                aria-labelledby="stats-tab"
            >
                <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:dark:text-white text-primary-dark sm:p-8">
                    <div
                        className="flex flex-col items-center justify-center cursor-pointer hover:opacity-50"
                        onClick={() => router.push('/admin/creators')}
                    >
                        <dt className="mb-2 text-3xl font-extrabold">
                            {creators?.length}
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400">
                            Creators
                        </dd>
                    </div>
                    <div
                        className="flex flex-col items-center justify-center cursor-pointer hover:opacity-50"
                        onClick={() => router.push('/admin/orders')}
                    >
                        <dt className="mb-2 text-3xl font-extrabold">
                            {orders?.length}
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400">
                            Orders
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer hover:opacity-50">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {users?.length}
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400">
                            Users
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer hover:opacity-50">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {revenue}$
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400">
                            Revenue
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer hover:opacity-50">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {averageOrderPrice}$
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400">
                            Average Order
                        </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer hover:opacity-50">
                        <dt className="mb-2 text-3xl font-extrabold">
                            {revenuePerUser}$
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400">
                            Revenue per user
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default DashboardOverview
