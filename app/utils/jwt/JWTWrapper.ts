import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'

export function verifyJWT(token: string) {
    try {
        verify(token, process.env.NEXTAUTH_SECRET!)
        return { error: null }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return { error: 'Token has expired' }
        }
        if (error instanceof JsonWebTokenError) {
            return { error: 'token malformed' }
        }
        console.log(error)
        return { error: 'Invalid Token' }
    }
}
