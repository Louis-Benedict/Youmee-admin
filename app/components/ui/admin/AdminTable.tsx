import { RankingInfo } from '@tanstack/match-sorter-utils'
import { Enrollee, Order, User } from '@prisma/client'
import React from 'react'
import '@tanstack/react-table'

import {
    useReactTable,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    FilterFn,
    flexRender,
} from '@tanstack/react-table'
import { fuzzyFilter } from '@/app/utils/util'
import { DebouncedInput } from '../DebouncedInput'
import { ChevronDown, ChevronUp } from 'lucide-react'

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

interface AdminTableProps {
    data: (Enrollee | User | Order | (Order & { sender: User }))[]
    columns: any
    title: string
}

export function AdminTable({ data, columns, title }: AdminTableProps) {
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState('')

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    })

    React.useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'fullName') {
            if (table.getState().sorting[0]?.id !== 'fullName') {
                table.setSorting([{ id: 'fullName', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id])

    return (
        <div>
            <div className="flex justify-between">
                <div className="dark:text-white text-primary-dark font-bold">{`${title} (${
                    table.getPrePaginationRowModel().rows.length
                } entries)`}</div>
                <DebouncedInput
                    value={globalFilter ?? ''}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className=" dark:bg-primary-dark bg-white rounded-md shadow focus:border-opacity-0 p-2"
                    placeholder="Search..."
                />
            </div>
            <div className="h-2" />
            <table className="border-spacing-y-1 p-0  border-separate w-full">
                <thead className=" dark:bg-primary-dark bg-white bg-opacity-90 rounded-md">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="bg-neutral-300 rounded-md"
                        >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="text-left dark:text-white text-primary-dark font-semibold h-[40px] p-2"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className:
                                                            header.column.getCanSort()
                                                                ? 'cursor-pointer select-none'
                                                                : '',
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ChevronUp
                                                                size={16}
                                                                className="ml-1 inline"
                                                            />
                                                        ),
                                                        desc: (
                                                            <ChevronDown
                                                                size={16}
                                                                className="ml-1 inline"
                                                            />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            </>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            className="h-[40px] text-xs dark:bg-primary-dark bg-white bg-opacity-50 p-1"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex flex-row justify-end gap-2">
                <span className="flex items-center text-sm gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <div>
                    <button
                        className="rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    )
}

// function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
// 	const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

// 	const columnFilterValue = column.getFilterValue();

// 	const sortedUniqueValues = React.useMemo(
// 		() =>
// 			typeof firstValue === 'number'
// 				? []
// 				: Array.from(column.getFacetedUniqueValues().keys()).sort(),
// 		[column.getFacetedUniqueValues()]
// 	);

// 	return typeof firstValue === 'number' ? (
// 		<div>
// 			<div className='flex space-x-2'>
// 				<DebouncedInput
// 					type='number'
// 					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
// 					max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
// 					value={(columnFilterValue as [number, number])?.[0] ?? ''}
// 					onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
// 					placeholder={`Min ${
// 						column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
// 					}`}
// 					className='w-24 border shadow rounded'
// 				/>
// 				<DebouncedInput
// 					type='number'
// 					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
// 					max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
// 					value={(columnFilterValue as [number, number])?.[1] ?? ''}
// 					onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
// 					placeholder={`Max ${
// 						column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
// 					}`}
// 					className='w-24 border shadow rounded'
// 				/>
// 			</div>
// 			<div className='h-1' />
// 		</div>
// 	) : (
// 		<>
// 			<datalist id={column.id + 'list'}>
// 				{sortedUniqueValues.slice(0, 5000).map((value: any) => (
// 					<option value={value} key={value} />
// 				))}
// 			</datalist>
// 			<DebouncedInput
// 				type='text'
// 				value={(columnFilterValue ?? '') as string}
// 				onChange={(value) => column.setFilterValue(value)}
// 				placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
// 				className='w-36 border shadow rounded'
// 				list={column.id + 'list'}
// 			/>
// 			<div className='h-1' />
// 		</>
// 	);
// }
