'use client'

import { config } from '@/app/config/config'
import { SessionProvider } from 'next-auth/react'

type Props = {
    children?: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    return (
        <SessionProvider basePath={`${config.apiBaseUrl}/auth`}>
            {children}
        </SessionProvider>
    )
}
