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

    return [
        {
            label: 'birthday',
            icon: Cake,
        },
        {
            label: 'graduation',
            icon: GraduationCap,
        },
        {
            label: 'wedding',
            icon: Icons.FaRing,
        },
        {
            label: 'custom',
            icon: UserCog,
        },
        {
            label: 'advice',
            icon: MessageSquare,
        },
        {
            label: 'roast',
            icon: Flame,
        },
        {
            label: 'peptalk',
            icon: MessageCircle,
        },
        {
            label: 'invite',
            icon: MailCheck,
        },
    ]
}
