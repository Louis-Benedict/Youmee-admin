import { toast } from '@/app/components/ui/toast'
import { config } from '@/app/config/config'
import { EndpointErrorResponse, EndpointResponse } from '@/app/types'
import { ApiError } from 'next/dist/server/api-utils'

export declare class ApiResponseError extends ApiError {
    constructor(message: string, status: number)
}

const ApiClient = {
    http: async function <T>(
        path: string,
        requestConfig: RequestInit
    ): Promise<T> {
        const request = new Request(config.apiBaseUrl + path, requestConfig)

        const response = await fetch(request)

        if (!response.ok) {
            const errorResponse: EndpointErrorResponse = await response.json()

            toast({
                title: 'Error',
                message: errorResponse.message,
                type: 'error',
            })
            throw new ApiResponseError(
                errorResponse.message,
                errorResponse.statusCode
            )
        }

        return response.json()
    },

    get: async function <T>(path: string, config?: RequestInit): Promise<T> {
        const init = { method: 'GET', ...config }
        return await this.http<T>(path, init)
    },

    post: async function <T, U>(
        path: string,
        body?: T,
        config?: RequestInit
    ): Promise<U> {
        const init = { method: 'POST', body: JSON.stringify(body), ...config }
        return await this.http<U>(path, init)
    },

    put: async function <T, U>(
        path: string,
        body: T,
        config?: RequestInit
    ): Promise<U> {
        const init = { method: 'PUT', body: JSON.stringify(body), ...config }
        return await this.http<U>(path, init)
    },

    _delete: async function <T, U>(
        path: string,
        body?: T,
        config?: RequestInit
    ): Promise<U> {
        const init = { method: 'DELETE', body: JSON.stringify(body), ...config }
        return await this.http<U>(path, init)
    },
}

export default ApiClient
