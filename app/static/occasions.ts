import { useTranslations } from 'next-intl'
import {
    Cake,
    Flame,
    GraduationCap,
    MailCheck,
    MessageCircle,
    MessageSquare,
    UserCog,
} from 'lucide-react'
import Icons from '../libs/icons'

export const getOccasions = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = useTranslations('common')

    return [
        {
            label: t('birthday'),
            icon: Cake,
        },
        {
            label: t('graduation'),
            icon: GraduationCap,
        },
        {
            label: t('wedding'),
            icon: Icons.FaRing,
        },
        {
            label: t('custom'),
            icon: UserCog,
        },
        {
            label: t('advice'),
            icon: MessageSquare,
        },
        {
            label: t('roast'),
            icon: Flame,
        },
        {
            label: t('peptalk'),
            icon: MessageCircle,
        },
        {
            label: t('invite'),
            icon: MailCheck,
        },
    ]
}
