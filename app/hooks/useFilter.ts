import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { EndpointFilter } from '../types'

type filterProps<T> = [EndpointFilter, (filter: EndpointFilter) => void]

/**
 * React Hook that converts a URL Search Parameter to
 * an object that can be used to send filter requests to
 * the backend
 */
export const useFilter = <T>(): filterProps<T> => {
    const searchParams = useSearchParams()
    const filter = useMemo(() => {
        const params = searchParams.toString()

        // Parse the query parameters into an object
        const parsedParams: EndpointFilter = {} // Assuming EndpointFilter is an interface or type you've defined
        const paramsArray = params.split('&')

        paramsArray.forEach((param) => {
            const [key, value] = param.split('=')
            if (key && value) {
                parsedParams[key] = decodeURIComponent(value)
            }
        })

        return parsedParams
    }, [searchParams])

    const setFilter = <T>(newFilter: EndpointFilter) => {
        // Convert the filter object back into query parameters
        const queryString = Object.entries(newFilter)
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join('&')

        // Update the browser's URL with the new query parameters
        window.history.replaceState(null, '', `?${queryString}`)

        // Optionally, update state or perform any other necessary actions with the new filter object
    }

    return [filter, setFilter]
}
