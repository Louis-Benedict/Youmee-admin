import { UserRole } from '@prisma/client'
import { NavLinksWithAuthProtection, NavbarLink } from '@/app/types'
import { Session } from 'next-auth'

const defaultRoutes: NavbarLink[] = [
    { slug: '/', name: 'Dashboard', iconPath: '/dashboard.svg' },
    { slug: '/enrollees', name: 'Enrollees', iconPath: '/paperplane.svg' },
    { slug: '/team', name: 'Team', iconPath: '/home.svg' },
]

const linksForRoles: NavLinksWithAuthProtection[] = [
    {
        role: UserRole.ADMIN,
        links: [
            ...defaultRoutes,
            { slug: '/users', name: 'Users', iconPath: '/person.svg' },
            {
                slug: '/creators',
                name: 'Creators',
                iconPath: '/star-filled.svg',
            },
            { slug: '/orders', name: 'Orders', iconPath: '/order.svg' },
        ],
    },
    {
        role: UserRole.TEAM,
        links: [
            ...defaultRoutes,
            { slug: '/users', name: 'Users', iconPath: '/person.svg' },
            {
                slug: '/creators',
                name: 'Creators',
                iconPath: '/star-filled.svg',
            },
            { slug: '/orders', name: 'Orders', iconPath: '/order.svg' },
        ],
    },
    {
        role: UserRole.RECRUITER,
        links: defaultRoutes,
    },
]

export const getNavigationLinks = (currentSession: Session | null) => {
    const currentUserRole = currentSession?.user.role
    const linksForCurrentUserRole = linksForRoles.find(
        (links) => links.role === currentUserRole
    )

    if (!linksForCurrentUserRole) {
        console.error(
            'useNavigationsLinks:: Could not find links for Role -- using default Routes'
        )
        return defaultRoutes
    }
    return linksForCurrentUserRole.links
}
