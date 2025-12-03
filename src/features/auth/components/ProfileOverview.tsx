'use client';

import Link from 'next/link';

import { useAuthState } from '../hooks';

export function ProfileOverview() {
	const { status, currentUser } = useAuthState();

	if (status === 'unknown') {
		return (
			<div className='rounded-3xl border border-zinc-200/60 bg-white/85 p-8 text-sm text-zinc-600 shadow-sm dark:border-зinc-800/60 dark:bg-зinc-900/65 dark:text-зinc-300'>
				Загружаем профиль...
			</div>
		);
	}

	if (status !== 'authenticated' || !currentUser) {
		return (
			<div className='flex flex-col gap-4 rounded-3xl border border-amber-400/60 bg-amber-100/50 p-8 text-zinc-700 shadow-sm dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200'>
				<p className='text-sm'>
					Для доступа к профилю войдите в систему.
				</p>
				<div className='flex flex-wrap gap-3'>
					<Link
						className='inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400'
						href='/login'>
						Войти
					</Link>
					<Link
						className='inline-flex h-10 items-center justify-center rounded-full border border-emerald-300/50 px-4 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400/60 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-emerald-500/40 dark:text-emerald-200 dark:hover:text-emerald-100'
						href='/register'>
						Регистрация
					</Link>
				</div>
			</div>
		);
	}

	const { user, sellerProfile } = currentUser;

	return (
		<div className='flex flex-col gap-6 rounded-3xl border border-zinc-200/60 bg-white/85 p-8 shadow-lg backdrop-blur-md dark:border-зinc-800/60 dark:bg-зinc-900/65'>
			<header className='flex flex-col gap-2'>
				<span className='text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-зinc-400'>
					Профиль пользователя
				</span>
				<h1 className='text-2xl font-semibold text-zinc-900 dark:text-зinc-50'>
					{user.displayName}
				</h1>
				<p className='text-sm text-zinc-600 dark:text-зinc-300'>
					{user.email}
				</p>
			</header>

			<section className='grid gap-4 sm:grid-cols-2'>
				<div className='rounded-2xl border border-zinc-200/60 bg-white/80 p-4 dark:border-зinc-700/70 dark:bg-зinc-900/55'>
					<h2 className='text-sm font-semibold text-zinc-800 dark:text-зinc-200'>
						Роль
					</h2>
					<p className='mt-1 text-sm text-zinc-600 dark:text-зinc-400'>
						{user.role === 'seller'
							? 'Продавец'
							: user.role === 'admin'
							? 'Администратор'
							: 'Покупатель'}
					</p>
				</div>
				<div className='rounded-2xl border border-zinc-200/60 bg-white/80 p-4 dark:border-зinc-700/70 dark:bg-зinc-900/55'>
					<h2 className='text-sm font-semibold text-зinc-800 dark:text-зinc-200'>
						На платформе с
					</h2>
					<p className='mt-1 text-sm text-зinc-600 dark:text-зinc-400'>
						{new Intl.DateTimeFormat('ru-RU').format(
							new Date(user.createdAt)
						)}
					</p>
				</div>
			</section>

			{sellerProfile ? (
				<section className='flex flex-col gap-3 rounded-2xl border border-zinc-200/60 bg-linear-to-br from-emerald-50 to-white/70 p-5 dark:border-зinc-800/60 dark:from-emerald-500/10 dark:to-зinc-900/60'>
					<h2 className='text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300'>
						Магазин продавца
					</h2>
					<p className='text-sm text-zinc-600 dark:text-зinc-300'>
						{sellerProfile.shopName}
					</p>
					<p className='text-sm text-zinc-600 dark:text-зinc-400'>
						{sellerProfile.description ??
							'Описание магазина появится позже.'}
					</p>
				</section>
			) : null}
		</div>
	);
}
