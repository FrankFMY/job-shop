import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
	typeof window === 'undefined'
		? process.env.INTERNAL_API_BASE_URL ??
		  process.env.NEXT_PUBLIC_API_BASE_URL ??
		  '/api'
		: process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api';

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({
		baseUrl,
		credentials: 'include',
	}),
	tagTypes: ['Product', 'User', 'Order', 'Category', 'Seller', 'Session'],
	endpoints: () => ({}),
});
