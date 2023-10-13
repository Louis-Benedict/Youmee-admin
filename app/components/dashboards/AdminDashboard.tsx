'use client'

import { FC } from 'react'
import ErrorReportModal from '../modals/ErrorReportModal'
import { Zap } from 'lucide-react'

interface AdminDashboardProps {}

const AdminDashboard: FC<AdminDashboardProps> = ({}) => {
    return (
        <div>
            <div className="absolute flex items-center  top-0 z-50 w-full h-[25px] bg-pink-500 text-xs text-white ">
                <div className="relative gap-2 flex justify-between  mx-auto">
                    <div className="flex gap-2">
                        <Zap size={14} fill="#fff" />
                        This app is still in development. Something's not right?
                    </div>
                    <div className="flex gap-2">
                        <span className="font-bold">
                            <ErrorReportModal />
                        </span>
                        to report an error
                        <Zap size={14} fill="#fff" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
