'use client'

import { useCreatorQuery, useOrderByCreatorQuery } from '../../queries'
import {
    ArrowUpRight,
    AtSign,
    Instagram,
    Mail,
    Phone,
    SquareAsterisk,
} from 'lucide-react'
import Avatar from '@/app/components/ui/Avatar'
import { AdminTable } from '@/app/components/ui/admin/AdminTable'
import { Order, User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { fuzzySort } from '@/app/utils/util'
import Heading from '@/app/components/ui/Heading'
import { useRouter } from 'next/navigation'
import { config } from '@/app/config/config'

interface pageProps {
    creatorId: String
}

export default function Page({ params }: { params: { creatorId: string } }) {
    const router = useRouter()
    const creator = useCreatorQuery(params.creatorId)

    const { data: orders } = useOrderByCreatorQuery(params.creatorId)

    const columns = useMemo<ColumnDef<Order & { sender: User }, any>[]>(
        () => [
            {
                accessorFn: (row) => row.id,
                id: 'id',
                header: 'ID',
                cell: (info) => info.getValue(),
                filterFn: 'fuzzy',
                sortingFn: fuzzySort,
            },
            {
                accessorKey: 'sender.name',
                header: 'From',
            },
            {
                accessorKey: 'occasion',
                header: 'Occasion',
            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorKey: 'createdAt',
                header: 'Created',
                cell: ({ cell }) => {
                    let customDate = new Date(cell.getValue()).toLocaleString()
                    return customDate
                },
            },
            {
                header: '',
                id: 'click-me-button',
                cell: (row) => (
                    <button
                        className="p-2 border-neutral-800 border rounded-md float-right hover:opacity-50"
                        onClick={() =>
                            router.push(
                                `/admin/order/${row.row.getValue('id')}`
                            )
                        }
                    >
                        <ArrowUpRight size={16} />
                    </button>
                ),
            },
        ],
        []
    )
    return (
        <div>
            <div className="mb-4 flex justify-between flex-row">
                <div className="flex flex-row">
                    <Avatar
                        size={50}
                        semi
                        url={config.cdnBaseUrl + creator.data?.image}
                    />
                    <div className="ml-4">
                        <div className="font-bold text-xl w-max dark:text-white text-primary-dark">
                            {creator.data?.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                            {creator.data?.id}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-neutral-800 mb-4" />
            <div className="font-bold dark:text-white text-primary-dark mb-2">
                Personal Information
            </div>
            <div className="flex flex-row gap-3 justify-between mb-4">
                <div className=" flex flex-row gap-3">
                    <div className="min-w-[300px] text-xs flex flex-col gap-3">
                        <div className="relative p-4 rounded-md dark:bg-primary-dark bg-white bg-opacity-50 rounded.md min-h-[80px]">
                            <Mail className="absolute top-3 right-3" />
                            Email
                            <div className="text-semibold dark:text-white text-primary-dark text-base">
                                {creator.data?.email}
                            </div>
                        </div>
                        <div className="relative p-4 rounded-md dark:bg-primary-dark bg-white bg-opacity-50 rounded.md min-h-[80px]">
                            <Phone className="absolute top-3 right-3" />
                            Phone number
                            <div className="text-semibold dark:text-white text-primary-dark text-base">
                                {creator.data?.category}
                            </div>
                        </div>
                        <div className="relative p-4 rounded-md dark:bg-primary-dark bg-white bg-opacity-50 rounded.md min-h-[80px]">
                            <SquareAsterisk className="absolute top-3 right-3" />
                            Alias
                            <div className="text-semibold dark:text-white text-primary-dark text-base">
                                {creator.data?.image}
                            </div>
                        </div>
                        <div className="relative p-4 rounded-md dark:bg-primary-dark bg-white bg-opacity-50 rounded.md min-h-[80px]">
                            <Instagram className="absolute top-3 right-3" />
                            Platform
                            <div className="text-semibold dark:text-white text-primary-dark text-base">
                                {creator.data?.rate}
                            </div>
                        </div>
                        <div className="relative p-4 rounded-md dark:bg-primary-dark bg-white bg-opacity-50 rounded.md min-h-[80px]">
                            <AtSign className="absolute top-3 right-3" />
                            Social Media Handle
                            <div className="text-semibold dark:text-white text-primary-dark text-base">
                                {creator.data?.knownFor}
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] text-xs flex flex-col gap-2">
                        <div className="relative p-4 rounded-md dark:bg-primary-dark bg-white bg-opacity-50 rounded.md min-h-[170px]">
                            Additional Information
                            <div className="text-semibold dark:text-white text-primary-dark text-base"></div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-neutral-800" />
            <div className="mt-10">
                {orders && orders?.length > 0 ? (
                    <>
                        <AdminTable
                            data={orders}
                            title={`Orders for ${creator.data?.name}`}
                            columns={columns}
                        />
                    </>
                ) : (
                    <>
                        <Heading title={`Orders for ${creator.data?.name}`} />
                        <p>This user does not have any orders yet.</p>
                    </>
                )}
            </div>
        </div>
    )
}
