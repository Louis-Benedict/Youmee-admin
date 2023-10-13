import axios from 'axios';

export const paymentIntent = async (
	url: string,
	userId: string | undefined
) => {
	return axios.post(url, { id: userId });
};
