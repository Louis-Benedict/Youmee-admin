import prisma from '@/app/libs/prisma/prismadb'

interface IParams {
    userId: string
}

export default async function getCurrentUser({ userId }: IParams) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        return user
    } catch (error: any) {
        return null
    }
}
