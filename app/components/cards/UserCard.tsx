import { FC, ReactNode } from 'react'
import { config } from '@/app/config/config'
import { User } from '@prisma/client'
import { Mail, Verified, VerifiedIcon } from 'lucide-react'
import * as Avatar from '@radix-ui/react-avatar'
import { Tooltip } from '@radix-ui/themes'

interface UserCardProps {
    user: Pick<
        User,
        | 'id'
        | 'email'
        | 'name'
        | 'role'
        | 'image'
        | 'phoneNumber'
        | 'accountVerified'
    >
    actions: ReactNode[]
}

const UserCard: FC<UserCardProps> = ({ user, actions }) => {
    return (
        <div className="relative w-full flex flex-col border-[1px] border-neutral-300 rounded-md bg-white bg-opacity-70">
            <div className="relative ">
                <div className="flex align-center justify-center">
                    <Avatar.Root className="bg-blackA1 inline-flex h-[80px] mt-6 w-[80px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                        <Avatar.Image
                            className="h-full w-full rounded-[inherit] object-cover"
                            src={config.cdnBaseUrl + user.image}
                        />
                        <Avatar.Fallback
                            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                            delayMs={600}
                        ></Avatar.Fallback>
                    </Avatar.Root>
                    <div className="absolute h-full w-[80px]   right-0 " />
                </div>
                {user.role && (
                    <div className="absolute text-sm  left-[-1px]  top-[-1px] font-semibold overflow-hidden rounded-tl-md rounded-br-md">
                        <span className="p-2 text-white text-[10px] bg-[#a13072]">
                            {user.role}
                        </span>
                    </div>
                )}
                <div className="absolute text-sm  right-[15px]  -top-2  overflow-hidden ">
                    <span className="p-2 ">
                        {!user.accountVerified ? (
                            <Tooltip content="Pending">
                                <Mail className="text-neutral-600" size={20} />
                            </Tooltip>
                        ) : (
                            <Tooltip content="Verified">
                                <VerifiedIcon
                                    className="text-neutral-600"
                                    size={22}
                                />
                            </Tooltip>
                        )}
                    </span>
                </div>
                <div className="font-semibold text-center text-neutral-700 mt-2 mb-4">
                    {user.name}
                </div>
            </div>
            <hr className="mx-4" />

            <div className="relative flex flex-col justify-between gap-2 p-4 h-full">
                <div>
                    <div className="text-xs mb-1 text-neutral-700 font-bold ">
                        <Mail size={12} className="inline mr-1" />
                        Email
                    </div>
                    <div className="text-xs text-neutral-700">{user.email}</div>
                </div>
                <div className="pt-2 bg-opacity-70 hover:bg-opacity-100 rounded-md ">
                    {actions}
                </div>
                {/* <hr />
                <div>
                    <div className="text-xs mb-1 text-neutral-700 font-bold">
                        <Phone size={12} className="inline mr-1" />
                        Phone number
                    </div>
                    <div className="text-xs text-neutral-700">
                        {user.phoneNumber ?? 'unavailable'}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default UserCard
