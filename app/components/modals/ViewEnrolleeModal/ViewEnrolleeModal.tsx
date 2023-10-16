'use client'

import useViewEnrolleeModal from './useViewEnrolleeModal'
import {
    Badge,
    Calendar,
    Facebook,
    Globe,
    Instagram,
    Mail,
    MessageCircle,
    Phone,
    Youtube,
} from 'lucide-react'
import RModal from '../RModal'
import { FaBirthdayCake, FaTiktok } from 'react-icons/fa'
import { Badge as StatusBadge } from '@radix-ui/themes'

const ViewEnrolleeModal = () => {
    const { selectedEnrollee, isOpen, onClose } = useViewEnrolleeModal()

    const bodyContent = (
        <div className="flex flex-col gap-6 my-2 ml-2">
            <div className="flex flex-col gap-2 w-1/2">
                <div className="font-[500] text-black text-sm">General</div>
                <div className="rounded-md flex flex-col gap-1 py-2 mr-2 relative">
                    <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                        <Calendar size={12} className="inline mr-1" />
                        Enrollment Date
                    </div>
                    <div className="text-[12px] text-neutral-700">
                        {selectedEnrollee?.createdAt
                            ? new Date(
                                  selectedEnrollee?.createdAt
                              ).toDateString()
                            : 'unavailable'}
                    </div>
                </div>
                <div className="absolute top-2 right-2 rounded-md flex flex-col gap-1 py-2 mr-2">
                    <StatusBadge size="2">
                        {selectedEnrollee?.status}
                    </StatusBadge>
                </div>
            </div>
            <hr />
            <div className="flex gap-6 pr-3">
                <div className="flex flex-col gap-2 w-1/2">
                    <div className="font-[500] text-black">
                        Personal Information
                    </div>
                    <div className="rounded-md flex flex-col gap-1 py-2 mr-2 relative">
                        <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                            <FaBirthdayCake size={12} className="inline mr-1" />
                            Birthday
                        </div>
                        <div className="text-[12px] text-neutral-700">
                            {selectedEnrollee?.birthday
                                ? new Date(
                                      selectedEnrollee?.birthday
                                  ).toDateString()
                                : 'unavailable'}
                        </div>
                    </div>
                    <div className="rounded-md flex flex-col gap-1 py-2 mr-2 relative">
                        <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                            <Globe size={12} className="inline mr-1" />
                            Country
                        </div>
                        <div className="text-[12px] text-neutral-700">
                            {selectedEnrollee?.country}
                        </div>
                    </div>
                    <div className="rounded-md flex flex-col gap-1 py-2 mr-2 relative">
                        <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                            <Mail size={12} className="inline mr-1" />
                            Email
                        </div>
                        <div className="text-[12px] text-neutral-700">
                            {selectedEnrollee?.email}
                        </div>
                    </div>
                    <div className="rounded-md flex flex-col gap-1 py-2 mr-2 relative">
                        <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                            <Phone size={12} className="inline mr-1" />
                            Line Id
                        </div>
                        <div className="text-[12px] text-neutral-700">
                            {selectedEnrollee?.lineId || 'unavailable'}
                        </div>
                    </div>
                    <div className="rounded-md flex flex-col gap-1 py-2 mr-2 relative">
                        <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                            <Phone size={12} className="inline mr-1" />
                            Phone number
                        </div>
                        <div className="text-[12px] text-neutral-700">
                            {selectedEnrollee?.phoneNumber}
                        </div>
                    </div>
                    <div className="rounded-md flex flex-col gap-1 py-2 mr-2 relative">
                        <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                            <MessageCircle size={12} className="inline mr-1" />
                            Note
                        </div>
                        <div className="text-[12px] text-neutral-700">
                            {selectedEnrollee?.note || 'unavailable'}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                    <div className="font-[500] text-black">Social Media</div>
                    {!selectedEnrollee?.facebookHandle &&
                        !selectedEnrollee?.tiktokHandle &&
                        !selectedEnrollee?.youtubeHandle &&
                        !selectedEnrollee?.instagramHandle && (
                            <div className="text-xs">
                                No information available
                            </div>
                        )}
                    {selectedEnrollee?.instagramHandle && (
                        <div className="border-[1px] rounded-md flex flex-col gap-1 p-2 mr-2 relative">
                            <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                                <Instagram
                                    size={14}
                                    className="inline mr-1"
                                    strokeWidth={2}
                                />
                                Instagram
                            </div>
                            <hr />
                            <div className="flex gap-4 p-2">
                                <div className="flex flex-col gap-1">
                                    <div className="text-[10px] font-semibold">
                                        Username
                                    </div>
                                    <div className="text-[12px] text-neutral-700">
                                        {selectedEnrollee?.instagramHandle ||
                                            'unavailable'}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-[10px] font-semibold">
                                        Followers
                                    </div>
                                    <div className="text-[12px] text-neutral-700">
                                        {selectedEnrollee?.instagramFollowers ||
                                            'unavailable'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedEnrollee?.facebookHandle && (
                        <div className="border-[1px] rounded-md flex flex-col gap-1 p-2 mr-2 relative">
                            <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                                <Facebook
                                    size={16}
                                    strokeWidth={1}
                                    className="inline mr-1"
                                />
                                Facebook
                            </div>
                            <hr />
                            <div className="flex gap-4 p-2">
                                <div className="flex flex-col gap-1">
                                    <div className="text-[10px] font-semibold">
                                        Username
                                    </div>
                                    <div className="text-[12px] text-neutral-700">
                                        {selectedEnrollee?.facebookHandle ||
                                            'unavailable'}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-[10px] font-semibold">
                                        Followers
                                    </div>
                                    <div className="text-[12px] text-neutral-700">
                                        {selectedEnrollee?.facebookFollowers ||
                                            'unavailable'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedEnrollee?.tiktokHandle && (
                        <div className="border-[1px] rounded-md flex flex-col gap-1 p-2 mr-2 relative">
                            <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                                <FaTiktok
                                    size={14}
                                    className="inline mr-1"
                                    strokeWidth={2}
                                />
                                TikTok
                            </div>
                            <hr />
                            <div className="flex gap-4 p-2">
                                <div className="flex flex-col gap-1">
                                    <div className="text-[10px] font-semibold">
                                        Username
                                    </div>
                                    <div className="text-[12px] text-neutral-700">
                                        {selectedEnrollee?.tiktokHandle ||
                                            'unavailable'}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-[10px] font-semibold">
                                        Followers
                                    </div>
                                    <div className="text-[12px] text-neutral-700">
                                        {selectedEnrollee?.tiktokFollowers ||
                                            'unavailable'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedEnrollee?.youtubeHandle && (
                        <div className="border-[1px] rounded-md flex flex-col gap-1 p-2 mr-2 relative">
                            <div className="flex items-center text-[12px] text-neutral-700 font-[500]">
                                <Youtube
                                    size={16}
                                    className="inline mr-1"
                                    strokeWidth={2}
                                />
                                Youtube
                            </div>
                            <hr />
                            <div className="flex gap-4 p-2">
                                <div className="flex flex-col gap-1">
                                    <div className="text-[10px] font-semibold">
                                        Username
                                    </div>
                                    <div className="text-[12px] text-neutral-700">
                                        {selectedEnrollee?.youtubeHandle ||
                                            'unavailable'}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-[10px] font-semibold">
                                        Followers
                                    </div>
                                    <div className="text-[12px] text-neutral-700">
                                        {selectedEnrollee?.youtubeFollowers ||
                                            'unavailable'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <RModal
            maxWidth={600}
            isLoading={false}
            disabled={false}
            isOpen={isOpen}
            body={bodyContent}
            secondaryAction={onClose}
            secondaryActionLabel="Close"
            title={`${selectedEnrollee?.fullname} Application`}
            subtitle=""
        />
    )
}

export default ViewEnrolleeModal
