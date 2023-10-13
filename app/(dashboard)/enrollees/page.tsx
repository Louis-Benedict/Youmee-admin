'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo } from 'react'
import { Enrollee, EnrollmentStatus } from '@prisma/client'
import useAddEnrolleeModal from '@/app/components/modals/AddEnrolleeModal/useEnrolleeModal'
import { Loader2, Search, UserPlus } from 'lucide-react'
import DashboardHeader from '@/app/components/ui/admin/DashboardHeader'
import { useFetchEnrollees } from './queries'
import EnrolleeCard from '@/app/components/cards/EnrolleeCard'
import useViewEnrolleeModal from '@/app/components/modals/ViewEnrolleeModal/useViewEnrolleeModal'
import { useSession } from 'next-auth/react'
import { Box, Tabs, TextField } from '@radix-ui/themes'
import DashboardButton from '@/app/components/ui/Button/DashboardButton'

const AddEnrolleeModal = dynamic(
    () => import('@/app/components/modals/AddEnrolleeModal/AddEnrolleeModal')
)
const ViewEnrolleeModal = dynamic(
    () => import('@/app/components/modals/ViewEnrolleeModal/ViewEnrolleeModal')
)

export default function Page() {
    const addEnrolleeModal = useAddEnrolleeModal()
    const viewEnrolleeModal = useViewEnrolleeModal()
    const session = useSession()

    const { fetching, enrollees } = useFetchEnrollees()

    const handleViewEnrolleeClick = (user: Enrollee) => {
        viewEnrolleeModal.selectEnrollee(user)
        viewEnrolleeModal.onOpen()
    }

    useEffect(() => {
        if (!session.data?.user) return
        addEnrolleeModal.selectCurrentUser(session.data.user.id)
        console.log(addEnrolleeModal.currentUserId)
    }, [session])

    const newEnrollees = useMemo(() => {
        if (!enrollees) return []
        return enrollees.filter((enrollee) => {
            return enrollee.status === EnrollmentStatus.REQUESTED
        })
    }, [enrollees])

    const rejectedEnrollees = useMemo(() => {
        if (!enrollees) return []
        return enrollees.filter((enrollee) => {
            return enrollee.status === EnrollmentStatus.REJECTED
        })
    }, [enrollees])

    const approvedEnrollees = useMemo(() => {
        if (!enrollees) return []
        return enrollees.filter((enrollee) => {
            return enrollee.status === EnrollmentStatus.APPROVED
        })
    }, [enrollees])

    return (
        <>
            <ViewEnrolleeModal />
            <AddEnrolleeModal />
            <DashboardHeader
                title="Enrollees"
                actions={[
                    <DashboardButton
                        key="x1"
                        Icon={UserPlus}
                        openModalFunction={addEnrolleeModal.onOpen}
                    />,
                    <TextField.Root key="x2">
                        <TextField.Slot>
                            <Search height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Input placeholder="Search Enrollees..." />
                    </TextField.Root>,
                ]}
            />
            <Tabs.Root defaultValue="new" mt="4">
                <Tabs.List size="2" color="#000">
                    <Tabs.Trigger value="new">
                        New ({newEnrollees.length})
                    </Tabs.Trigger>
                    <Tabs.Trigger value="rejected">
                        Rejected ({rejectedEnrollees.length})
                    </Tabs.Trigger>
                    <Tabs.Trigger value="approved">
                        Approved ({approvedEnrollees.length})
                    </Tabs.Trigger>
                </Tabs.List>

                <Box>
                    <Tabs.Content value="new">
                        <div className="mt-12">
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                                {fetching && (
                                    <Loader2 className="animate-spin" />
                                )}
                                {newEnrollees.map((enrollee) => (
                                    <EnrolleeCard
                                        key={enrollee.id}
                                        enrollee={enrollee}
                                        onDetailsOpen={() =>
                                            handleViewEnrolleeClick(enrollee)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="rejected">
                        <div className="mt-12">
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                                {fetching && (
                                    <Loader2 className="animate-spin" />
                                )}
                                {rejectedEnrollees.map((enrollee) => (
                                    <EnrolleeCard
                                        key={enrollee.id}
                                        enrollee={enrollee}
                                        onDetailsOpen={() =>
                                            handleViewEnrolleeClick(enrollee)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="approved">
                        <div className="mt-12">
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
                                {fetching && (
                                    <Loader2 className="animate-spin" />
                                )}
                                {approvedEnrollees.map((enrollee) => (
                                    <EnrolleeCard
                                        key={enrollee.id}
                                        enrollee={enrollee}
                                        onDetailsOpen={() =>
                                            handleViewEnrolleeClick(enrollee)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </>
    )
}
