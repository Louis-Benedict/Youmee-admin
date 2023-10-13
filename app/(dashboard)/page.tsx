import { getServerSession } from 'next-auth'
import { authOptions } from '../api/v1/auth/[...nextauth]/route'
import { UserRole } from '@prisma/client'
import AdminDashboard from '../components/dashboards/AdminDashboard'
import TeamDashboard from '../components/dashboards/TeamDashboard'
import RecruiterDashboard from '../components/dashboards/RecruiterDashboard'
import NotAuthenticated from '../not-authenticated'

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) return NotAuthenticated()
    const userRole = session.user.role

    return (
        <div className="dark:text-white text-primary-dark">
            {userRole === UserRole.ADMIN && <AdminDashboard />}
            {userRole === UserRole.TEAM && <TeamDashboard />}
            {userRole === UserRole.RECRUITER && <RecruiterDashboard />}
        </div>
    )
}
