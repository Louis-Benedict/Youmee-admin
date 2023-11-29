import prisma from '@/app/libs/prisma/prismadb'
import dayjs from 'dayjs'

type Args = {
    userId: string
    creatorId: string
    fromName: string
    forName: string
    forPerson?: string
    occasion: string
    message: string
}

export async function create({
    userId,
    creatorId,
    fromName,
    forName,
    forPerson,
    occasion,
    message,
}: Args) {
    let deadline = dayjs().add(7, 'day')

    try {
        const order = await prisma.order.create({
            data: {
                sender: { connect: { id: userId } },
                recipient: { connect: { id: creatorId } },
                fromName: fromName,
                forName: forName,
                forPerson: forPerson,
                expiryDate: deadline.toISOString(),
                isPaid: true,
                occasion: occasion,
                directions: message,
            },
        })
        return order
    } catch (error) {
        console.log(error)
    }
}
