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

import Link from 'next/link';
import { useTransition } from 'react';

import { useLogoutMutation } from '@/lib/api/services/authApi';
import { useAuthState } from '../hooks';

export function AuthActions() {
	const { status, currentUser } = useAuthState();
	const [logout, { isLoading }] = useLogoutMutation();
	const [isPending, startTransition] = useTransition();

	const handleLogout = () => {
		startTransition(() => {
			void logout()
				.unwrap()
				.catch(() => undefined);
		});
	};

	if (status === 'authenticated' && currentUser) {
		return (
			<div className='flex items-center gap-3'>
				<div className='hidden flex-col text-right text-xs text-zinc-500 dark:text-zinc-400 sm:flex'>
					<span className='font-semibold text-zinc-700 dark:text-zinc-200'>
						{currentUser.user.displayName}
					</span>
					<span>{currentUser.user.email}</span>
				</div>
				<Link
					href='/profile'
					className='inline-flex h-10 items-center justify-center rounded-full border border-zinc-200/80 px-4 text-sm font-medium text-zinc-700 transition hover:border-emerald-400/60 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-zinc-700/80 dark:text-zinc-100 dark:hover:text-emerald-300'>
					Профиль
				</Link>
				<button
					type='button'
					onClick={handleLogout}
					disabled={isLoading || isPending}
					className='inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white'>
					Выйти
				</button>
			</div>
		);
	}

	if (status === 'unknown') {
		return null;
	}

	return (
		<div className='flex items-center gap-3'>
			<Link
				className='inline-flex h-10 items-center justify-center rounded-full border border-zinc-200/80 px-4 text-sm font-medium text-zinc-700 transition hover:border-emerald-400/60 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-zinc-700/80 dark:text-зinc-100 dark:hover:text-emerald-300'
				href='/login'>
				Войти
			</Link>
			<Link
				className='inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400'
				href='/register'>
				Регистрация
			</Link>
		</div>
	);
}
