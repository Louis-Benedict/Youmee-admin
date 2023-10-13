import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { HttpStatusCode } from 'axios'
import { UserRole } from '@prisma/client'
import { ApiRouteParameter } from '@/app/types'

export default function withAuthGuard(allowedRoles: UserRole[]) {
    return async (
        req: NextRequest,
        params: ApiRouteParameter,
        next: () => void
    ) => {
        const token = await getToken({
            req: req,
            secret: process.env.NEXTAUTH_SECRET,
        })

        const userRole = token?.role

        if (userRole && allowedRoles.includes(userRole)) {
            return next()
        }

        return NextResponse.json(
            { message: 'Not authorized' },
            { status: HttpStatusCode.Unauthorized }
        )
    }
}
