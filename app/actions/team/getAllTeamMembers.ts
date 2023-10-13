import prisma from '@/app/libs/prismadb'
import { UserRole } from '@prisma/client'

export default async function getAllTeamMembers() {
    const teamMembers = await prisma.user.findMany({
        where: {
            OR: [
                {
                    role: UserRole.RECRUITER,
                },
                {
                    role: UserRole.ADMIN,
                },
                {
                    role: UserRole.TEAM,
                },
            ],
        },
    })
    return teamMembers
}
