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
