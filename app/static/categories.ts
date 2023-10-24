import { Category } from '@prisma/client'
import { ClientCategory } from '../types'

export function isInCategories(input: string) {
    return Object.values(Category).includes(input.toUpperCase() as Category)
}

export const getCategories = (): ClientCategory[] => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return [
        {
            id: '1',
            label: Category.ACTOR,
            plural: 'actor',
            slug: '/browse/actor',
            color: 'primary-dark',
        },
        {
            id: '2',
            label: Category.MUSICIAN,
            plural: 'musician',
            slug: '/browse/musician',
            color: 'primary-dark',
        },
        {
            id: '3',
            label: Category.COMEDIAN,
            plural: 'comedian',
            slug: '/browse/comedian',
            color: 'primary-dark',
        },
        {
            id: '4',
            label: Category.ATHLETE,
            plural: 'athlete',
            slug: '/browse/athlete',
            color: 'primary-dark',
        },
        {
            id: '5',
            label: Category.SOCIAL_MEDIA,
            plural: 'influencer',
            slug: '/browse/social-media',
            color: 'primary-dark',
        },
    ]
}
