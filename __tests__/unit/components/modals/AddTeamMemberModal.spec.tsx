import '@testing-library/jest-dom'
import {
    fireEvent,
    render,
    screen,
    cleanup,
    waitFor,
} from '../../../utils/utils'
import { SessionProvider } from 'next-auth/react'
import AddTeamMemberModal from '@/app/components/modals/AddTeamMemberModal/AddTeamMemberModal'
import MockSessions from '@/__tests__/utils/mocks'

beforeEach(() => jest.clearAllMocks())
afterEach(cleanup)

process.on('warning', (e) => console.warn(e.stack))
// Modals are by default closed. This mock sets it to an Open State.
jest.mock(
    '../../../../app/components/modals/AddTeamMemberModal/useTeamMemberModal',
    () => ({
        __esModule: true,
        default: () => ({
            isOpen: true,
            onClose: () => {},
        }),
    })
)

//Mocking react-query custom hooks to verify whether they have been called
const onAddTeamMemberMock = jest.fn().mockResolvedValue({ data: [{}] })

jest.mock('../../../../app/(dashboard)/team/queries', () => ({
    useAddTeamMember: () => ({
        mutate: onAddTeamMemberMock,
    }),
}))

describe('Add Team Member Form', () => {
    beforeEach(() => jest.clearAllMocks())
    afterEach(cleanup)

    it('should render', async () => {
        render(
            <SessionProvider session={MockSessions.AdminSession}>
                <AddTeamMemberModal />
            </SessionProvider>
        )

        expect(screen.getByTestId('name-input')).toBeInTheDocument()
        expect(screen.getByTestId('phone-input')).toBeInTheDocument()
        expect(screen.getByTestId('email-input')).toBeInTheDocument()
        expect(screen.getByTestId('line-input')).toBeInTheDocument()
        expect(screen.getByTestId('role-dropdown-trigger')).toBeInTheDocument()
        expect(screen.getByTestId('primary-button')).toBeInTheDocument()
        expect(screen.getByTestId('secondary-button')).toBeInTheDocument()
        expect(screen.getByTestId('commission-input')).toBeInTheDocument()
        expect(screen.getByText('RECRUITER')).toBeVisible()
    })

    it('should show all errors with empty fields', async () => {
        render(
            <SessionProvider
                refetchInterval={0}
                session={MockSessions.AdminSession}
            >
                <AddTeamMemberModal />
            </SessionProvider>
        )

        const submitButton = screen.getByRole('button', { name: 'Submit' })
        fireEvent.click(submitButton)

        const nameError = await screen.findByTestId('name-input-error')
        const phoneError = await screen.findByTestId('phone-input-error')
        const emailError = await screen.findByTestId('email-input-error')

        expect(nameError).toBeVisible()
        expect(phoneError).toBeVisible()
        expect(emailError).toBeVisible()
        expect(onAddTeamMemberMock).not.toHaveBeenCalled()
    })
    it('should have role RECRUITER preselected', async () => {
        render(
            <SessionProvider
                refetchInterval={0}
                session={MockSessions.RecruiterSession}
            >
                <AddTeamMemberModal />
            </SessionProvider>
        )

        expect(screen.getByText('RECRUITER')).toBeVisible()
    })
    // it('should display no commission field when role !== RECRUITER', () => {
    //     render(
    //         <SessionProvider session={MockSessions.RecruiterSession}>
    //             <AddTeamMemberModal />
    //         </SessionProvider>
    //     )

    // })
    it('should call submit with all required fields', async () => {
        render(
            <SessionProvider
                refetchInterval={0}
                session={MockSessions.RecruiterSession}
            >
                <AddTeamMemberModal />
            </SessionProvider>
        )

        const emailInput = screen.getByLabelText('Email') as HTMLInputElement
        fireEvent.input(emailInput, {
            target: { value: 'test@test.de' },
        })

        const phoneInput = screen.getByLabelText(
            'Phone number'
        ) as HTMLInputElement
        fireEvent.input(phoneInput, {
            target: { value: '0111111111' },
        })

        const nameInput = screen.getByLabelText('Name') as HTMLInputElement
        fireEvent.input(nameInput, {
            target: { value: 'test' },
        })

        const commissionInput = screen.getByLabelText(
            'Commission (%)'
        ) as HTMLInputElement
        fireEvent.input(commissionInput, {
            target: { value: 2 },
        })

        expect(nameInput.value).toBe('test')
        expect(phoneInput.value).toBe('0111111111')
        expect(emailInput.value).toBe('test@test.de')
        expect(commissionInput.value).toBe('2')

        const submitButton = screen.getByRole('button', { name: 'Submit' })
        fireEvent.click(submitButton)

        await waitFor(() => expect(onAddTeamMemberMock).toHaveBeenCalled())
    })
})
