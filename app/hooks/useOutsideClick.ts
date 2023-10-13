import { MutableRefObject, useEffect } from 'react'

/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 */
function useClickOutside(
    ref: MutableRefObject<Node | null>[],
    onClickOutside: () => void
) {
    useEffect(() => {
        /**
         * Invoke Function onClick outside of element
         */
        function handleClickOutside(event: any) {
            const contains = ref.some((re) => {
                return re.current && !re.current.contains(event.target)
            })
            if (contains) onClickOutside()
        }
        // Bind
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // dispose
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, onClickOutside])
}

export default useClickOutside
