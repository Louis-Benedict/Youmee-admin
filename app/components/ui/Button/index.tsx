'use client'

import BaseButton, { BaseButtonProps } from './BaseButton'
import { Globe, LogIn, LogOut, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const LoginButton = ({ onClick }: Omit<BaseButtonProps, 'label'>) => {
    const t = useTranslations('navbar')
    return (
        <BaseButton
            small
            outline
            label={t('login')}
            aria-label="Login"
            icon={LogIn}
            onClick={onClick}
        />
    )
}

export const LogoutButton = ({ onClick }: Omit<BaseButtonProps, 'label'>) => {
    return (
        <BaseButton
            small
            outline
            label="Logout"
            aria-label="Logout"
            onClick={onClick}
            icon={LogOut}
        />
    )
}

export const ThemeToggle = ({ showText }: { showText?: boolean }) => {
    const { theme, setTheme } = useTheme()

    const toggleTheme = useCallback(() => {
        theme == 'dark' ? setTheme('light') : setTheme('dark')
    }, [theme])

    return (
        <BaseButton
            small
            outline
            label={'Toggle theme'}
            aria-label="Theme toggle"
            icon={Sun}
            onClick={() => toggleTheme()}
        />
    )
}
