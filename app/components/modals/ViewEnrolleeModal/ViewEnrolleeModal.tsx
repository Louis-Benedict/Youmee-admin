'use client'

import Modal from '@/app/components/modals/Modal'
import useViewEnrolleeModal from './useViewEnrolleeModal'
import { Calendar, Globe, MessageCircle, Phone } from 'lucide-react'
import Checkbox from '../../ui/Checkbox'
import { useCallback } from 'react'
import ModalButton from '../../ui/Button/ModalButton'
import { EnrollmentStatus, UserRole } from '@prisma/client'
import RoleAccessHandler from '../../hoc/RoleAccess'
import { useSession } from 'next-auth/react'
import {
    useDeleteEnrollee,
    usePromoteEnrollee,
    useRejectEnrollee,
} from '@/app/(dashboard)/enrollees/queries'

const ViewEnrolleeModal = () => {
    const session = useSession()

    const { selectedEnrollee, onClose, isOpen } = useViewEnrolleeModal()
    const promoteEnrollee = usePromoteEnrollee()
    const rejectEnrollee = useRejectEnrollee()
    const deleteEnrollee = useDeleteEnrollee()

    const handlePromote = useCallback(() => {
        if (!selectedEnrollee) {
            return null
        }
        promoteEnrollee.mutate(selectedEnrollee.id, {
            onSuccess: () => onClose(),
        })
    }, [selectedEnrollee])

    const handleReject = useCallback(() => {
        if (!selectedEnrollee) {
            return null
        }
        rejectEnrollee.mutate(selectedEnrollee.id, {
            onSuccess: () => onClose(),
        })
    }, [selectedEnrollee])

    const bodyContent = (
        <div>
            <div className="flex flex-col mt-8 gap-6 px-2">
                <div>
                    <div className="text-sm my-1 text-neutral-700 font-bold">
                        Name
                    </div>
                    <div className="text-sm text-neutral-700">
                        {selectedEnrollee?.fullname}
                    </div>
                </div>
                <div>
                    <div className="text-sm my-1 text-neutral-700 font-bold">
                        <Calendar size={16} className="inline mr-1" />
                        Birthday
                    </div>
                    <div className="text-sm text-neutral-700">
                        {selectedEnrollee?.birthday
                            ? new Date(
                                  selectedEnrollee?.birthday
                              ).toDateString()
                            : 'unavailable'}
                    </div>
                </div>
                <div>
                    <div className="text-sm my-1 text-neutral-700 font-bold">
                        <Globe size={16} className="inline mr-1" />
                        Country
                    </div>
                    <div className="text-sm text-neutral-700">
                        {selectedEnrollee?.country}
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-8 gap-6 px-2">
                <div>
                    <div className="text-sm my-1 text-neutral-700 font-bold">
                        <Phone size={16} className="inline mr-1" />
                        Line Id
                    </div>
                    <div className="text-sm text-neutral-700">
                        {selectedEnrollee?.lineId || 'unavailable'}
                    </div>
                </div>
                <div>
                    <div className="text-sm my-1 text-neutral-700 font-bold">
                        <Phone size={16} className="inline mr-1" />
                        Phone number
                    </div>
                    <div className="text-sm text-neutral-700">
                        {selectedEnrollee?.phoneNumber}
                    </div>
                </div>
                <div>
                    <div className="text-sm my-1 text-neutral-700 font-bold">
                        <MessageCircle size={16} className="inline mr-1" />
                        Note
                    </div>
                    <div className="text-sm text-neutral-700">
                        {selectedEnrollee?.note || 'unavailable'}
                    </div>
                </div>
            </div>
        </div>
    )

    const footerContent = <></>

    return (
        <Modal
            isLoading={promoteEnrollee.isLoading || rejectEnrollee.isLoading}
            disabled={promoteEnrollee.isLoading || rejectEnrollee.isLoading}
            isOpen={isOpen}
            title={
                <div className="flex-col gap-4">
                    <div>{selectedEnrollee?.fullname}'s Application</div>
                    <div className="text-xs font-normal text-neutral-600 mt-1">
                        Review an enrolles application
                    </div>
                </div>
            }
            body={bodyContent}
            footer={footerContent}
            onClose={onClose}
            secondaryActionLabel="Reject"
            secondaryAction={
                selectedEnrollee?.status === EnrollmentStatus.REQUESTED
                    ? handleReject
                    : undefined
            }
            actionLabel="Promote"
            onSubmit={
                selectedEnrollee?.status !== EnrollmentStatus.APPROVED
                    ? handlePromote
                    : undefined
            }
        />
    )
}

export default ViewEnrolleeModal
