'use client';

import { useAppSelector } from '@/lib/state/hooks';

export const useAuthState = () => useAppSelector((state) => state.auth);
