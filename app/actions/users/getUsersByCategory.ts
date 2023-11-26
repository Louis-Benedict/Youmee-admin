import prisma from '@/app/libs/prisma/prismadb'
import { Category, UserRole } from '@prisma/client'

interface IParams {
    categoryId: Category
}

export default async function getUserByCategory(params: IParams) {
    const { categoryId } = params
    try {
        const usersInCategory = await prisma.user.findMany({
            where: {
                category: categoryId.toUpperCase() as Category,
                role: UserRole.CREATOR,
            },
        })

        if (!usersInCategory) {
            return null
        }

        return usersInCategory
    } catch (error: any) {
        throw new Error(error)
    }
}
