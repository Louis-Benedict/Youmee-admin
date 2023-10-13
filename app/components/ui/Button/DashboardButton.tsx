'use client'
import { Icon } from 'lucide-react'
import { FC } from 'react'

interface DashboardButtonProps {
    Icon: Icon
    openModalFunction: VoidFunction
}

const DashboardButton: FC<DashboardButtonProps> = ({
    Icon,
    openModalFunction,
}) => {
    return (
        <div className="flex gap-4">
            <div
                className="p-2 cursor-pointer border-[1px] border-neutral-300 bg-white rounded-md transition duration-100 hover:scale-110"
                onClick={openModalFunction}
            >
                <Icon className="text-black" size={20} />
            </div>
        </div>
    )
}

export default DashboardButton
