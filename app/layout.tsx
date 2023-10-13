import '@/app/styles/globals.css'
import React from 'react'
import { AuthProvider } from './components/providers/AuthProvider'
import { default_font_eng } from './utils/fonts'
import Providers from './components/providers/Provider'
import { Theme } from '@radix-ui/themes'

export const metadata = {
    title: 'Youmee - Admin Panel',
    description: 'Youmee - Admin Panel',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className={`${default_font_eng.className} bg-pink-100 bg-opacity-20 h-full w-full`}
            >
                <Providers>
                    <Theme
                        accentColor="pink"
                        radius="medium"
                        className="h-full"
                    >
                        <AuthProvider>{children}</AuthProvider>
                    </Theme>
                </Providers>
            </body>
        </html>
    )
}
