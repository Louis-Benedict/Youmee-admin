import { FC, useState } from 'react'
import { DatePicker } from 'react-date-picker'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface BirthdayInputProps {
    id: string
    register: UseFormRegister<any>
    errors: FieldErrors
}

const BirthdayInput: FC<BirthdayInputProps> = ({ id, register, errors }) => {
    const [value, setValue] = useState(new Date())

    const onChange = (date: Date) => {
        setValue(() => date)
    }

    return (
        <div className="relative w-full">
            <div className="absolute -top-5 left-1 text-sm text-neutral-700">
                Birthday
            </div>
            <input
                type="date"
                defaultValue="1.1.2000"
                className="p-2 border-[1px] rounded-md w-full"
                {...register(id)}
            />
            <div className="absolute bottom-2 right-3 text-xs text-red-500">
                {errors[id]?.message?.toString()}
            </div>
        </div>
    )
}

export default BirthdayInput
