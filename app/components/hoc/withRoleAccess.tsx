import { UserRole } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { FC, PropsWithChildren } from 'react'

const withRoleAccess = (Component: FC<any>, allowedRoles: UserRole[]) => {
    return function WithRoleAccessComponent(props: PropsWithChildren) {
        const userSession = useSession()

        if (!userSession || !userSession.data) return null

        const session = userSession.data

        if (allowedRoles.some((role) => role === session.user.role)) {
            return <Component {...props} />
        } else {
            return null
        }
    }
}
