import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStripe } from '@stripe/react-stripe-js';

const PaymentStatus = () => {
	const router = useRouter();
	const stripe = useStripe();

	const [message, setMessage] = useState<any | null>(null);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		// Retrieve the "payment_intent_client_secret" query parameter appended to
		// your return_url by Stripe.js
		const clientSecret: any = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }: any) => {
				switch (paymentIntent.status) {
					case 'succeeded':
						setMessage(
							`Thank you! your purchase for $${
								paymentIntent.amount / 100
							} has been accepted successfully.`
						);
						break;

					case 'processing':
						setMessage(
							"Payment processing. We'll update you when payment is received."
						);
						break;

					case 'requires_payment_method':
						// Redirect your user back to your payment page to attempt collecting
						// payment again
						router.back();
						setMessage('Payment failed. Please try another payment method.');
						break;

					default:
						router.back();
						setMessage('Something went wrong.');
						break;
				}
			});
	}, [stripe]);

	return message;
};

export default PaymentStatus;
