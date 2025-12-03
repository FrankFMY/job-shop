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

import type { SellerOption } from '@/mocks/users/repository';
import { baseApi } from '../baseApi';

export const sellersApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		listSellers: build.query<SellerOption[], void>({
			query: () => ({ url: '/sellers' }),
			providesTags: [{ type: 'Seller', id: 'LIST' }],
			transformResponse: (response: { data: SellerOption[] }) =>
				response.data,
		}),
	}),
	overrideExisting: false,
});

export const { useListSellersQuery } = sellersApi;
