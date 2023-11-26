import { getServerSession } from 'next-auth'
import { authOptions } from '../api/v1/auth/[...nextauth]/route'
import { ApiError } from 'next/dist/server/api-utils'
import { HttpStatusCode } from 'axios'
import { UserRole } from '@prisma/client'

export async function grantRoleAccess(roles: UserRole[]) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new ApiError(HttpStatusCode.Forbidden, 'Not authenticated')
    }

    if (!roles.includes(session.user.role)) {
        throw new ApiError(HttpStatusCode.Unauthorized, 'Not authorized')
    }
}
