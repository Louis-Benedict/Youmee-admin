import { config } from '@/app/config/config'
import {
    Appearance,
    ConfirmPaymentData,
    PaymentIntent,
} from '@stripe/stripe-js'
import { StripePaymentElementOptions } from '@stripe/stripe-js/types/stripe-js/elements/payment'

export const STRIPE_RETURN_URL = `${config.baseUrl}/order-success`

export const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
    fields: {
        billingDetails: {
            email: 'never',
        },
    },
}

export const appearance: Appearance = {
    theme: 'night',
    variables: {
        colorPrimary: '#ffffff',
        colorBackground: '#0C0C0C',
        colorText: '#ffffff',
        colorDanger: '#df1b41',
        spacingUnit: '5px',
        borderRadius: '5px',
    },
}

export const confirmPaymentParams = (
    email: string
): Partial<ConfirmPaymentData> => {
    return {
        payment_method_data: {
            billing_details: {
                email: email,
            },
        },
    }
}

export const parsePaymentIntent = (intent: PaymentIntent | undefined) => {
    let message = ''
    switch (intent?.status) {
        case 'succeeded':
            message = 'Payment succeeded!'
            break
        case 'processing':
            message = 'Your payment is processing.'
            break
        case 'requires_payment_method':
            message = 'Your payment was not successful, please try again.'
            break
        default:
            message = 'Something went wrong.'
            break
    }

    return message
}
