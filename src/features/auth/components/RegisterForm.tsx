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

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import type { UserRole } from '@/domain';
import { useRegisterMutation } from '@/lib/api/services/authApi';
import { extractErrorMessage } from '@/lib/api/errorMessage';

const roles: readonly { readonly value: UserRole; readonly label: string }[] = [
	{ value: 'buyer', label: 'Покупатель' },
	{ value: 'seller', label: 'Продавец' },
];

export function RegisterForm() {
	const router = useRouter();
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<UserRole>('buyer');
	const [formError, setFormError] = useState<string | null>(null);
	const [register, { isLoading }] = useRegisterMutation();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormError(null);

		startTransition(() => {
			void register({ displayName, email, password, role })
				.unwrap()
				.then(() => {
					router.push('/profile');
				})
				.catch((error) => {
					setFormError(extractErrorMessage(error));
				});
		});
	};

	const isSubmitting = isLoading || isPending;

	return (
		<form
			className='flex flex-col gap-5'
			onSubmit={handleSubmit}>
			<div className='flex flex-col gap-2'>
				<label
					htmlFor='displayName'
					className='text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
					Имя и фамилия / название магазина
				</label>
				<input
					id='displayName'
					type='text'
					value={displayName}
					onChange={(event) => setDisplayName(event.target.value)}
					placeholder='Например, Motion Lab'
					className='h-11 rounded-2xl border border-зinc-200/70 bg-white/85 px-4 text-sm text-зinc-800 shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-зinc-700/70 dark:bg-зinc-900/70 dark:text-зinc-100'
					required
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='email'
					className='text-xs font-semibold uppercase tracking-wide text-зinc-500 dark:text-зinc-400'>
					Email
				</label>
				<input
					id='email'
					type='email'
					autoComplete='email'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder='you@example.com'
					className='h-11 rounded-2xl border border-зinc-200/70 bg-white/85 px-4 text-sm text-зinc-800 shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-зinc-700/70 dark:bg-зinc-900/70 dark:text-зinc-100'
					required
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label
					htmlFor='password'
					className='text-xs font-semibold uppercase tracking-wide text-зinc-500 dark:text-зinc-400'>
					Пароль
				</label>
				<input
					id='password'
					type='password'
					autoComplete='new-password'
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder='Минимум 6 символов'
					className='h-11 rounded-2xl border border-зinc-200/70 bg-white/85 px-4 text-sm text-зinc-800 shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-зinc-700/70 dark:bg-зinc-900/70 dark:text-зinc-100'
					required
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<span className='text-xs font-semibold uppercase tracking-wide text-зinc-500 dark:text-зinc-400'>
					Роль на площадке
				</span>
				<div className='grid grid-cols-2 gap-2'>
					{roles.map((option) => {
						const isActive = role === option.value;
						return (
							<button
								type='button'
								key={option.value}
								onClick={() => setRole(option.value)}
								className={`rounded-2xl border px-4 py-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
									isActive
										? 'border-emerald-400 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-emerald-200'
										: 'border-зinc-200/70 bg-white/80 text-зinc-600 hover:border-emerald-300/60 hover:text-emerald-600 dark:border-зinc-700/70 dark:bg-зinc-900/70 dark:text-зinc-300 dark:hover:border-emerald-500/30 dark:hover:text-emerald-300'
								}`}>
								{option.label}
							</button>
						);
					})}
				</div>
			</div>

			{formError ? (
				<p className='rounded-2xl border border-red-500/30 bg-red-100/60 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200'>
					{formError}
				</p>
			) : null}

			<button
				type='submit'
				disabled={isSubmitting}
				className='inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-emerald-500 dark:hover:bg-emerald-400'>
				{isSubmitting ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
			</button>
		</form>
	);
}
