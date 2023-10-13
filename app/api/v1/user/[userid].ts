import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'

export async function GET(request: Request) {
    try {
        const body = await request.json()
        const { id } = body.query

        const existingUser = await prisma.user.findUnique({
            where: { id },
        })

        return NextResponse.json(existingUser)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}
