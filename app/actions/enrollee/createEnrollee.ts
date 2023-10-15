import prisma from '@/app/libs/prismadb'
import { Enrollee } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export async function createEnrollee({
    fullname,
    phoneNumber,
    birthday,
    lineId,
    country,
    alias,
    email,
    additionalInformation,
    note,
    recruiterUserId,
    instagramHandle,
    instagramFollowers,
    facebookHandle,
    facebookFollowers,
    tiktokHandle,
    tiktokFollowers,
    youtubeHandle,
    youtubeFollowers,
}: Omit<
    Enrollee,
    | 'id'
    | 'createdAt'
    | 'profileLink'
    | 'status'
    | 'isContacted'
    | 'referralCode'
    | 'socialMediaHandle'
>) {
    const existingUser = await prisma.user.findFirst({
        where: {
            email,
        },
    })

    if (existingUser) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'User with that email already exists'
        )
    }

    const newEnrollee = await prisma.enrollee.create({
        data: {
            fullname,
            phoneNumber,
            birthday,
            lineId,
            country,
            alias,
            email,
            additionalInformation,
            note,
            recruiterUserId,
            instagramHandle,
            instagramFollowers,
            facebookHandle,
            facebookFollowers,
            tiktokHandle,
            tiktokFollowers,
            youtubeHandle,
            youtubeFollowers,
        },
        include: { recruiter: true },
    })

    if (!newEnrollee) {
        throw new ApiError(
            HttpStatusCode.InternalServerError,
            'Enrollee could not be created'
        )
    }

    return newEnrollee
}
