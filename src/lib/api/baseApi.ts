/**
 * @fileoverview Job Shop — Initiative Development / Инициативная разработка
 * @author Artyom Pryanishnikov <Pryanishnikovartem@gmail.com>
 * @copyright 2025 Artyom Pryanishnikov
 * @license PolyForm-Shield-1.0.0
 * 
 * INITIATIVE DEVELOPMENT: Created independently, without TZ or direct order.
 * IP rights remain with the Author. Commercial use requires agreement.
 * Contact: Pryanishnikovartem@gmail.com
 */

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
