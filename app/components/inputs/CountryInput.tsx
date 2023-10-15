import { Select, Text } from '@radix-ui/themes'
import { Controller } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types'

interface DropdownInputProps {
    errors: FieldErrors
    isLoading: boolean
    defaultValue: string
    id: string
    label: string
    control: any
    data: { name: string }[]
}

const DropdownInput = ({
    label,
    defaultValue,
    errors,
    data,
    control,
    isLoading,
    id,
}: DropdownInputProps) => {
    return (
        <div className="w-full relative">
            <label htmlFor={id}>
                <Text as="div" size="2" mb="1" weight="medium">
                    {label}
                </Text>
            </label>
            <Controller
                control={control}
                name={id}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Select.Root
                        {...field}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                    >
                        <Select.Trigger className="w-full bg-white" />
                        <Select.Content>
                            {data.map((entry, index) => (
                                <Select.Item key={index} value={entry.name}>
                                    {entry.name}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                )}
            />
            <div className="absolute right-1 top-1 text-xs text-red-500">
                {errors[id]?.message?.toString()}
            </div>
        </div>
    )
}

export default DropdownInput
