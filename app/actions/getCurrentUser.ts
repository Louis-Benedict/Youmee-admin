import { getServerSession } from 'next-auth/next'
import prisma from '@/app/libs/prismadb'
import { UserRole } from '@prisma/client'
import { authOptions } from '../api/v1/auth/[...nextauth]/route'

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser(role?: UserRole) {
    try {
        const session = await getSession()

        if (!session?.user?.id) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        })

        if (!currentUser) {
            return null
        }

        return {
            ...currentUser,
            // createdAt: currentUser.createdAt.toISOString(),
            // updatedAt: currentUser.updatedAt.toISOString(),
            // emailVerified: currentUser.emailVerified?.toISOString() || null,
        }
    } catch (error: any) {
        return null
    }
}
