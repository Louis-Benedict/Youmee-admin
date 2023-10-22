import { toast } from '@/app/components/ui/toast'
import { Endpoint, EndpointFilter, EndpointResponse } from '@/app/types'
import ApiClient from '@/app/utils/client/apiClient'
import { Enrollee, User } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type TeamMember = Pick<
    User,
    | 'name'
    | 'email'
    | 'role'
    | 'image'
    | 'phoneNumber'
    | 'id'
    | 'accountVerified'
>

export type TeamMemberEndpointFilter = EndpointFilter & {
    createdAt?: Date
}

export type TeamApiResponse = EndpointResponse<TeamMember>
export type TeamMemberEndpointType = Endpoint<TeamMember, TeamApiResponse>

const TeamMemberEndpoint: Endpoint<TeamMember, TeamApiResponse> = {
    fetch: async (filter?: TeamMemberEndpointFilter) => {
        const url = filter ? `/team?${filter}` : '/team'
        const response = await ApiClient.get<TeamApiResponse>(url)
        return response.data
    },
    fetchOne: async (teamMemberId: string) => {
        const response = await ApiClient.get<TeamApiResponse>(
            `/enrollees/${teamMemberId}`
        )
        return response.data[0]
    },
    edit: async (user: Partial<TeamMember> & { id: string }) => {
        const response = await ApiClient.put<
            Partial<TeamMember>,
            TeamApiResponse
        >(`/team/${user.id}`, user)
        toast({
            title: 'Success',
            message: `Successfully edited ${user.name}`,
            type: 'success',
        })
        return response.data[0]
    },
    remove: async (userId: string) => {
        const response = await ApiClient._delete<TeamMember, TeamApiResponse>(
            `/team/${userId}`
        )
        toast({
            title: 'Success',
            message: `Successfully removed ${response.data[0].name}`,
            type: 'success',
        })
        return response.data[0]
    },

    add: async (user: TeamMember) => {
        const response = await ApiClient.post<TeamMember, TeamApiResponse>(
            '/team',
            user
        )
        toast({
            title: 'Success',
            message: `Successfully added ${user.name}`,
            type: 'success',
        })
        return response.data[0]
    },
    getTeamMemberEnrollees: async (userId: string) => {
        const response = await ApiClient.get<EndpointResponse<Enrollee[]>>(
            `/team/${userId}/enrollees`
        )
        return response.data
    },
}

const useFetchTeamMembers = (filter?: any) => {
    const { isLoading: fetching, data: teamMembers } = useQuery({
        queryKey: ['team'],
        queryFn: () => TeamMemberEndpoint.fetch(filter),
    })
    return { fetching, teamMembers }
}

const useDeleteTeamMember = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: TeamMemberEndpoint.remove,
        onSuccess: (deletedTeamMember) => {
            queryClient.removeQueries(['team', deletedTeamMember.id])
            queryClient.setQueriesData<TeamMember[]>(['team'], (previous) => {
                return previous?.filter(
                    (teamMember) => teamMember.id !== deletedTeamMember.id
                )
            })
        },
    })
}

const useAddTeamMember = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: TeamMemberEndpoint.add,
        onSuccess: (addedTeamMember) => {
            queryClient.removeQueries(['team'])
            // queryClient.setQueriesData<TeamMember[]>(['team'], (previous) => {
            //     return previous
            //         ? [...previous, addedTeamMember]
            //         : [addedTeamMember]
            // })
        },
    })
}

const useEditTeamMember = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: TeamMemberEndpoint.edit,
        onSuccess: (editedTeamMember) => {
            queryClient.setQueriesData<TeamMember[]>(['team'], (previous) => {
                return previous?.map((teamMember) => {
                    if (teamMember.id === editedTeamMember.id) {
                        return editedTeamMember
                    }
                    return teamMember
                })
            })
        },
    })
}

const useFetchTeamMember = (teamMemberId: string) => {
    const { isLoading: fetching, data: teamMember } = useQuery({
        queryKey: ['team', teamMemberId],
        queryFn: () => TeamMemberEndpoint.fetchOne(teamMemberId),
        initialData: () => getTeamMemberFromCache(teamMemberId),
    })

    return { fetching, teamMember }
}

function getTeamMemberFromCache(teamMemberId: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient()
    const cachedTeamMember = queryClient.getQueryData<TeamMember[]>(['team'])
    return cachedTeamMember?.find(
        (teamMember) => teamMember.id === teamMemberId
    )
}

export {
    useFetchTeamMembers,
    useDeleteTeamMember,
    useAddTeamMember,
    useEditTeamMember,
    useFetchTeamMember,
}
