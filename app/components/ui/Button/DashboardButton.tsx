'use client'

import { FC } from 'react'

interface DashboardButtonProps {
    openModalFunction: VoidFunction
}

const DashboardButton: FC<DashboardButtonProps> = ({ openModalFunction }) => {
    return (
        <div className="flex gap-4">
            <div
                className="p-2 cursor-pointer border-[1px] border-neutral-300 bg-white rounded-md transition duration-100 hover:scale-110"
                onClick={openModalFunction}
            ></div>
        </div>
    )
}

export default DashboardButton
