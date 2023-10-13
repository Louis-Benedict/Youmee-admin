// exceptionMiddleware.js
import { authOptions } from '@/app/api/v1/auth/[...nextauth]/route'
import {
    EndpointResponse,
    ApiRouteParameter,
    EndpointErrorResponse,
} from '@/app/types'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { ApiError } from 'next/dist/server/api-utils'
import { NextRequest, NextResponse } from 'next/server'

type ApiHandler = (
    req: NextRequest,
    params: ApiRouteParameter
) => Promise<NextResponse<EndpointResponse<any> | EndpointErrorResponse>>

export function withExceptionFilter(handler: ApiHandler) {
    return async (req: NextRequest, params: ApiRouteParameter) => {
        try {
            return await handler(req, params)
        } catch (exception) {
            const { url, headers } = req
            const statusCode = getExceptionStatus(exception)
            const message = getExceptionMessage(exception)
            const stack = getExceptionStack(exception)

            const session = await getServerSession(authOptions)
            const userId = session?.user.id

            const referer = headers.get('referer')
            const userAgent = headers.get('user-agent')
            const method = req.method

            const timestamp = new Date().toISOString()
            const requestContext = {
                url,
                timestamp,
                method,
                referer,
                userId,
                userAgent,
                message,
            }

            console.error(requestContext)

            if (stack) {
                console.debug(stack)
            }

            const responseBody: EndpointErrorResponse = {
                statusCode,
                timestamp,
                message:
                    exception instanceof ApiError ? message : 'Unknown error',
                path: req.url,
                data: [],
            }

            return NextResponse.json(responseBody, { status: statusCode })
        }
    }
}

function getExceptionStatus(exception: unknown) {
    return exception instanceof ApiError
        ? exception.statusCode
        : HttpStatusCode.InternalServerError
}
function getExceptionMessage(exception: unknown) {
    return isError(exception) ? exception.message : `Internal Server Error`
}

function getExceptionStack(exception: unknown) {
    return isError(exception) ? exception.stack : undefined
}

function isError(exception: unknown): exception is Error {
    return exception instanceof Error
}
