//@prettier-ignore

import { toast } from '@/app/components/ui/toast'
import { Endpoint, EndpointFilter, EndpointResponse } from '@/app/types'
import ApiClient from '@/app/utils/client/apiClient'
import { Enrollee, EnrollmentStatus, UserRole } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

export type EnrolleeEndpointFilter = EndpointFilter & {
    status?: EnrollmentStatus
}

export type EnrolleeApiResponse = EndpointResponse<Enrollee>
export type EnrolleeEndpointType = Endpoint<Enrollee, EnrolleeApiResponse>

const EnrolleeEndpoint: EnrolleeEndpointType = {
    promote: async (userId: string) => {
        console.log('[APC_ENROLLEE::POST /promote]')
        const response = await ApiClient.post<Enrollee, EnrolleeApiResponse>(
            `/enrollees/${userId}/promote`
        )
        toast({
            title: 'Success',
            message: `Successfully promoted ${response.data[0].fullname}`,
            type: 'success',
        })
        return response.data[0]
    },

    reject: async (userId: string) => {
        console.log('[APC_ENROLLEE::POST /reject]: ' + userId)
        const response = await ApiClient.post<Enrollee, EnrolleeApiResponse>(
            `/enrollees/${userId}/reject`
        )
        toast({
            title: 'Success',
            message: `Successfully rejected ${response.data[0].fullname}`,
            type: 'success',
        })
        return response.data[0]
    },

    fetch: async (filter?: EnrolleeEndpointFilter) => {
        console.log('[APC_ENROLLEE::GET /fetch]')
        const url = filter ? `/enrollees?${filter}` : '/enrollees'
        const response = await ApiClient.get<EnrolleeApiResponse>(url)
        return response.data
    },

    fetchOne: async (enrolleeId: string) => {
        console.log('[APC_ENROLLEE::GET /fetchSingle]')

        const response = await ApiClient.get<EnrolleeApiResponse>(
            `/enrollees/${enrolleeId}`
        )
        return response.data[0]
    },

    fetchFromUser: async (userId: string) => {
        console.log('[APC_ENROLLEE::GET /fetchSingle]')

        const response = await ApiClient.get<EnrolleeApiResponse>(
            `/team/${userId}/enrollees`
        )
        return response.data[0]
    },

    edit: async (user: Partial<Enrollee> & { id: string }) => {
        console.log('[APC_ENROLLEE::PUT /edit]')
        const response = await ApiClient.put<
            Partial<Enrollee>,
            EnrolleeApiResponse
        >(`/enrollees/${user.id}`, user)

        toast({
            title: 'Success',
            message: `Successfully updated ${response.data[0].fullname}`,
            type: 'success',
        })

        return response.data[0]
    },

    remove: async (userId: string) => {
        console.log('[APC_ENROLLEE::DELETE /remove]')
        const response = await ApiClient._delete<Enrollee, EnrolleeApiResponse>(
            `/enrollees/${userId}`
        )

        toast({
            title: 'Success',
            message: `Successfully removed ${response.data[0].fullname}`,
            type: 'success',
        })

        return response.data[0]
    },

    add: async (user: Enrollee) => {
        console.log('[APC_ENROLLEE::POST /add]')
        const response = await ApiClient.post<Enrollee, EnrolleeApiResponse>(
            '/enrollees',
            user
        )

        toast({
            title: 'Success',
            message: `Successfully added ${response.data[0].fullname}`,
            type: 'success',
        })

        return response.data[0]
    },
}

const useFetchEnrollees = (filter?: EnrolleeEndpointFilter) => {
    const { isLoading: fetching, data: enrollees } = useQuery({
        queryKey: ['enrollees'],
        queryFn: () => EnrolleeEndpoint.fetch(filter),
    })
    return { fetching, enrollees }
}
const useFetchEnrolleesHiredByUser = (userId: string) => {
    const { isLoading: fetching, data: enrollees } = useQuery({
        queryKey: ['enrollees'],
        queryFn: () => EnrolleeEndpoint.fetchFromUser(userId),
    })
    return { fetching, enrollees }
}

const usePromoteEnrollee = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: EnrolleeEndpoint.promote,
        onSuccess: (promotedEnrollee) => {
            if (!Array.isArray(promotedEnrollee)) {
                queryClient.setQueryData(
                    ['enrollees', promotedEnrollee.id],
                    promotedEnrollee
                )
                queryClient.setQueriesData<Enrollee[]>(
                    ['enrollees'],
                    (previous) => {
                        return previous?.map((enrollee) => {
                            if (enrollee.id === promotedEnrollee.id) {
                                return promotedEnrollee
                            }
                            return enrollee
                        })
                    }
                )
            }
        },
    })
}

const useRejectEnrollee = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: EnrolleeEndpoint.reject,
        onSuccess: (rejectedEnrollee) => {
            if (!Array.isArray(rejectedEnrollee)) {
                queryClient.setQueryData(
                    ['enrollees', rejectedEnrollee.id],
                    rejectedEnrollee
                )
                queryClient.setQueriesData<Enrollee[]>(
                    ['enrollees'],
                    (previous) => {
                        return previous?.map((enrollee) => {
                            if (enrollee.id === rejectedEnrollee.id) {
                                return rejectedEnrollee
                            }
                            return enrollee
                        })
                    }
                )
            }
        },
    })
}

const useDeleteEnrollee = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: EnrolleeEndpoint.remove,
        onSuccess: (deletedEnrollee) => {
            queryClient.removeQueries(['enrollees', deletedEnrollee.id])
            queryClient.setQueriesData<Enrollee[]>(
                ['enrollees'],
                (previous) => {
                    return previous?.filter(
                        (enrollee) => enrollee.id !== deletedEnrollee.id
                    )
                }
            )
        },
    })
}

const useAddEnrollee = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: EnrolleeEndpoint.add,
        onSuccess: (addedEnrollee) => {
            queryClient.setQueriesData<Enrollee[]>(
                ['enrollees'],
                (previous) => {
                    return previous
                        ? [...previous, addedEnrollee]
                        : [addedEnrollee]
                }
            )
        },
    })
}

const useSetNotified = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: EnrolleeEndpoint.edit,
        onSuccess: (editedTeamMember) => {
            queryClient.setQueriesData<Enrollee[]>(
                ['enrollees'],
                (previous) => {
                    return previous?.map((teamMember) => {
                        if (teamMember.id === editedTeamMember.id) {
                            return editedTeamMember
                        }
                        return teamMember
                    })
                }
            )
        },
    })
}

const useFetchEnrollee = (enrolleeId: string) => {
    return useQuery({
        queryKey: ['enrollees', enrolleeId],
        queryFn: () => EnrolleeEndpoint.fetchOne(enrolleeId),
        initialData: () => getEnrolleeFromCache(enrolleeId),
    })
}

function getEnrolleeFromCache(enrolleeId: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient()
    const cachedEnrollees = queryClient.getQueryData<Enrollee[]>(['enrollees'])
    return cachedEnrollees?.find((enrollee) => enrollee.id === enrolleeId)
}

export {
    useFetchEnrollees,
    useFetchEnrollee,
    usePromoteEnrollee,
    useRejectEnrollee,
    useDeleteEnrollee,
    useAddEnrollee,
    useSetNotified,
    useFetchEnrolleesHiredByUser,
}
