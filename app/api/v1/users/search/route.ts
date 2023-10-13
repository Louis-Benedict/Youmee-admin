import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get('query')
        console.log('🚀 ~ file: route.ts:7 ~ GET ~ query:', query)

        if (!query) return NextResponse.json([])
        console.log('🚀 ~ file: route.ts:13 ~ GET ~ query:', query)
        if (query.length < 2) return NextResponse.json([])

        const pipeline = [
            {
                $search: {
                    index: 'names',
                    text: {
                        query: query,
                        path: 'name',
                        fuzzy: {},
                    },
                },
            },
            { $limit: 5 },
            {
                $project: {
                    id: {
                        $getField: {
                            field: 'oid',
                            input: '_id',
                        },
                    },
                    name: 1,
                    image: 1,
                    knownFor: 1,
                    _id: 0,
                },
            },
        ]

        const userSearchResults = await prisma.user.aggregateRaw({
            pipeline,
        })
        console.log(
            '🚀 ~ file: route.ts:30 ~ GET ~ userSearchResults:',
            userSearchResults
        )

        return NextResponse.json(userSearchResults)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}
