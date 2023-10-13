import { authOptions } from '@/app/api/v1/auth/[...nextauth]/route'
import AdminNavbar from '@/app/components/ui/admin/AdminNavbar'
import NotFound from '@/app/not-found'
import { UserRole } from '@prisma/client'
import { getServerSession } from 'next-auth'

export default async function page() {
    const session = await getServerSession(authOptions)
    if (!session) return null

    const userRole = session.user.role
    if (userRole === UserRole.RECRUITER) {
        return NotFound()
    }

    return (
        <div className="dark:text-white text-primary-dark">
            <AdminNavbar title="Users" />
        </div>
    )
}
