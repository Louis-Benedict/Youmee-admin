import { NextRequest } from 'next/server'

export function getRequestIpAdress(request: NextRequest) {
    if (request.headers.get('x-forwarded-for')) {
        return request.headers.get('x-forwarded-for')?.split(',')[0]
    }

    if (request.headers.get('x-real-ip')) {
        return request.headers.get('x-real-ip')
    }

    if (request.headers.get('x-cluster-client-ip')) {
        return request.headers.get('x-cluster-client-ip')
    }

    if (request.headers.get('x-forwarded')) {
        return request.headers.get('x-forwarded')
    }

    if (request.headers.get('forwarded-for')) {
        return request.headers.get('forwarded-for')
    }

    console.warn('IP could not be determined.')
}
