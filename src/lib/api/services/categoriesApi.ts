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

import type { Category } from '@/domain';
import { baseApi } from '../baseApi';

export const categoriesApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		listCategories: build.query<Category[], void>({
			query: () => ({ url: '/categories' }),
			providesTags: [{ type: 'Category', id: 'LIST' }],
			transformResponse: (response: { data: Category[] }) =>
				response.data,
		}),
	}),
	overrideExisting: false,
});

export const { useListCategoriesQuery } = categoriesApi;
