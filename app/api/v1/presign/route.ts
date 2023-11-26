import { NextResponse } from 'next/server'
import { preSignFile } from '@/app/libs/aws/s3/s3Client'
import { getServerSession } from 'next-auth'
import { ApiError } from 'next/dist/server/api-utils'
import { HttpStatusCode } from 'axios'

async function generatePresignedUrl(request: Request) {
    const session = await getServerSession()
    if (!session) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Enrollee could not be promoted'
        )
    }

    const body = await request.json()
    const { fileType } = body

    const { postUrl, getUrl, fields, key } = await preSignFile(
        fileType,
        'image'
    )

    return NextResponse.json(
        {
            message: 'Success',
            status: 200,
            data: [{ postUrl, getUrl, fields, key }],
        },
        { status: 200 }
    )
}

export const POST = generatePresignedUrl
