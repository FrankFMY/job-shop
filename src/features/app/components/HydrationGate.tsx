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
