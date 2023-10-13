'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export interface LineButtonProps {
    label: string
    isLoading?: boolean
}

const LineButton = ({ label, isLoading }: LineButtonProps) => {
    return (
        <>
            <a
                href="https://page.line.me/823rzjvl"
                className="w-auto bg-transparent hover:opacity-90 relative disabled:opacity-50 disabled:cursor-not-allowed rounded-lg  transition font-semibold text-white"
            >
                <div className="flex flex-row items-center gap-2  bg-[#01c955] p-1 rounded-md pr-4">
                    <Image
                        width={30}
                        height={30}
                        src="/images/LINE_logo.png"
                        alt="line logo"
                    />
                    {isLoading ? (
                        <Loader2 size={24} className="inline animate-spin" />
                    ) : (
                        <div className="text-bold text-sm">{label}</div>
                    )}
                </div>
            </a>
        </>
    )
}

export default LineButton
