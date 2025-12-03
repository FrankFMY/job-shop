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
