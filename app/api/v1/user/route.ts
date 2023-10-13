import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { UserRole } from '@prisma/client'

export async function POST(request: NextRequest) {
    const body = await request.json()

    try {
        const {
            id,
            name,
            email,
            image,
            alias,
            phoneNumber,
            bio,
            category,
            knownFor,
            country,
        } = body

        const existingEnrollee = await prisma.enrollee.findUnique({
            where: { id },
        })

        if (!existingEnrollee)
            return NextResponse.json(
                { error: 'Resource not found' },
                { status: 500 }
            )

        const newCreator = await prisma.user.create({
            data: {
                role: UserRole.CREATOR,
                alias,
                name,
                email,
                image,
                phoneNumber,
                bio,
                category,
                knownFor,
                country,
            },
        })

        if (newCreator) {
        }
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 })
}
