import Link from 'next/link'
import Image from 'next/image'
import { config } from '@/app/config/config'
import SidebarLinkContainer from './SidebarLinkContainer'
import { getNavigationLinks } from './config'
import { Session } from 'next-auth'
import { Avatar, Badge } from '@radix-ui/themes'

export default async function SidebarContainer({
    session,
}: {
    session: Session
}) {
    const linksForRole = await getNavigationLinks(session)

    return (
        <div className="fixed w-[240px] left-0 h-screen md:overflow-hidden overflow-none md:hover:overflow-auto pb-10 dark:bg-secondary-dark bg-[#a13072] z-[100] p-6">
            <div className="flex flex-col gap-8 h-full">
                <div className="flex  items-center">
                    <Link
                        href="/"
                        className="items-center justify-center gap-3 mt-1 flex text-xl font-extrabold tracking-tight text-white"
                    >
                        <Image
                            alt="logo"
                            width={140}
                            height={140}
                            src="/images/Youmee_Font_White.png"
                        />
                    </Link>
                </div>

                <div className="relative flex px-5 py-4 text-white flex-col gap-1  items-center dark:bg-neutral-800 rounded-md bg-white bg-opacity-20 border-neutral-300">
                    <Avatar
                        src={config.cdnBaseUrl + session.user.image}
                        fallback={''}
                    />

                    <div className="font-semibold text-sm">
                        {session.user.name}
                    </div>
                    <Badge
                        color="violet"
                        variant="solid"
                        size="1"
                        className="text-[10px]"
                    >
                        {session.user.role}
                    </Badge>
                </div>
                <SidebarLinkContainer navbarLinks={linksForRole} />
            </div>
        </div>
    )
}
