import { Category } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { ClientCategory } from '../types'

export function isInCategories(input: string) {
    return Object.values(Category).includes(input.toUpperCase() as Category)
}

export const getCategories = (): ClientCategory[] => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = useTranslations('common.categories')
    return [
        {
            id: '1',
            label: Category.ACTOR,
            plural: t('actor'),
            slug: '/browse/actor',
            color: 'primary-dark',
        },
        {
            id: '2',
            label: Category.MUSICIAN,
            plural: t('musician'),
            slug: '/browse/musician',
            color: 'primary-dark',
        },
        {
            id: '3',
            label: Category.COMEDIAN,
            plural: t('comedian'),
            slug: '/browse/comedian',
            color: 'primary-dark',
        },
        {
            id: '4',
            label: Category.ATHLETE,
            plural: t('athlete'),
            slug: '/browse/athlete',
            color: 'primary-dark',
        },
        {
            id: '5',
            label: Category.SOCIAL_MEDIA,
            plural: t('influencer'),
            slug: '/browse/social-media',
            color: 'primary-dark',
        },
    ]
}
