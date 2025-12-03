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
