'use client'

import Image from 'next/image'
import { FC } from 'react'
import { useRouter } from 'next/navigation'

interface LogoProps {
    size?: number
    onClick?: () => void
}

const Logo: FC<LogoProps> = ({ size, onClick }) => {
    const router = useRouter()

    const handleClick = () => {
        if (onClick) {
            onClick()
            return
        }
        router.push('/')
    }

    return (
        <div className="w-[40px] h-[40px] relative" onClick={handleClick}>
            <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Logo"
                priority
                className="cursor-pointer mr-4"
                fill
                src="/images/Logo.png"
            />
        </div>
    )
}

export default Logo
