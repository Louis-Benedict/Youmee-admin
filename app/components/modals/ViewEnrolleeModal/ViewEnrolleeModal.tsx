'use client'

import useViewEnrolleeModal from './useViewEnrolleeModal'
import { Calendar, Globe, MessageCircle, Phone } from 'lucide-react'
import RModal from '../RModal'

const ViewEnrolleeModal = () => {
    const { selectedEnrollee, isOpen, onClose } = useViewEnrolleeModal()

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

    return (
        <RModal
            isLoading={false}
            disabled={false}
            isOpen={isOpen}
            body={bodyContent}
            onOpenChange={() => {}}
            secondaryAction={onClose}
            secondaryActionLabel="Close"
            title={`${selectedEnrollee?.fullname} Application`}
            subtitle="View the Application"
        />
    )
}

export default ViewEnrolleeModal
