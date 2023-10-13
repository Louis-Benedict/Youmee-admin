'use client'

import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { NavbarLink } from '@/app/types'
import { cn } from '@/app/libs/util'
import { Button } from '@radix-ui/themes'

interface SidebarLinkContainerProps {
    navbarLinks: NavbarLink[]
}

const SidebarLinkContainer: FC<SidebarLinkContainerProps> = ({
    navbarLinks,
}) => {
    const pathname = usePathname()

    return (
        <div className=" flex flex-col justify-between h-full">
            <div className="flex flex-col justify-between text-white text-sm">
                {navbarLinks.map((item: NavbarLink) => (
                    <div
                        key={item.slug}
                        className={cn(
                            pathname === item.slug
                                ? 'text-white bg-white/10'
                                : 'text-white/80',
                            'flex pl-3 my-0.5 rounded-md hover:bg-white/10 transition'
                        )}
                    >
                        <img
                            src={item.iconPath}
                            className="inline text-white stroke-white filter invert"
                            width={18}
                            height={18}
                        />
                        <Link
                            href={item.slug}
                            className="px-3 py-2 rounded-md my-1 group flex items-center  text-sm w-full justify-start cursor-pointer"
                        >
                            <span className="capitalize">{item.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-between text-white text-sm">
                <div key={'x'} className="relative">
                    <div
                        className={cn(
                            pathname === 'settings'
                                ? 'text-white bg-white/10'
                                : 'text-white/80',
                            'flex pl-3 my-0.5 rounded-md hover:bg-white/10 transition'
                        )}
                    >
                        <Link
                            href="/settings"
                            className="px-3 py-2 rounded-md my-1 group flex items-center  text-sm w-full justify-start cursor-pointer"
                        >
                            <span className="capitalize">Settings</span>
                        </Link>
                    </div>
                    <div className="flex flex-col mt-4 gap-2 dark:bg-primary-dark w-full">
                        <Button onClick={() => signOut()}>Sign out</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarLinkContainer
