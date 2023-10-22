import { UserRole } from '@prisma/client'
import { Session } from 'next-auth'

const AdminSession: Session = {
    user: {
        id: 'mockID',
        name: 'Mockuser',
        email: 'mockuser@mail.test',
        image: '',
        role: UserRole.ADMIN,
    },
    expires: '14d',
}
const RecruiterSession: Session = {
    user: {
        id: 'mockID',
        name: 'Mockuser',
        email: 'mockuser@mail.test',
        image: '',
        role: UserRole.RECRUITER,
    },
    expires: '14d',
}
const TeamSession: Session = {
    user: {
        id: 'mockID',
        name: 'Mockteamuser',
        email: 'mockteamuser@mail.test',
        image: '',
        role: UserRole.TEAM,
    },
    expires: '14d',
}

const MockSessions = {
    AdminSession: AdminSession,
    RecruiterSession: RecruiterSession,
    TeamSession: TeamSession,
}

export default MockSessions
