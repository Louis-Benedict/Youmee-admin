import prisma from '@/app/libs/prisma/prismadb'
import { User, UserRole } from '@prisma/client'

export interface IUserFilterParams {
    role?: UserRole
    category?: string
    price?: string
}

export default async function getUsers(
    params: IUserFilterParams
): Promise<User[]> {
    try {
        const { role } = params

        let query: any = {}

        if (role) query.role = role

        const adminUsers = await prisma.user.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc',
            },
        })

        const safeUsers = adminUsers.map((clip: any) => ({
            ...clip,
            createdAt: clip.createdAt.toISOString(),
        }))

        return safeUsers
    } catch (error: any) {
        throw new Error(error)
    }
}
