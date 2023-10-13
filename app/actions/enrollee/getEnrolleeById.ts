import prisma from '@/app/libs/prismadb'

export default async function getEnrolleeById(enrolleeId: string) {
    const enrollee = await prisma.enrollee.findUnique({
        where: { id: enrolleeId },
    })

    if (!enrollee) return null

    return enrollee
}
