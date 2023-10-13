'use client'

import ReviewCard from '../cards/ReviewCard'
import CategoryCard from '../cards/CategoryCard'
import BaseCardListing from './BaseCardListing'
import { ReviewWithSenderAndOccasion } from '@/app/types'
import { getCategories } from '@/app/static/categories'

export const ReviewCardListing = ({
    items,
}: {
    items: ReviewWithSenderAndOccasion[]
}) => {
    return (
        <BaseCardListing
            title={'reviews'}
            items={items}
            width="w-[300px]"
            CardComponent={ReviewCard}
            layout="row"
            overflow
        />
    )
}

export const CategoryCardListing = () => {
    return (
        <BaseCardListing
            title={'title'}
            items={getCategories()}
            CardComponent={CategoryCard}
            layout="row"
            overflow
        />
    )
}
