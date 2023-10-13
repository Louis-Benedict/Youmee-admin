import { UserRole } from '@prisma/client'
import { FC, ReactNode } from 'react'

interface RoleAccessHandlerProps {
    allowedRoles: UserRole[]
    userRole: UserRole | undefined
    children: ReactNode
}

const RoleAccessHandler: FC<RoleAccessHandlerProps> = ({
    allowedRoles,
    userRole,
    children,
}) => {
    if (allowedRoles.some((role) => role === userRole)) {
        return <>{children}</>
    } else {
        return null
    }
}

export default RoleAccessHandler
