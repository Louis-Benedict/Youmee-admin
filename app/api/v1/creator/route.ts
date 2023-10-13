import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import { CATEGORIES_PAGINATION_TAKE } from '@/app/static/config'
import { Category, UserRole } from '@prisma/client'

export async function GET(request: Request) {
    const take = CATEGORIES_PAGINATION_TAKE
    const { searchParams } = new URL(request.url)

    const cursorQuery = searchParams.get('cursor')
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    const parsedMinPrice = minPrice ? +minPrice : undefined
    const parsedMaxPrice = maxPrice ? +maxPrice : undefined
    console.log(parsedMinPrice, parsedMaxPrice)

    const skip = cursorQuery ? 1 : 0
    const cursor = cursorQuery ? { id: cursorQuery } : undefined

    console.log(cursorQuery, category)

    try {
        const creators = await prisma.user.findMany({
            where: {
                AND: [
                    { role: UserRole.CREATOR },
                    { category: category?.toUpperCase() as Category },
                    { rate: { gte: parsedMinPrice } },
                    { rate: { lte: parsedMaxPrice } },
                ],
            },
            skip,
            take,
            cursor,
        })

        const nextId =
            creators.length < take ? undefined : creators[take - 1].id

        let data = { creators, nextId }
        console.log(data)

        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
    }
}
