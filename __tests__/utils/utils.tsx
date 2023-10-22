import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

// Add in any providers here if necessary:
const Providers = ({ children }: { children: React.ReactNode }) => {
    const client = new QueryClient()
    return (
        <Theme>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </Theme>
    )
}

const customRender = (ui: any, options: any = {}) => {
    return render(ui, { wrapper: Providers, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
