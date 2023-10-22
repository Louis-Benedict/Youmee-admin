import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
import { UserRole } from '@prisma/client'

export default withAuth(
    async function middleware(req: NextRequest) {
        // Manage route protection
        const token = await getToken({ req })
        const isAuth =
            !!token &&
            [UserRole.ADMIN, UserRole.RECRUITER, UserRole.TEAM].some(
                (role) => role === token.role
            )

        const isAuthPage = req.nextUrl.pathname.startsWith('/login')

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/', req.url))
            }

            return null
        }

        if (!isAuth) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    },
    {
        callbacks: {
            async authorized() {
                return true
            },
        },
    }
)

export const config = {
    // Skip all paths that should not be internationalized. This example skips the
    // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}
