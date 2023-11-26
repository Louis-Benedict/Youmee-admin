import { useEffect } from 'react'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FilterFn, SortingFn, sortingFns } from '@tanstack/react-table'
import { compareItems, rankItem } from '@tanstack/match-sorter-utils'
import dayjs from 'dayjs'

export function calcDayDifference(date: Date) {
    const startDate = new Date()
    const endDate = date

    const difference =
        (startDate.getTime() - endDate.getTime()) / (1000 * 3600 * 24)
    if (difference <= 1 / 24) {
        return `${Math.round(difference * 24 * 60)} min`
    }
    if (difference <= 1) {
        return `${Math.round(difference * 24)} h`
    }
    return `${Math.round(difference)}d`
}

export function calcRemainingTime(date: Date) {
    const startDate = new Date()
    const endDate = date

    const difference =
        7 - (startDate.getTime() - endDate.getTime()) / (1000 * 3600 * 24)
    if (difference <= 1 / 24) {
        return `${Math.round(difference * 24 * 60)} min`
    }
    if (difference <= 1) {
        return `${Math.round(difference * 24)} h`
    }
    return `${Math.round(difference)} d`
}

export function calcRemaining(date: Date) {
    let currentDate = dayjs()
    let tempDate = dayjs(date)
    let diff = currentDate.diff(tempDate, 'day')
    if (diff === 0) {
        return `${Math.abs(currentDate.diff(tempDate, 'hour'))} h`
    }
    return `${Math.abs(diff)} day(s)`
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getValidSubdomain = (host?: string | null) => {
    let subdomain: string | null = null
    if (!host && typeof window !== 'undefined') {
        // On client side, get the host from window
        host = window.location.host
    }
    if (host && host.includes('.')) {
        const candidate = host.split('.')[0]
        if (candidate && !candidate.includes('localhost')) {
            // Valid candidate
            subdomain = candidate
        }
    }
    return subdomain
}

export function isServer() {
    return typeof window === undefined
}

export function isClient() {
    return typeof window !== undefined
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
