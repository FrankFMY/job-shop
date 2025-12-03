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

import type { Order } from '@/domain';
import { baseApi } from '../baseApi';
import { toQueryParams, type QueryArgs } from '../queryParams';
import type { PaginatedResponse } from '../types';

export interface ListOrdersQueryArgs extends QueryArgs {
	readonly buyerId?: string;
	readonly sellerId?: string;
	readonly status?: Order['status'];
	readonly page?: number;
	readonly pageSize?: number;
}

export const ordersApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		listOrders: build.query<
			PaginatedResponse<Order>,
			ListOrdersQueryArgs | undefined
		>({
			query: (args) => {
				const params = toQueryParams(args);
				return params !== undefined
					? { url: '/orders', params }
					: { url: '/orders' };
			},
			providesTags: (result) =>
				result?.data
					? [
							...result.data.map((order) => ({
								type: 'Order' as const,
								id: order.id,
							})),
							{ type: 'Order', id: 'PARTIAL-LIST' },
					  ]
					: [{ type: 'Order' as const, id: 'PARTIAL-LIST' }],
		}),
		getOrder: build.query<Order, string>({
			query: (id) => ({ url: `/orders/${id}` }),
			providesTags: (_result, _error, id) => [{ type: 'Order', id }],
		}),
	}),
	overrideExisting: false,
});

export const { useListOrdersQuery, useGetOrderQuery, useLazyListOrdersQuery } =
	ordersApi;
