import { cn } from '@/app/utils/util'
import { Rating, ThinStar } from '@smastrom/react-rating'
import { FC, useCallback, useEffect, useState } from 'react'
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form'

type StarReviewProps = Omit<
    React.ComponentPropsWithoutRef<typeof Rating>,
    'value' | 'style'
> & {
    readOnly: boolean
    value?: number
    small?: boolean
    medium?: boolean
    setValue?: UseFormSetValue<FieldValues>
    register?: UseFormRegister<FieldValues>
    required?: boolean
    errors?: FieldErrors
    id?: string
}

const ratingStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#ffbd17',
    maxWidth: 150,
}

const StarReview: FC<StarReviewProps> = ({
    errors,
    register,
    medium,
    small,
    value,
    readOnly,
    required,
    id,
    setValue,
    ...props
}) => {
    const [rating, setRating] = useState(5)

    id && register?.(id, { required: true })

    const handleChange = (selectedValue: number) => {
        setRating(selectedValue)
        id && setValue?.(id, selectedValue)
    }

    return (
        <div
            className={cn(
                small && 'max-w-[100px]',
                medium && 'w-[200px]',
                'flex text-xs'
            )}
        >
            <Rating
                {...props}
                id={id}
                readOnly={readOnly}
                value={rating}
                itemStyles={ratingStyles}
                onChange={handleChange}
            />
            <span className="ml-1 mt-[1px]">({rating})</span>
        </div>
    )
}

export default StarReview
