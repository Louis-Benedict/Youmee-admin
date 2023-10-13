'use client'

import UserCard from '@/app/components/cards/UserCard'
import RoleAccessHandler from '@/app/components/hoc/RoleAccess'
import EditTeamMemberModal from '@/app/components/modals/EditTeamMemberModal/EditTeamMemberModal'
import AddTeamMemberModal from '@/app/components/modals/AddTeamMemberModal/AddTeamMemberModal'
import useEditTeamMemberModal from '@/app/components/modals/EditTeamMemberModal/useEditTeamMemberModal'
import useAddTeamMemberModal from '@/app/components/modals/AddTeamMemberModal/useTeamMemberModal'
import DashboardButton from '@/app/components/ui/Button/DashboardButton'
import DashboardHeader from '@/app/components/ui/admin/DashboardHeader'
import { UserRole } from '@prisma/client'
import { ArrowUpRight, Edit, Loader2, UserPlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { TeamMember, useDeleteTeamMember, useFetchTeamMembers } from './queries'
import { FC, useCallback } from 'react'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
    const { data: session } = useSession()
    const router = useRouter()
    const addTeamMemberModal = useAddTeamMemberModal()
    const editTeamMemberModal = useEditTeamMemberModal()

    const { fetching, teamMembers } = useFetchTeamMembers()
    const deleteTeamMember = useDeleteTeamMember()

    const handleUserEditClick = useCallback(
        (user: TeamMember) => {
            editTeamMemberModal.selectTeamMember(user)
            editTeamMemberModal.onOpen()
        },
        [teamMembers]
    )

    return (
        <div>
            <AddTeamMemberModal />
            <EditTeamMemberModal />

            <DashboardHeader
                title="Team"
                actions={[
                    <RoleAccessHandler
                        key="x-elem"
                        allowedRoles={[UserRole.ADMIN]}
                        userRole={session?.user.role}
                    >
                        <DashboardButton
                            openModalFunction={addTeamMemberModal.onOpen}
                        />
                    </RoleAccessHandler>,
                    <input
                        key="x-elem-2"
                        className="border-[1px] border-neutral-300 px-2 rounded-md"
                        placeholder="Search"
                    />,
                ]}
            />

            {fetching && <Loader2 className="animate-spin" />}

            <div className="grid grid-cols-4 md:grid-cols-7  gap-4 mt-8">
                {teamMembers &&
                    teamMembers.map((member) => (
                        <UserCard
                            key={member.id}
                            user={member}
                            actions={[
                                <RoleAccessHandler
                                    key="x-elem"
                                    allowedRoles={[UserRole.ADMIN]}
                                    userRole={session?.user.role}
                                >
                                    <div className="flex justify-end gap-1 ">
                                        <Button
                                            variant="outline"
                                            size="1"
                                            onClick={() =>
                                                handleUserEditClick(member)
                                            }
                                        >
                                            <Edit size={14} />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="solid"
                                            size="1"
                                            onClick={() =>
                                                deleteTeamMember.mutate(
                                                    member.id
                                                )
                                            }
                                        >
                                            <ArrowUpRight size={14} />
                                            Delete
                                        </Button>
                                    </div>
                                </RoleAccessHandler>,
                            ]}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Page
