'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Icon, Loader2 } from 'lucide-react'
import { cn } from '../../../libs/util'

export interface BaseButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: Icon
    isLoading?: boolean
    maxWidth?: boolean
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
    (
        {
            label,
            onClick,
            disabled,
            outline,
            small,
            isLoading,
            maxWidth,
            icon: Icon,
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                onClick={onClick}
                className={cn(
                    maxWidth && 'max-w-[180px]',
                    small ? 'text-sm p-2 border-[2px]' : 'p-3 border-2',
                    outline
                        ? 'bg-transparent dark:border-[#242424]'
                        : 'border-accent-dark bg-accent-dark',
                    'relative disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:opacity-70 transition w-full font-semibold text-white'
                )}
            >
                <div className="flex flex-row items-center gap-2 text-primary-dark justify-center">
                    {Icon && <Icon size={18} className="inline" />}
                    {isLoading ? (
                        <Loader2 size={24} className="inline animate-spin" />
                    ) : (
                        label
                    )}
                </div>
            </button>
        )
    }
)

BaseButton.displayName = 'BaseButton'

export default BaseButton
