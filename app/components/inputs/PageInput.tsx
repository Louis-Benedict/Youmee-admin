'use client'

import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ComponentType, FC, InputHTMLAttributes } from 'react'
import { DollarSign, Lock } from 'lucide-react'

interface UpdateInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'className' | 'disabled' | 'maxLength'
    > {
    id: string
    label: string
    register: UseFormRegister<any>
    errors: FieldErrors
    required?: boolean
    disabled?: boolean
    maxLength?: number
    formatPrice?: boolean
    inputAction?: VoidFunction
    InputActionIcon?: ComponentType
}

const UpdateInput: FC<UpdateInputProps> = ({
    id,
    label,
    formatPrice,
    disabled,
    required,
    errors,
    maxLength,
    register,
    inputAction,
    InputActionIcon,
    ...props
}) => {
    return (
        <>
            <div className="relative flex flex-col">
                {formatPrice && (
                    <DollarSign
                        size={18}
                        className="absolute right-4 top-4 text-neutral-700 focus:dark:text-white"
                    />
                )}
                <div className="absolute -top-5 left-1 text-sm  text-neutral-500">
                    <label htmlFor={id}>{label}</label>
                </div>
                <div className="absolute bottom-2 right-3 text-xs text-red-500">
                    {errors[id]?.message?.toString()}
                </div>
                {disabled && (
                    <div className="absolute right-4 top-4 text-neutral-300">
                        <Lock size={16} className="" />
                    </div>
                )}
                {inputAction && InputActionIcon && !disabled && (
                    <div
                        className="absolute right-4 top-4 text-neutral-300"
                        onClick={inputAction}
                    >
                        <InputActionIcon />
                    </div>
                )}
                <input
                    {...register(id, {
                        required,
                    })}
                    maxLength={maxLength}
                    id={id}
                    required={required}
                    {...props}
                    disabled={disabled}
                    autoComplete="off"
                    className="text-sm p-3 bg-white dark:bg-secondary-dark disabled:border-neutral-900 dark:focus:border-white border-[1px] border-neutral-200 dark:border-neutral-700 placeholder:text-neutral-700 text-neutral-400 rounded-md"
                />
            </div>
        </>
    )
}

UpdateInput.displayName = 'UpdateInput'

export default UpdateInput
