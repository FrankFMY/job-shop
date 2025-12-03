import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { baseApi } from '../api/baseApi';
import { appReducer } from '@/features/app/appSlice';
import { authReducer } from '@/features/auth';

export const makeStore = () =>
	configureStore({
		reducer: {
			app: appReducer,
			auth: authReducer,
			[baseApi.reducerPath]: baseApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(baseApi.middleware),
	});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;

export const initializeListeners = (store: AppStore) => {
	setupListeners(store.dispatch);
};
