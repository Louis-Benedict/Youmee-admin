// middleware.ts

import { ApiRouteParameter } from '@/app/types'
import { NextRequest, NextResponse } from 'next/server'

type Middleware = (
    req: NextRequest,
    params: ApiRouteParameter,
    // res: NextResponse,
    next: () => void
) => void

// Create a function to apply middleware to a handler
export const withMiddleware =
    (middlewares: Middleware[]) => (handler: Middleware) => {
        return async (req: NextRequest, params: ApiRouteParameter) => {
            // Define a function to call the next middleware in the chain
            let currentIndex = 0
            const next = () => {
                currentIndex++
                if (currentIndex < middlewares.length) {
                    return middlewares[currentIndex](req, params, next)
                } else {
                    return handler(req, params, next)
                }
            }

            // Start the middleware chain with the first middleware
            if (middlewares.length > 0) {
                return middlewares[0](req, params, next)
            } else {
                return handler(req, params, next)
            }
        }
    }
