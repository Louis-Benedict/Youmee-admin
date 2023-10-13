import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import { NotificationType, OrderStatus, User, UserRole } from '@prisma/client'

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!(currentUser && currentUser.role == UserRole.CREATOR))
            return NextResponse.error()

        const body = await request.json()

        const { targetOrderId, key: fileKey } = body

        console.log(targetOrderId, fileKey)

        const updatedOrder = await fulfillOrderTransaction(
            currentUser,
            fileKey,
            targetOrderId
        )

        return NextResponse.json({ updatedOrder })
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }
}

async function fulfillOrderTransaction(
    creator: User,
    fileKey: string,
    targetOrderId: string
) {
    return await prisma.$transaction(async (tx) => {
        console.log(creator)
        console.log(fileKey)
        console.log(targetOrderId)
        const clip = await tx.clip.create({
            data: {
                userId: creator.id,
                duration: '0.50',
                clipUrl: fileKey,
            },
        })
        const updatedOrder = await tx.order.update({
            where: {
                id: targetOrderId,
            },
            data: {
                clipId: clip.id,
                status: OrderStatus.FULFILLED,
            },
        })

        if (!creator.rate)
            throw Error(
                'Trying to access rate on creator, which has not been set.'
            )

        await tx.user.update({
            where: {
                id: creator.id,
            },
            data: {
                balance: { increment: creator.rate },
            },
        })

        console.log(updatedOrder)

        await prisma.notification.create({
            data: {
                targetId: updatedOrder.id,
                type: NotificationType.ORDERFULFILLED,
                userId: updatedOrder.senderUserId,
            },
        })
        return updatedOrder
    })
}
