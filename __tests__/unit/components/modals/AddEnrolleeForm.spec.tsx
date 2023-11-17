import '@testing-library/jest-dom'
import {
    fireEvent,
    render,
    screen,
    cleanup,
    waitFor,
} from '../../../utils/utils'
import AddEnrolleeModal from '@/app/components/modals/AddEnrolleeModal/AddEnrolleeModal'


// Modals are by default closed. This mock sets it to an Open State.
jest.mock(
    '../../../../app/components/modals/AddEnrolleeModal/useEnrolleeModal',
    () => ({
        __esModule: true,
        default: () => ({
            isOpen: true,
            onClose: () => {},
        }),
    })
)

//Mocking react-query custom hooks to verify whether they have been called
const onAddEnrolleeMock = jest.fn().mockResolvedValue({ data: [{}] })

jest.mock('../../../../app/(dashboard)/enrollees/queries', () => ({
    useAddEnrollee: () => ({
        mutate: onAddEnrolleeMock,
    }),
}))

describe('Add Enrollee Form', () => {
    beforeEach(() => jest.clearAllMocks())
    afterEach(cleanup)

    it('should render', async () => {
        render(<AddEnrolleeModal />)

        const nameInput = screen.getByTestId('name-input')
        const phoneInput = screen.getByTestId('phone-input')
        const emailInput = screen.getByTestId('email-input')
        const aliasInput = screen.getByTestId('alias-input')
        const countrySelect = screen.getByTestId('country-dropdown-trigger')
        const noteTextArea = screen.getByTestId('note-textarea')
        const instagramInput = screen.getByTestId('instagram-input')
        const youtubeInput = screen.getByTestId('youtube-input')
        const tiktokInput = screen.getByTestId('tiktok-input')
        const facebookInput = screen.getByTestId('facebook-input')
        const submitButton = screen.getByTestId('primary-button')
        const cancelButton = screen.getByTestId('secondary-button')

        expect(nameInput).toBeInTheDocument()
        expect(phoneInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(aliasInput).toBeInTheDocument()
        expect(countrySelect).toBeInTheDocument()
        expect(noteTextArea).toBeInTheDocument()
        expect(instagramInput).toBeInTheDocument()
        expect(youtubeInput).toBeInTheDocument()
        expect(tiktokInput).toBeInTheDocument()
        expect(facebookInput).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })

    it('should show all errors with empty fields', async () => {
        render(<AddEnrolleeModal />)

        const submitButton = screen.getByRole('button', { name: 'Submit' })
        fireEvent.click(submitButton)

        const nameError = await screen.findByTestId('name-input-error')
        const phoneError = await screen.findByTestId('phone-input-error')
        const emailError = await screen.findByTestId('email-input-error')
        const aliasError = await screen.findByTestId('alias-input-error')

        expect(nameError).toBeVisible()
        expect(phoneError).toBeVisible()
        expect(emailError).toBeVisible()
        expect(aliasError).toBeVisible()
    })

    it('should call submit with all required fields', async () => {
        render(<AddEnrolleeModal />)
        const nameInput = screen.getByLabelText('Name') as HTMLInputElement
        fireEvent.input(nameInput, {
            target: { value: 'test' },
        })

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

        const aliasInput = screen.getByLabelText('Alias') as HTMLInputElement
        fireEvent.input(aliasInput, {
            target: { value: 'test' },
        })

        expect(nameInput.value).toBe('test')
        expect(phoneInput.value).toBe('0111111111')
        expect(emailInput.value).toBe('test@test.de')
        expect(aliasInput.value).toBe('test')

        const submitButton = screen.getByRole('button', { name: 'Submit' })
        fireEvent.click(submitButton)

        const errors = screen.queryAllByTestId(/\/*-error/)
        expect(errors).toHaveLength(0)
        await waitFor(() => expect(onAddEnrolleeMock).toHaveBeenCalled())
    })

    it('should show additional errors when social media handle filled without follower selected', async () => {
        render(<AddEnrolleeModal />)
        const instagramInput = screen.getByLabelText(
            'Instagram Handle'
        ) as HTMLInputElement
        fireEvent.input(instagramInput, {
            target: { value: 'test' },
        })
        expect(instagramInput.value).toBe('test')

        const submitButton = screen.getByRole('button', { name: 'Submit' })
        fireEvent.click(submitButton)

        const instagramError = await screen.findByTestId(
            'instagram-input-error'
        )

        expect(instagramError).toBeVisible()
        await waitFor(() => expect(onAddEnrolleeMock).not.toHaveBeenCalled())
    })
})
