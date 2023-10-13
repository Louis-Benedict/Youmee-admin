import { Toaster } from '@/app/components/ui/toast'
import SidebarContainer from '@/app/components/menus/SidebarContainer'
import { NextThemeProvider } from '@/app/components/providers/NextThemeProvider'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/v1/auth/[...nextauth]/route'
import { Zap } from 'lucide-react'
import ErrorReportModal from '../components/modals/ErrorReportModal'

export const metadata = {
    title: 'Youmee - Admin Panel',
    description: 'Youmee - Admin Panel',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    if (!session) return null
    return (
        <NextThemeProvider>
            <SidebarContainer session={session} />
            <Toaster position="bottom-right" />
            <div className="ml-[240px] relative">
                <div className="xl:px-32 xl:py-20 px-20 py-12 mb-10">
                    {children}
                </div>
            </div>
        </NextThemeProvider>
    )
}
