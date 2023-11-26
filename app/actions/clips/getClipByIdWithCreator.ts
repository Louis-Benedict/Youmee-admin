import prisma from '@/app/libs/prisma/prismadb'

interface IParams {
    clipId: string
}

export default async function getClipById(params: IParams) {
    try {
        const { clipId } = params

        const clip = await prisma.clip.findUnique({
            where: {
                id: clipId,
            },
            include: {},
        })

        if (!clip) {
            return null
        }

        return clip
    } catch (error: any) {
        throw new Error(error)
    }
}
