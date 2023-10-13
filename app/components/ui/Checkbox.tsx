'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
    id: string
    label: string
    disabled?: boolean
    required?: boolean
    onSelected: () => void
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    onSelected,
    disabled,
    required,
}) => {
    return (
        <div className="flex items-center w-full relative mt-4">
            <input
                onChange={onSelected}
                id={id}
                disabled={disabled}
                type="checkbox"
                className="bg-neutral-700 mr-3 self-start mt-0.5"
            />
            <label
                htmlFor={id}
                placeholder=" "
                className="
                text-xs
                dark:text-neutral-300
				text-neutral-800
				outline-none
				transition
				disabled:opacity-70
				disabled:cursor-not-allowed
				border-neutral-700"
            >
                {label}
            </label>
        </div>
    )
}

export default Input
