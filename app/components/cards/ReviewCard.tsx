'use client'

import Avatar from '../ui/Avatar'
import RatingIndicator from '../ui/RatingIndicator'
import { ReviewWithSenderAndOccasion } from '@/app/types'
import { config } from '@/app/config/config'

interface ReviewCardProps extends ReviewWithSenderAndOccasion {}

const ReviewCard = ({
    senderImage,
    senderName,
    message,
    occasion,
    rating,
}: ReviewCardProps) => {
    return (
        <div className="relative shrink-0 h-[180px] w-[300px] mr-[10px]  rounded-md dark:dark:bg-primary-dark bg-white bg-opacity-70 cursor-pointer ">
            <div className="p-4 flex">
                <div className="h-full w-full">
                    <div className="w-full h-full flex flex-col">
                        <div className="flex flex-row mb-5 justify-between">
                            <div className="flex flex-row">
                                <Avatar
                                    semi
                                    size={42}
                                    url={config.cdnBaseUrl + senderImage}
                                />
                                <div className="ml-2">
                                    <div className="font-semibold text-sm">
                                        {senderName}
                                    </div>
                                    <div className="text-xs">{occasion}</div>
                                </div>
                            </div>

                            <div className="flex text-xs font-semibold">
                                <RatingIndicator rating={rating} />
                            </div>
                        </div>

                        <div className="mb-1 whitespace-normal text-xs w-full text-neutral-500 break-words text-ellipsis">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
