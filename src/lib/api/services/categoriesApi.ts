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
