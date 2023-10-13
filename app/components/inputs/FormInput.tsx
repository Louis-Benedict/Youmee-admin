import { TextField, Text } from '@radix-ui/themes'
import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface FormInputProps {
    id: string
    label: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    register: UseFormRegister<any>
    errors: FieldErrors
    asNumber?: boolean
}

const FormInput: FC<FormInputProps> = ({
    id,
    label,
    placeholder,
    register,
    errors,
    required,
    disabled,
    asNumber,
}) => {
    return (
        <div className="relative">
            <label>
                <Text as="div" size="2" mb="1" weight="medium">
                    {label}
                </Text>
                <TextField.Input
                    id={id}
                    type={asNumber ? 'number' : 'text'}
                    {...register(id, {
                        valueAsNumber: asNumber!!,
                    })}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                />
                <div className="absolute right-1 top-1 text-xs text-red-500">
                    {errors[id]?.message?.toString()}
                </div>
            </label>
        </div>
    )
}

export default FormInput
