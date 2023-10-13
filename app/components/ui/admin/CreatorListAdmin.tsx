'use client'

import { User } from '@prisma/client'
import Avatar from '../Avatar'
import { Loader, PlaySquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'

interface CreatorListAdminProps {
    creators: User[]
    title: string
}

const CreatorListAdmin = ({ creators, title }: CreatorListAdminProps) => {
    const router = useRouter()
    return (
        <div className="w-full max-w-md p-4 dark:bg-primary-dark bg-white bg-opacity-50 rounded-md">
            <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-medium dark:text-white text-primary-dark inline-block">
                    <PlaySquare className="inline mr-2 mb-1" />
                    {title}
                </div>
                <a
                    className="text-sm font-medium cursor-pointer"
                    onClick={() => router.push(`/admin/creators`)}
                >
                    View all
                </a>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-neutral-800">
                    <>
                        {creators.map((creator) => (
                            <li key={creator.id} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Avatar />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium dark:text-neutral-200 text-primary-dark">
                                            {creator.name}
                                        </p>
                                        <p className="text-sm truncate text-neutral-500">
                                            {creator.email}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:dark:text-white text-primary-dark">
                                        <Button
                                            onClick={() => {
                                                router.push(
                                                    `/admin/creator/${creator.id}`
                                                )
                                            }}
                                        >
                                            Profile
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </>
                </ul>
            </div>
        </div>
    )
}

export default CreatorListAdmin
