'use client'

import { FC, useState } from 'react'
import { ClientUser } from '@/app/types'
import { useSession } from 'next-auth/react'
import Avatar from '../Avatar'
import { ChevronDown } from 'lucide-react'
import Calendar from '../../inputs/Calendar'
import useAnalyicsDashboardStore from '@/app/(dashboard)/analyticsStore'

interface NavbarProps {
    title: string
}

const Navbar: FC<NavbarProps> = ({ title }) => {
    const [openDate, setOpenDate] = useState(false)
    const { data } = useSession()

    const { range, setDateRange } = useAnalyicsDashboardStore((state) => ({
        range: state.range,
        setDateRange: state.setDateRange,
    }))

    return (
        <nav className="col-span-4">
            <div className="dark:text-white text-primary-dark right text-xs font-semibold flex flex-row justify-between">
                <div className="flex flex-row justify-between items-center">
                    <div className="text-3xl dark:text-white text-primary-dark font-bold ">
                        {title}
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className=" ">
                        <Calendar
                            value={range}
                            onChange={(value) =>
                                setDateRange({ ...value.range1 })
                            }
                        />
                    </div>
                    {/* <div className="flex flex-row gap-2 items-center">
                        <Avatar
                            size={40}
                            semi
                            url={concatUrl(data?.user.image as string)}
                        />
                        <div className="text-sm">{data?.user.name}</div>
                        <ChevronDown />
                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
