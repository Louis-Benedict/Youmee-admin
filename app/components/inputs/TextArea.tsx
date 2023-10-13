'use client'

import { FieldErrors, UseFormRegister } from 'react-hook-form'
import {
    ChangeEvent,
    FC,
    TextareaHTMLAttributes,
    useEffect,
    useState,
} from 'react'

interface TextAreaProps
    extends Omit<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        | 'className'
        | 'disabled'
        | 'maxLength'
        | 'placeholder'
        | 'defaultValue'
        | 'children'
    > {
    id: string
    label: string
    register: UseFormRegister<any>
    errors: FieldErrors
    required?: boolean
    disabled?: boolean
    maxLength?: number
    minLength?: number
    placeholder: string
    defaultValue?: string
}

const TextArea: FC<TextAreaProps> = ({
    label,
    defaultValue,
    disabled,
    required,
    errors,
    maxLength = 600,
    minLength = 20,
    register,
    id,
    ...props
}) => {
    const [characters, setCharacters] = useState<string>('')

    const inputHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCharacters(event.target.value)
    }

    useEffect(() => {
        if (defaultValue) setCharacters(defaultValue)
    }, [defaultValue])

    return (
        <>
            <div className="relative flex flex-col w-full h-full">
                <div className="absolute -top-5 left-2 text-sm text-neutral-500">
                    <label htmlFor={id}>{label}</label>
                </div>
                <textarea
                    {...register(id, {
                        required: required,
                        minLength: minLength,
                        onChange: (e) => inputHandler(e),
                    })}
                    maxLength={maxLength}
                    defaultValue={defaultValue}
                    id={id}
                    {...props}
                    className="px-3 pt-3 pb-5 text-sm overflow-hidden min-h-[160px] md:min-w-[340px] dark:bg-secondary-dark bg-white w-full h-full border-neutral-200 dark:placeholder:text-neutral-700 placeholder:text-neutral-400 text-neutral-700 border-[1px] rounded-md resize-none"
                />
                <div className="absolute bottom-2 right-3 text-[12px] dark:text-neutral-700 text-neutral-400">
                    {characters ? maxLength - characters.length : maxLength}{' '}
                    characters left.
                </div>
                {errors[id] && (
                    <span className="absolute bottom-2 left-3 text-[12px]  text-red-500">
                        Write atleast {minLength} characters.
                    </span>
                )}
            </div>
        </>
    )
}

TextArea.displayName = 'TextArea'

export default TextArea
