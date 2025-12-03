'use client';

import { useMeQuery } from '@/lib/api/services/authApi';

export function AuthBootstrap() {
	useMeQuery(undefined, { refetchOnMountOrArgChange: false });
	return null;
}
