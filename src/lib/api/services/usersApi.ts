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

import type { SellerProfile, User } from '@/domain';
import { baseApi } from '../baseApi';
import { toQueryParams, type QueryArgs } from '../queryParams';
import type { PaginatedResponse } from '../types';

export interface ListUsersQueryArgs extends QueryArgs {
	readonly role?: User['role'];
	readonly search?: string;
	readonly page?: number;
	readonly pageSize?: number;
}

export interface UserDetailResponse {
	readonly data: User;
	readonly related: {
		readonly sellerProfile?: SellerProfile;
	};
}

export const usersApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		listUsers: build.query<
			PaginatedResponse<User>,
			ListUsersQueryArgs | undefined
		>({
			query: (args) => {
				const params = toQueryParams(args);
				return params !== undefined
					? { url: '/users', params }
					: { url: '/users' };
			},
			providesTags: (result) =>
				result?.data
					? [
							...result.data.map((user) => ({
								type: 'User' as const,
								id: user.id,
							})),
							{ type: 'User', id: 'PARTIAL-LIST' },
					  ]
					: [{ type: 'User' as const, id: 'PARTIAL-LIST' }],
		}),
		getUser: build.query<UserDetailResponse, string>({
			query: (id) => ({ url: `/users/${id}` }),
			providesTags: (_result, _error, id) => [{ type: 'User', id }],
		}),
	}),
	overrideExisting: false,
});

export const { useListUsersQuery, useGetUserQuery, useLazyListUsersQuery } =
	usersApi;
