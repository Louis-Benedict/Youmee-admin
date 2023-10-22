import LoginPage from '../../../app/(login)/login/page'
import '@testing-library/jest-dom'
import * as NextAuth from 'next-auth/react'
import {
    cleanup,
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react'

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: jest.fn(),
    }),
}))

const spy = jest
    .spyOn(NextAuth, 'signIn')
    .mockImplementation((provider, options, authParams) => {
        // if (options.email === 'error@test.com') {
        //     return new Promise((resolve, reject) => {
        //         resolve(() => ({
        //             error: 'Invalid credentials',
        //             status: 200,
        //             ok: 'ok',
        //             url: 'mockurl',
        //         }))
        //     })
        // } else {
        return new Promise((resolve, reject) => {
            resolve({
                error: undefined,
                status: 200,
                ok: 'ok',
                url: 'mockurl',
            })
        })
        // }
    })

describe('Login Page', () => {
    afterEach(cleanup)
    it('renders the Login Page', () => {
        render(<LoginPage />)

        const emailField = screen.getByTestId('email-input')
        const passwordField = screen.getByTestId('password-input')
        const loginButton = screen.getByTestId('login-button')

        expect(emailField).toBeInTheDocument()
        expect(passwordField).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()
    })

    it('shows an input error if credentials dont fulfill the requirements', async () => {
        render(<LoginPage />)

        const submitButton = screen.getByRole('button', { name: 'Login' })
        fireEvent.click(submitButton)

        const emailError = await screen.findByTestId('email-input-error')
        const passwordError = await screen.findByTestId('password-input-error')

        expect(emailError).toBeInTheDocument()
        expect(passwordError).toBeInTheDocument()

        await waitFor(() => expect(spy).not.toHaveBeenCalled())
    })
    it('invoke login with valid fields', async () => {
        render(<LoginPage />)

        const emailInput = screen.getByLabelText('Email')
        fireEvent.input(emailInput, {
            target: { value: 'test@test.de' },
        })

        const passwordInput = screen.getByLabelText('Password')
        fireEvent.input(passwordInput, {
            target: { value: 'testtest' },
        })

        const submitButton = screen.getByRole('button', { name: 'Login' })
        fireEvent.click(submitButton)

        await waitFor(() => expect(spy).toHaveBeenCalled())
    })
    // it('shows auth error if credentials are wrong', async () => {
    //     render(<LoginPage />)

    //     const emailInput = screen.getByLabelText('Email')
    //     fireEvent.input(emailInput, {
    //         target: { value: 'error@test.com' },
    //     })

    //     const passwordInput = screen.getByLabelText('Password')
    //     fireEvent.input(passwordInput, {
    //         target: { value: 'testtest' },
    //     })

    //     const submitButton = screen.getByRole('button', { name: 'Login' })
    //     fireEvent.click(submitButton)

    //     await waitFor(() => expect(spy).toHaveBeenCalled())

    //     expect(screen.getByText('Invalid credentials')).toBeVisible()
    // })
})
