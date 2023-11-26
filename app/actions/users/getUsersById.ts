import prisma from '@/app/libs/prisma/prismadb'
import { grantRoleAccess } from '../util/checkRoleAccess'

interface IParams {
    favoriteIds: any
}

export default async function getUsersById(params: IParams) {
    try {
        const { role, id } = await grantRoleAccess([])

        const { favoriteIds } = params

        const user = await prisma.user.findMany({
            where: {
                id: { in: favoriteIds },
            },
        })

        if (!user) {
            return null
        }

        return user
    } catch (error: any) {
        throw new Error(error)
    }
}
