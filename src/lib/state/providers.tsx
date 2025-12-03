'use client';

import { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';

import { initializeListeners, makeStore } from './store';

interface StoreProviderProps {
	readonly children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
	const store = useMemo(() => makeStore(), []);

	useEffect(() => {
		initializeListeners(store);
	}, [store]);

	return <Provider store={store}>{children}</Provider>;
}
