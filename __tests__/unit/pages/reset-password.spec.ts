import '@testing-library/jest-dom'
import { cleanup, render, screen } from '@testing-library/react'
import jwt from 'jsonwebtoken'
import ResetPasswordPage from '@/app/(login)/reset-password/[[...slug]]/page'

afterEach(cleanup)

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null,
        }
    },
}))

describe('Reset Password Page', () => {
    it('renders error with invalid token param', async () => {
        const props = {
            params: { slug: ['testtoken'] },
            searchParams: {},
        }

        const Page = await ResetPasswordPage(props)
        render(Page)

        const passwordField = screen.queryByTestId('password-input')

        expect(passwordField).not.toBeInTheDocument()
    })

    it('renders not-authorized without token param', async () => {
        const props = {
            params: { slug: ['testtoken'] },
            searchParams: {},
        }

        const Page = await ResetPasswordPage(props)
        render(Page)

        const passwordField = screen.queryByTestId('password-input')

        expect(passwordField).not.toBeInTheDocument()
    })

    it('renders form with valid token param', async () => {
        const token = jwt.sign('no data', process.env.NEXTAUTH_SECRET!)
        const props = {
            params: { slug: [token] },
            searchParams: {},
        }

        const Page = await ResetPasswordPage(props)
        render(Page)

        const passwordField = screen.queryByTestId('password-input')
        const reenterPasswordField = screen.queryByTestId('repassword-input')
        const submitButton = screen.queryByTestId('submit-button')

        expect(passwordField).toBeInTheDocument()
        expect(reenterPasswordField).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
    })
})
