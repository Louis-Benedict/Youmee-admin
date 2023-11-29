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
    type?: string
    testid?: string
}

const FormInput: FC<FormInputProps> = ({
    id,
    label,
    placeholder,
    register,
    errors,
    required,
    disabled,
    type,
    testid,
}) => {
    return (
        <div className="relative">
            <label htmlFor={id}>
                <Text as="div" size="2" mb="1" weight="medium">
                    {label}
                </Text>
            </label>
            <TextField.Input
                id={id}
                type={type}
                {...register(id, {
                    valueAsNumber: type === 'number',
                })}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                data-testid={testid}
            />
            {errors[id] && (
                <div
                    className="absolute right-1 top-1 text-xs text-red-500"
                    data-testid={testid + '-error'}
                >
                    {errors[id]!.message?.toString()}
                </div>
            )}
        </div>
    )
}

export default FormInput
