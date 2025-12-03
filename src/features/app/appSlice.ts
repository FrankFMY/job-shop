import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type HydrationStatus = 'idle' | 'bootstrapping' | 'ready';

export interface AppState {
	hydration: HydrationStatus;
}

const initialState: AppState = {
	hydration: 'idle',
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setHydrationStatus(state, action: PayloadAction<HydrationStatus>) {
			state.hydration = action.payload;
		},
	},
});

export const { setHydrationStatus } = appSlice.actions;
export const appReducer = appSlice.reducer;
