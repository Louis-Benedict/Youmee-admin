'use client'

import { AdminTable } from '@/app/components/ui/admin/AdminTable'
import { useMemo } from 'react'
import { useCreatorsQuery } from '../queries'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@prisma/client'
import { fuzzySort } from '@/app/utils/util'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const { data: creators } = useCreatorsQuery()

    const columns = useMemo<ColumnDef<User, any>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Full name',
            },
            {
                accessorFn: (row) => row.email,
                id: 'email',
                header: 'Email',
                cell: (info) => info.getValue(),
                filterFn: 'fuzzy',
                sortingFn: fuzzySort,
            },
            {
                accessorKey: 'createdAt',
                header: 'created',
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'rate',
                header: 'Rate',
            },
            {
                accessorKey: 'alias',
                header: 'Alias',
            },
            {
                accessorKey: 'id',
                header: 'Platform',
                enableHiding: true,
            },
            {
                header: 'test',
                id: 'click-me-button',
                cell: (row) => (
                    <button
                        className="p-2 border-neutral-500 border rounded-md"
                        onClick={() =>
                            router.push(
                                `/admin/creator/${row.row.getValue('id')}`
                            )
                        }
                    >
                        Details
                    </button>
                ),
            },
        ],
        []
    )
    return (
        <div className=" dark:text-white text-primary-dark">
            {creators && (
                <AdminTable
                    title="Creators"
                    data={creators}
                    columns={columns}
                />
            )}
        </div>
    )
}
