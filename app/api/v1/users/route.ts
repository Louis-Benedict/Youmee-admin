import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { UserRole } from '@prisma/client'

export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        role: UserRole.USER,
                    },
                    {
                        role: UserRole.CREATOR,
                    },
                ],
            },
        })
        return NextResponse.json(users)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Unknown error', status: 500 },
            { status: 500 }
        )
    }
}

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
