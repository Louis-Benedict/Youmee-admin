import { z } from 'zod'
import { Category, Clip, Enrollee, User, UserRole } from '@prisma/client'

export type ClientUser = Omit<
    User,
    | 'createdAt'
    | 'updatedAt'
    | 'emailVerified'
    | 'knownFor'
    | 'hashedPassword'
    | 'bio'
    | 'rate'
    | 'sent'
    | 'reviewRecipient'
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}

export type ClientCreator = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}

import { NextMiddleware } from 'next/server'
import { ReactNode } from 'react'
import { EnrolleeEndpointFilter } from '../(dashboard)/enrollees/queries'
export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

type DataWithId = {
    id: string
}

export type TempCreator = DataWithId & {
    image: string | null
    name: string | null
    rating: number | null
    role?: string | null
    bio?: string | null
    category?: string | null
    rate: number | null
    knownFor: string | null
}

export type ClientCategory = {
    id: string
    label: Category
    slug: string
    plural: string
    color: string
}

export type SearchEntryCreator = {
    id: string
    name: string | null
    knownFor: string | null
    image: string | null
}

export type CreatorWithClip = TempCreator & {
    clip?: Clip[]
}

export type ReviewWithSenderAndOccasion = {
    id: string
    rating: number | null
    occasion: string | null
    senderName: string | null
    senderImage: string | null
    message: string | null
}

export type TempClip = Pick<Clip, 'clipUrl' | 'id' | 'isPublic'>

export type EndpointErrorResponse = {
    message: string
    statusCode: number
    timestamp: string
    path: string
    data: []
}

export type EndpointSuccessResponse<T> = {
    message: string
    data: T[]
}

export type EndpointResponse<T> = EndpointSuccessResponse<T>

export type EndpointFilter = {
    [key: string]: string | any
}

export type ApiRouteParameter = {
    params: {
        [key: string]: string
    }
}

export type Endpoint<
    T extends { id: string },
    E extends EndpointResponse<T>
> = {
    fetch: (filter?: EndpointFilter) => Promise<T[]>
    fetchOne: (id: string) => Promise<T>
    edit: (data: Partial<T> & { id: string }) => Promise<T>
    remove: (id: string) => Promise<T>
    add: (data: T) => Promise<T>
    [key: string]: (data: any) => Promise<any>
}

export type NavbarLink = {
    name: string
    slug: string
    iconPath?: string
    L2Items?: NavbarLink[]
}

export type NavLinksWithAuthProtection = {
    role: UserRole | null
    links: NavbarLink[]
}
