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

import type { Product, ProductSort, ProductSummary } from '@/domain';
import { baseApi } from '../baseApi';
import { toQueryParams, type QueryArgs } from '../queryParams';
import type { PaginatedResponse } from '../types';

export interface ListProductsQueryArgs extends QueryArgs {
	readonly search?: string;
	readonly categoryId?: string;
	readonly sellerId?: string;
	readonly status?: Product['status'];
	readonly sort?: ProductSort;
	readonly page?: number;
	readonly pageSize?: number;
}

export const productsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		listProducts: build.query<
			PaginatedResponse<ProductSummary>,
			ListProductsQueryArgs | undefined
		>({
			query: (args) => {
				const params = toQueryParams(args);
				return params !== undefined
					? { url: '/products', params }
					: { url: '/products' };
			},
			providesTags: (result) =>
				result?.data
					? [
							...result.data.map((product) => ({
								type: 'Product' as const,
								id: product.id,
							})),
							{ type: 'Product', id: 'PARTIAL-LIST' },
					  ]
					: [{ type: 'Product' as const, id: 'PARTIAL-LIST' }],
		}),
		getProduct: build.query<Product, string>({
			query: (id) => ({
				url: `/products/${id}`,
			}),
			providesTags: (_result, _error, id) => [{ type: 'Product', id }],
		}),
	}),
	overrideExisting: false,
});

export const {
	useListProductsQuery,
	useGetProductQuery,
	useLazyListProductsQuery,
} = productsApi;
