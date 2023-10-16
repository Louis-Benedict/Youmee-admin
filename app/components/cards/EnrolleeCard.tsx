import { FC } from 'react'
import { Enrollee, EnrollmentStatus, UserRole } from '@prisma/client'
import {
    ArrowUpRight,
    BadgeCheck,
    Facebook,
    Instagram,
    Loader2,
    Mail,
    MailCheck,
    ThumbsDown,
    Trash,
    User,
    Youtube,
} from 'lucide-react'
import { Avatar, Button, IconButton, Text } from '@radix-ui/themes'
import {
    usePromoteEnrollee,
    useRejectEnrollee,
    useSetNotified,
} from '@/app/(dashboard)/enrollees/queries'

import { TeamMember } from '@/app/(dashboard)/team/queries'
import RoleAccessHandler from '../hoc/RoleAccess'
import { useSession } from 'next-auth/react'
import { FaTiktok } from 'react-icons/fa'
import Link from 'next/link'
import { toInitials } from '@/app/utils/toInitials'
import useConfirmDialog from '../modals/ConfirmDialog/useConfirmDialog'

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
    const promoteEnrollee = usePromoteEnrollee()
    const rejectEnrollee = useRejectEnrollee()
    const confirmDialog = useConfirmDialog()

    const handleSetNotified = () => {
        setNotified.mutate({
            id: enrolleeId,
            isContacted: !enrollee.isContacted,
        })
    }

    const handleDeleteClick = () => {
        confirmDialog.setId(enrolleeId)
        confirmDialog.onOpen()
    }
    const handlePromote = () => promoteEnrollee.mutate(enrolleeId)
    const handleReject = () => rejectEnrollee.mutate(enrolleeId)

    return (
        <div className="relative w-full h-full flex flex-col border-[1px] border-neutral-300 rounded-md bg-white bg-opacity-70">
            <div className="relative h-full">
                <div className="flex flex-col p-3 justify-between h-full">
                    <div className="flex flex-col gap-3 h-full">
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col gap-1 justify-start">
                                <div className="text-sm font-bold text-neutral-700 leading-3">
                                    {enrollee.fullname}
                                </div>
                                <div className="text-[10px] text-neutral-600">
                                    {enrollee.alias}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="1"
                                    onClick={onDetailsOpen}
                                    className="text-[10px] max-w-[50px]"
                                >
                                    Details
                                    <ArrowUpRight size={12} />
                                </Button>
                            </div>

                            <div className="flex flex-col justify-end items-center gap-1">
                                <IconButton
                                    size="1"
                                    variant="soft"
                                    color={
                                        enrollee.isContacted
                                            ? 'green'
                                            : 'crimson'
                                    }
                                    onClick={handleSetNotified}
                                >
                                    {enrollee.isContacted ? (
                                        <MailCheck size={16} />
                                    ) : (
                                        <Mail size={16} />
                                    )}
                                </IconButton>
                                <IconButton
                                    variant="soft"
                                    size="1"
                                    color="red"
                                    onClick={handleDeleteClick}
                                >
                                    <Trash size={16} />
                                </IconButton>
                            </div>
                        </div>
                        <hr />
                        {(enrollee.instagramHandle ||
                            enrollee.facebookHandle ||
                            enrollee.tiktokHandle ||
                            enrollee.youtubeHandle) && (
                            <>
                                <div className="flex gap-1 justify-evenly items-center">
                                    {enrollee.instagramHandle && (
                                        <IconButton
                                            variant="ghost"
                                            color="gray"
                                        >
                                            <Link
                                                target="_blank"
                                                href={`https://www.instagram.com/${enrollee.instagramHandle}`}
                                            >
                                                <Instagram size={16} />
                                            </Link>
                                        </IconButton>
                                    )}
                                    {enrollee.facebookHandle && (
                                        <IconButton
                                            variant="ghost"
                                            color="gray"
                                        >
                                            <Link
                                                target="_blank"
                                                href={`https://www.facebook.com/${enrollee.facebookHandle}`}
                                            >
                                                <Facebook size={16} />
                                            </Link>
                                        </IconButton>
                                    )}
                                    {enrollee.youtubeHandle && (
                                        <IconButton
                                            variant="ghost"
                                            color="gray"
                                        >
                                            <Link
                                                target="_blank"
                                                href={`https://www.youtube.com/@${enrollee.youtubeHandle}`}
                                            >
                                                <Youtube size={18} />
                                            </Link>
                                        </IconButton>
                                    )}
                                    {enrollee.tiktokHandle && (
                                        <IconButton
                                            variant="ghost"
                                            color="gray"
                                        >
                                            <Link
                                                target="_blank"
                                                href={`https://www.tiktok.com/@${enrollee.tiktokHandle}`}
                                            >
                                                <FaTiktok size={14} />
                                            </Link>
                                        </IconButton>
                                    )}
                                </div>
                                <hr />
                            </>
                        )}
                        <div className="text-xs">
                            <div className="font-semibold text-neutral-700 text-[11px]">
                                Enrollment Date
                            </div>
                            <div className="text-[11px]">
                                {new Date(
                                    enrollee.createdAt
                                ).toLocaleDateString()}
                            </div>
                        </div>
                        {enrollee.recruiter && (
                            <RoleAccessHandler
                                allowedRoles={[UserRole.ADMIN]}
                                userRole={session.data?.user.role}
                            >
                                <div className="text-xs flex flex-col mb-2">
                                    <div className="flex gap-2 p-1">
                                        <Avatar
                                            src=""
                                            fallback={toInitials(
                                                enrollee.recruiter.name!
                                            )}
                                        />
                                        <div className="flex flex-col ">
                                            <Text size="1" weight="medium">
                                                Recruiter
                                            </Text>
                                            <div className="text-[11px]">
                                                {enrollee.recruiter?.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RoleAccessHandler>
                        )}
                    </div>
                    <div className="flex justify-end items-center gap-1">
                        <hr />
                        {enrollee.status === EnrollmentStatus.REQUESTED && (
                            <Button
                                variant="soft"
                                size="1"
                                color="gray"
                                onClick={handleReject}
                                className=" mt-3"
                            >
                                {rejectEnrollee.isLoading ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <ThumbsDown size={14} />
                                )}
                                <div>Reject</div>
                            </Button>
                        )}

                        {(enrollee.status === EnrollmentStatus.REQUESTED ||
                            enrollee.status === EnrollmentStatus.REJECTED) && (
                            <Button
                                variant="soft"
                                size="1"
                                onClick={handlePromote}
                                className=" mt-3"
                            >
                                {promoteEnrollee.isLoading ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <BadgeCheck size={14} />
                                )}
                                <div>Approve</div>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnrolleeCard
