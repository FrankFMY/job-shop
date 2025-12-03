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

import type { ReactNode } from 'react';

interface AuthPageShellProps {
	readonly title: string;
	readonly description: string;
	readonly children: ReactNode;
	readonly footer?: ReactNode;
}

export function AuthPageShell({
	title,
	description,
	children,
	footer,
}: AuthPageShellProps) {
	return (
		<div className='min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-100/60 px-4 py-12 dark:from-black dark:via-zinc-950 dark:to-zinc-900/80 sm:px-6 lg:px-8'>
			<div className='mx-auto flex w-full max-w-4xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16'>
				<section className='flex flex-1 flex-col gap-6 rounded-3xl border border-zinc-200/60 bg-white/85 p-8 shadow-lg backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/65'>
					<span className='inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'>
						Job Shop
					</span>
					<h1 className='text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl'>
						{title}
					</h1>
					<p className='max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300/90'>
						{description}
					</p>
					<div className='grid gap-3 text-sm text-zinc-500 dark:text-zinc-400 sm:grid-cols-2'>
						<div className='rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-zinc-700/70 dark:bg-zinc-900/55'>
							<h2 className='text-sm font-semibold text-zinc-800 dark:text-zinc-200'>
								Выбирайте роль
							</h2>
							<p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
								Покупайте товары или управляйте своим магазином
								— всё в одной панели.
							</p>
						</div>
						<div className='rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-зinc-700/70 dark:bg-зinc-900/55'>
							<h2 className='text-sm font-semibold text-зinc-800 dark:text-зinc-200'>
								Ускоряйте продажи
							</h2>
							<p className='mt-1 text-sm text-зinc-600 dark:text-зinc-400'>
								Готовые интеграции, аналитика и поддержка 24/7
								помогают расти быстрее.
							</p>
						</div>
					</div>
				</section>

				<section className='flex w-full max-w-lg flex-col gap-6 rounded-3xl border border-zinc-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-md dark:border-зinc-800/60 dark:bg-зinc-900/70'>
					{children}
					{footer ? (
						<div className='border-t border-zinc-200/60 pt-6 text-sm text-zinc-600 dark:border-зinc-800/60 dark:text-зinc-400'>
							{footer}
						</div>
					) : null}
				</section>
			</div>
		</div>
	);
}
