'use client'

import ReviewCard from '../cards/ReviewCard'
import CategoryCard from '../cards/CategoryCard'
import BaseCardListing from './BaseCardListing'
import { useTranslations } from 'next-intl'
import { ReviewWithSenderAndOccasion } from '@/app/types'
import { getCategories } from '@/app/static/categories'

export const ReviewCardListing = ({
    items,
}: {
    items: ReviewWithSenderAndOccasion[]
}) => {
    const t = useTranslations('common')
    return (
        <BaseCardListing
            title={t('reviews')}
            items={items}
            width="w-[300px]"
            CardComponent={ReviewCard}
            layout="row"
            overflow
        />
    )
}

export const CategoryCardListing = () => {
    const t = useTranslations('common.categories')

    return (
        <BaseCardListing
            title={t('title')}
            items={getCategories()}
            CardComponent={CategoryCard}
            layout="row"
            overflow
        />
    )
}
