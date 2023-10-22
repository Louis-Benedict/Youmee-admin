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
                render={({ field: { ref, ...field } }) => (
                    <Select.Root
                        {...field}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                        data-testid={id + '-dropdown-root'}
                    >
                        <Select.Trigger
                            className="w-full bg-white"
                            data-testid={id + '-dropdown-trigger'}
                        />
                        <Select.Content
                            data-testid={id + '-dropdown-items'}
                            variant="soft"
                            position="popper"
                        >
                            {data.map((entry, index) => (
                                <Select.Item key={index} value={entry.name}>
                                    {entry.name}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                )}
            />
            {errors[id] && (
                <div
                    className="absolute right-1 top-1 text-xs text-red-500"
                    data-testid={id + '-error'}
                >
                    {errors[id]!.message?.toString()}
                </div>
            )}
        </div>
    )
}

export default DropdownInput
