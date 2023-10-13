import { QueryClient } from '@tanstack/query-core';
import { cache } from 'react';

const getQueryClient = cache(
	() =>
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 1000 * 60 * 2,
					cacheTime: 1000 * 60 * 5,
					refetchOnMount: false,
					refetchOnWindowFocus: false,
				},
			},
		})
);
export default getQueryClient;
