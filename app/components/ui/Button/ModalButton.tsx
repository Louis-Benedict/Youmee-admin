'use client'

import { FC } from 'react'
import { Icon, Loader2 } from 'lucide-react'
import { cn } from '../../../libs/util'
import { VariantProps, cva } from 'class-variance-authority'

export interface ModalButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    icon?: Icon
    isLoading?: boolean
}

const buttonVariants = cva(
    'relative disabled:opacity-50 w-fit disabled:cursor-not-allowed rounded-md hover:opacity-70 transition self-end text-sm bg-accent-dark font-semibold text-white flex items-center gap-2 justify-center',
    {
        variants: {
            variant: {
                default: 'bg-accent-dark text-white',
                destructive:
                    'text-white hover:bg-red-600 dark:hover:bg-red-600',
                secondary:
                    'bg-opacity-0 border-[1px] border-neutral-400 text-primary-dark',
            },
            size: {
                default: 'px-5 py-2',
                sm: 'h-9 px-2 rounded-md',
                lg: 'h-12 px-8 rounded-md',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

const ModalButton: FC<ModalButtonProps> = ({
    label,
    onClick,
    className,
    size,
    variant,
    disabled,
    isLoading,
    icon: Icon,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cn(buttonVariants({ variant, size, className }))}
        >
            {Icon && <Icon size={18} className="inline" />}
            {isLoading ? (
                <Loader2 size={24} className="inline animate-spin" />
            ) : (
                label
            )}
        </button>
    )
}

ModalButton.displayName = 'ModalButton'

export default ModalButton
