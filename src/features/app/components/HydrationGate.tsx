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

import { useEffect } from 'react';

import { useAppDispatch } from '@/lib/state/hooks';
import { setHydrationStatus } from '../appSlice';

interface HydrationGateProps {
	readonly children: React.ReactNode;
}

export function HydrationGate({ children }: HydrationGateProps) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setHydrationStatus('ready'));
	}, [dispatch]);

	return <>{children}</>;
}
