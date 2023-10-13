'use client'

import DashboardHeader from '@/app/components/ui/admin/DashboardHeader'
import { Loader2 } from 'lucide-react'
import { useFetchTeamMember } from '../queries'


export default function page() {
    const {fetching, teamMember} = useFetchTeamMember()


    return (
        <div>


            <DashboardHeader
                title={}
                actions={[]}
            />

            {user.isLoading && <Loader2 className="animate-spin" />}

            <div className="grid grid-cols-4 md:grid-cols-7  gap-4 mt-8">

            </div>
        </div>
    )
}
