import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { ApiRouteParameter } from '@/app/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { ApiError } from '@/app/libs/middlewares/withLogging'
import { HttpStatusCode } from 'axios'

async function editUser(req: NextRequest, urlParameter: ApiRouteParameter) {
    const currentUser = await getServerSession(authOptions)

    if (!currentUser) {
        throw new ApiError(HttpStatusCode.Unauthorized, 'Not authorized')
    }

    const body = await req.json()
    const { image, name, phoneNumber, lineId } = body

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.user.id,
        },
        data: {
            name,
            image,
            phoneNumber,
            lineId,
        },
    })

    return NextResponse.json(
        { message: 'Success', status: 200, data: [updatedUser] },
        { status: 200 }
    )
}

export const PUT = withExceptionFilter(editUser)
