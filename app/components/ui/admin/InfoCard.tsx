'use client'

import { cn } from '@/app/utils/util'
import { ArrowBigUp, ArrowUp, Loader2 } from 'lucide-react'
import { FC } from 'react'

interface InfoCardProps {
    title: string
    data: string | number | undefined
    onClick?: () => void
    className?: string
    isLoading?: boolean
}

const InfoCard: FC<InfoCardProps> = ({
    title,
    data,
    className,
    onClick,

    isLoading,
}) => {
    return (
        <>
            {isLoading ? (
                <Loader2 />
            ) : (
                <div
                    className={cn(
                        'relative col-start-1 h-full rounded-md ',
                        className
                    )}
                    onClick={onClick}
                >
                    <div className="dark:bg-primary-dark bg-white h-full rounded-xl hover:bg-opacity-80">
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 right-0 text-xs font-bold mr-2 text-green-700 items-center rounded-xl flex flex-row gap-1  w-fit p-2">
                            <ArrowBigUp
                                size={16}
                                className="inline fill-green-700"
                            />
                            <div className="">2.6%</div>
                        </div>
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 right-0">
                            <div className=" min-w-[120px] text-sm text-neutral-500">
                                {title}
                            </div>
                            <div className="font-bold text-2xl ">{data}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default InfoCard
