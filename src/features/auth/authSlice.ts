import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthenticatedUser } from '@/domain';

export type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

export interface AuthState {
	readonly status: AuthStatus;
	readonly currentUser: AuthenticatedUser | null;
}

const initialState: AuthState = {
	status: 'unknown',
	currentUser: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthenticatedUser(
			state,
			action: PayloadAction<AuthenticatedUser | null>
		) {
			if (action.payload) {
				state.status = 'authenticated';
				state.currentUser = action.payload;
				return;
			}

			state.status = 'unauthenticated';
			state.currentUser = null;
		},
		setAuthStatus(state, action: PayloadAction<AuthStatus>) {
			state.status = action.payload;
		},
	},
});

export const { setAuthenticatedUser, setAuthStatus } = authSlice.actions;

export const authReducer = authSlice.reducer;
