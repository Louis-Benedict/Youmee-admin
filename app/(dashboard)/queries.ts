import getQueryClient from '@/app/libs/ReactQuery'
import { Enrollee, Order, User, UserRole } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Range = {
    startDate: string
    endDate: string
}

/* CREATOR QUERIES */
export const fetchCreators = async (): Promise<User[]> => {
    const response = await axios.get(`/api/creators`)
    return response.data
}
function useFetchCreatorsfromCache() {
    const cachedCreators = getQueryClient().getQueryData(['users']) as
        | User[]
        | undefined
    return (
        cachedCreators?.filter(
            (creator) => creator.role === UserRole.CREATOR
        ) ?? undefined
    )
}

export const useCreatorsQuery = (take?: number, haltFor?: string) =>
    useQuery(['creators'], () => fetchCreators(), {
        select: (data) => {
            if (take) {
                return data?.slice(0, take)
            }
            return data
        },
    })

export const useCreatorQuery = (creatorId: string) =>
    useQuery({
        queryKey: ['creator', creatorId],
        queryFn: () => fetchCreator(creatorId),
        initialData: () => getCreatorFromCache(creatorId),
    })

export const fetchCreator = async (creatorId: string): Promise<User> => {
    const response = await axios.get(`/api/tempCreator/${creatorId}`)
    return response.data
}
function getCreatorFromCache(creatorId: string) {
    const cachedCreator = getQueryClient().getQueryData(['creators']) as
        | User[]
        | undefined
    return (
        cachedCreator?.find((creator) => creator.id === creatorId) ?? undefined
    )
}

/* ORDER QUERIES */
export const useOrderByCreatorQuery = (creatorId: string) =>
    useQuery({
        queryKey: ['orders', creatorId],
        queryFn: () => fetchOrdersByCreator(creatorId),
        // initialData: () => getCreatorOrdersFromCache(creatorId),
    })

const fetchOrdersByCreator = async (
    creatorId: string
): Promise<(Order & { sender: User })[]> => {
    console.log(creatorId)
    const response = await axios.get(`/api/orders/${creatorId}`)
    return response.data
}

// function getCreatorOrdersFromCache(creatorId: string) {
// 	const cachedOrdersFromCreator = useQueryClient().getQueryData(['orders']) as
// 		| (Order & { sender: User })[]
// 		| undefined;
// 	console.log(cachedOrdersFromCreator);
// 	const filteredOrders = cachedOrdersFromCreator?.filter(
// 		(order) => order.recipientUserId === creatorId
// 	);
// 	return filteredOrders ?? undefined;
// }

export const fetchOrders = async (): Promise<Order[]> => {
    const response = await axios.get(`/api/orders`)
    return response.data
}

export const useOrderQuery = (take?: number) =>
    useQuery(['orders'], () => fetchOrders(), {
        select: (data) => (take ? data.slice(0, take) : data),
    })

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get('/api/users')
    return response.data
}

/* USER QUERIES */
export const useUsersQuery = (take?: number) =>
    useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers(),
        select: (data) => (take ? data.slice(0, take) : data),
        // initialData: () => {
        // 	let data = useQueryClient().getQueryData(['creators']);
        // 	return data;
        // },
    })

/* ENROLLEE QUERIES */
export const fetchEnrollees = async (): Promise<Enrollee[]> => {
    const response = await axios.get(`/api/enrollees`)
    return response.data
}

export const useEnrolleesQuery = (take?: number) =>
    useQuery({
        queryKey: ['enrollees'],
        queryFn: () => fetchEnrollees(),
        select: (data) => (take ? data.slice(0, take) : data),
    })

export const useEnrolleeQuery = (enrolleeId: string) =>
    useQuery({
        queryKey: ['enrollee', enrolleeId],
        queryFn: () => fetchEnrollee(enrolleeId),
        initialData: () => getEnrolleeFromCache(enrolleeId),
    })

export const fetchEnrollee = async (enrolleeId: string): Promise<Enrollee> => {
    const response = await fetch(`/api/enrollee/${enrolleeId}`)
    return response.json()
}

function getEnrolleeFromCache(id: string) {
    const cachedEnrollees = getQueryClient().getQueryData(['enrollees']) as
        | Enrollee[]
        | undefined
    return cachedEnrollees?.find((enrollee) => enrollee.id === id) ?? undefined
}

export const useRevenueChartQuery = (range: Range, holdFor?: boolean) =>
    useQuery({
        queryKey: ['revenue', range],
        queryFn: () => fetchRevenue(range),
    })

export const fetchRevenue = async (range: Range): Promise<any> => {
    const response = await fetch(
        `/api/analytics/revenue?startDate=${range.startDate}&endDate=${range.endDate}`
    )
    return response.json()
}

function useGetRevenueFromCache(lastDays: string) {
    let timespan = new Date()
    timespan.setDate(new Date().getDay() - +lastDays)
    const cachedOrders = getQueryClient().getQueryData(['orders']) as
        | Order[]
        | undefined
    console.log(cachedOrders)
    return (
        cachedOrders?.reduce((acc: any, obj) => {
            let createdAt = obj['createdAt']
            let amount = obj['amount']
            let date = new Date(createdAt).toLocaleDateString()
            if (!acc[date]) acc[date] = { count: 0, amount: 0 }
            acc[date] = {
                count: acc[date].count + 1,
                amount: acc[date].amount + amount,
            }
            console.log(acc)
            return acc
        }, {}) ?? undefined
    )
}
