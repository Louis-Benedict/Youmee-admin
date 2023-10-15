import { FC } from 'react'
import { Enrollee, EnrollmentStatus, UserRole } from '@prisma/client'
import { BadgeCheck, Loader2, ThumbsDown, Trash, User } from 'lucide-react'
import {
    Avatar,
    Button,
    Flex,
    IconButton,
    Switch,
    Text,
} from '@radix-ui/themes'
import {
    useDeleteEnrollee,
    usePromoteEnrollee,
    useRejectEnrollee,
    useSetNotified,
} from '@/app/(dashboard)/enrollees/queries'
import { config } from '@/app/config/config'
import { TeamMember } from '@/app/(dashboard)/team/queries'
import RoleAccessHandler from '../hoc/RoleAccess'
import { useSession } from 'next-auth/react'

interface EnrolleeCardProps {
    enrollee: Enrollee & {
        recruiter?: TeamMember
    }
    onDetailsOpen: VoidFunction
}

const EnrolleeCard: FC<EnrolleeCardProps> = ({ enrollee, onDetailsOpen }) => {
    const session = useSession()
    const enrolleeId = enrollee.id
    const setNotified = useSetNotified()
    const deleteEnrollee = useDeleteEnrollee()
    const promoteEnrollee = usePromoteEnrollee()
    const rejectEnrollee = useRejectEnrollee()

    const handleSetNotified = (toggledValue: boolean) => {
        setNotified.mutate({ id: enrolleeId, isContacted: toggledValue })
    }
    const handleDelete = () => deleteEnrollee.mutate(enrolleeId)
    const handlePromote = () => promoteEnrollee.mutate(enrolleeId)
    const handleReject = () => rejectEnrollee.mutate(enrolleeId)

    return (
        <div className="relative w-full flex flex-col border-[1px] border-neutral-300 rounded-md bg-white bg-opacity-70">
            <div className="relative ">
                <div className="flex flex-col gap-3 p-4 h-full">
                    <div className="mb-1 flex justify-between items-center">
                        {enrollee.status === EnrollmentStatus.REQUESTED && (
                            <IconButton
                                variant="soft"
                                size="3"
                                onClick={handleReject}
                            >
                                {rejectEnrollee.isLoading ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <ThumbsDown size={16} />
                                )}
                            </IconButton>
                        )}
                        <div className="mx-auto">
                            <div className="text-sm font-bold text-center mb-1 text-neutral-700 leading-3">
                                {enrollee.fullname}
                            </div>
                            <div className="text-[10px] text-center text-neutral-600">
                                {enrollee.alias}
                            </div>
                        </div>
                        {(enrollee.status === EnrollmentStatus.REQUESTED ||
                            enrollee.status === EnrollmentStatus.REJECTED) && (
                            <IconButton
                                variant="soft"
                                size="3"
                                onClick={handlePromote}
                            >
                                {promoteEnrollee.isLoading ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <BadgeCheck size={16} />
                                )}
                            </IconButton>
                        )}
                    </div>

                    <hr />
                    {enrollee.recruiter && (
                        <RoleAccessHandler
                            allowedRoles={[UserRole.ADMIN]}
                            userRole={session.data?.user.role}
                        >
                            <div className="text-xs flex flex-col gap-2">
                                <Text size="1" weight="bold">
                                    Recruited By
                                </Text>
                                <div className="flex gap-2 p-2 ">
                                    <Avatar
                                        src={
                                            config.cdnBaseUrl +
                                            enrollee.recruiter.image
                                        }
                                        fallback=""
                                    />
                                    <div className="flex flex-col gap-1">
                                        <div>{enrollee.recruiter?.name}</div>
                                        <div>{enrollee.recruiter?.email}</div>
                                    </div>
                                </div>
                            </div>
                        </RoleAccessHandler>
                    )}
                    <hr />
                    <div className="text-xs flex flex-col gap-2">
                        <Text size="1">
                            <Flex gap="2">
                                <Switch
                                    size="1"
                                    defaultChecked={enrollee.isContacted}
                                    radius="full"
                                    onCheckedChange={handleSetNotified}
                                />
                                Has been contacted
                            </Flex>
                        </Text>
                    </div>

                    <hr />
                    <div className="flex text-xs font-semibold text-white gap-1 mt-auto">
                        <div className="flex justify-end items-center gap-2 mt-2">
                            <Button
                                variant="ghost"
                                size="1"
                                onClick={onDetailsOpen}
                            >
                                <User size={16} />
                                Details
                            </Button>

                            <Button
                                variant="solid"
                                size="1"
                                color="red"
                                onClick={handleDelete}
                            >
                                {deleteEnrollee.isLoading ? (
                                    <Loader2
                                        size={14}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <Trash size={14} />
                                )}
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnrolleeCard
