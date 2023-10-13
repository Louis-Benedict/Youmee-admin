import { FC, ReactNode } from 'react'

interface DashboardHeaderProps {
    title: string
    actions: ReactNode[]
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ title, actions }) => {
    return (
        <nav className="col-span-4">
            <div className="dark:text-white text-primary-dark right text-xs font-semibold flex flex-row justify-between">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="lg:text-4xl text-3xl dark:text-white text-primary-dark font-bold ">
                        {title}
                    </div>
                    <div className="flex gap-2">{actions}</div>
                </div>
            </div>
        </nav>
    )
}

export default DashboardHeader
