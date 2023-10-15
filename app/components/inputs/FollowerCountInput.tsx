import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { FC } from 'react'
import { Controller, FieldErrors } from 'react-hook-form'

interface FollowerCountInputProps {
    id: string
    errors: FieldErrors
    control: any
}

const FollowerCountInput: FC<FollowerCountInputProps> = ({
    id,
    errors,
    control,
}) => {
    return (
        <>
            <Controller
                control={control}
                name={id}
                render={({ field }) => (
                    <ToggleGroup.Root
                        {...field}
                        type="single"
                        onValueChange={field.onChange}
                        className="w-full flex justify-between mt-3 text-xs font-[500]"
                    >
                        <ToggleGroup.Item
                            value="to10k"
                            className="py-1 px-2 border-2 border-transparent bg-pink-50 rounded-md data-[state=on]:bg-pink-200"
                        >
                            <div>0 - 10k</div>
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="to100k"
                            className="py-1 px-2 border-2 border-transparent bg-pink-50 rounded-md data-[state=on]:bg-pink-200"
                        >
                            <div>10k - 100k</div>
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="to1m"
                            className="py-1 px-2 border-2 border-transparent bg-pink-50 rounded-md data-[state=on]:bg-pink-200"
                        >
                            <div>100k - 1M</div>
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="1m+"
                            className="py-1 px-2 border-2 border-transparent bg-pink-50 rounded-md data-[state=on]:bg-pink-200"
                        >
                            <div>1M+</div>
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                )}
            />
            <div className="absolute right-1 top-1 text-xs text-red-500">
                {errors[id]?.message?.toString()}
            </div>
        </>
    )
}

export default FollowerCountInput
