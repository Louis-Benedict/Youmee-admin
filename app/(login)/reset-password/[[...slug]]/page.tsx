import ResetPasswordForm from '@/app/components/forms/ResetPasswordForm'
import NotAuthenticated from '@/app/not-authenticated'
import { verifyJWT } from '@/app/utils/jwt/JWTWrapper'

interface IParams {
    slug: string[]
}

const ResetPasswordPage = async ({ params }: { params: IParams }) => {
    const tokenSlug = params?.slug?.[0]
    var tokenError = null

    if (tokenSlug) {
        const { error } = verifyJWT(tokenSlug)
        tokenError = error
    } else {
        return NotAuthenticated()
    }

    return !tokenError ? (
        <ResetPasswordForm token={tokenSlug} />
    ) : (
        <div>{tokenError}</div>
    )
}

export default ResetPasswordPage
