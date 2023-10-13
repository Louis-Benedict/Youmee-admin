import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const body = await request.json()
    const { id } = body

    try {
        const creators = await prisma.user.delete({
            where: {
                id: id,
            },
        })
        return NextResponse.json(creators)
    } catch (error) {
        console.log(error)
    }
}
