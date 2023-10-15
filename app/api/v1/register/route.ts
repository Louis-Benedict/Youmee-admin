import { NextRequest, NextResponse } from 'next/server'
import { userRegisterSchema } from '@/app/libs/validation/authValidation'
import { withExceptionFilter } from '@/app/libs/middlewares/withExceptionFilter'
import { registerUser } from '@/app/actions/register'
import { ApiError } from 'next/dist/server/api-utils'
import { HttpStatusCode } from 'axios'

async function register(req: NextRequest) {
    const body = await req.json()

    const result = userRegisterSchema.safeParse(body)
    if (!result.success) {
        throw new ApiError(HttpStatusCode.BadRequest, 'Invalid credentials')
    }
    const { password, email, name } = result.data
    const user = await registerUser(password, email, name)

    if (!user) {
        throw new ApiError(HttpStatusCode.InternalServerError, 'Error')
    }

    return await NextResponse.json(
        { message: 'Success', status: 200, data: [user] },
        { status: 200 }
    )
}

export const POST = withExceptionFilter(register)
