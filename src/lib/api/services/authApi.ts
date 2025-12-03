import type { AuthenticatedUser, UserRole } from '@/domain';
import { setAuthenticatedUser, setAuthStatus } from '@/features/auth';

import { baseApi } from '../baseApi';

interface LoginRequest {
	readonly email: string;
	readonly password: string;
}

interface RegisterRequest {
	readonly email: string;
	readonly password: string;
	readonly displayName: string;
	readonly role?: UserRole;
}

interface LogoutResponse {
	readonly success: boolean;
}

interface UnauthenticatedPayload {
	readonly user: null;
}

type MeResponse = AuthenticatedUser | UnauthenticatedPayload;

const isAuthenticated = (payload: MeResponse): payload is AuthenticatedUser =>
	payload.user !== null;

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		me: build.query<AuthenticatedUser | null, void>({
			query: () => ({
				url: 'auth/me',
			}),
			providesTags: ['Session'],
			transformResponse: (response: MeResponse) =>
				isAuthenticated(response) ? response : null,
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				dispatch(setAuthStatus('unknown'));
				try {
					const { data } = await queryFulfilled;
					dispatch(setAuthenticatedUser(data));
				} catch {
					dispatch(setAuthenticatedUser(null));
				}
			},
		}),
		login: build.mutation<AuthenticatedUser, LoginRequest>({
			query: (body) => ({
				url: 'auth/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Session'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				dispatch(setAuthStatus('unknown'));
				try {
					const { data } = await queryFulfilled;
					dispatch(setAuthenticatedUser(data));
				} catch {
					dispatch(setAuthenticatedUser(null));
				}
			},
		}),
		register: build.mutation<AuthenticatedUser, RegisterRequest>({
			query: (body) => ({
				url: 'auth/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Session'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				dispatch(setAuthStatus('unknown'));
				try {
					const { data } = await queryFulfilled;
					dispatch(setAuthenticatedUser(data));
				} catch {
					dispatch(setAuthenticatedUser(null));
				}
			},
		}),
		logout: build.mutation<LogoutResponse, void>({
			query: () => ({
				url: 'auth/logout',
				method: 'POST',
			}),
			invalidatesTags: ['Session'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
				} finally {
					dispatch(setAuthenticatedUser(null));
				}
			},
		}),
	}),
});

export const {
	useMeQuery,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
} = authApi;
