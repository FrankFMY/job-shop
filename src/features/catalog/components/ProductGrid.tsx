'use client';

import { useCallback } from 'react';

import type { ListProductsQueryArgs } from '@/lib/api/services/productsApi';
import { useListProductsQuery } from '@/lib/api/services/productsApi';

import { ProductCard } from './ProductCard';

const gridBaseClass =
	'grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4';

const skeletonClass =
	'animate-pulse rounded-2xl border border-zinc-200/60 bg-white/60 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/60';

const LoadingSkeleton = () => (
	<div className={gridBaseClass}>
		{Array.from({ length: 8 }).map((_, index) => (
			<div
				key={index}
				className={skeletonClass}>
				<div className='mb-4 aspect-square w-full rounded-xl bg-zinc-200 dark:bg-zinc-800' />
				<div className='mb-2 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800' />
				<div className='mb-6 h-4 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800' />
				<div className='flex items-center justify-between gap-2'>
					<div className='h-4 w-1/3 rounded-full bg-zinc-200 dark:bg-zinc-800' />
					<div className='h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800' />
				</div>
			</div>
		))}
	</div>
);

const EmptyState = () => (
	<div className='flex w-full flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200/70 bg-white/30 p-12 text-center dark:border-zinc-700/70 dark:bg-zinc-900/40'>
		<h3 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
			Пока нет товаров
		</h3>
		<p className='mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400'>
			Добавьте товары через панель продавца или измените параметры
			фильтра.
		</p>
	</div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
	<div className='flex w-full flex-1 flex-col items-center justify-center rounded-3xl border border-rose-200/70 bg-rose-50/70 p-10 text-center dark:border-rose-900/60 dark:bg-rose-950/40'>
		<h3 className='text-lg font-semibold text-rose-700 dark:text-rose-200'>
			Не удалось загрузить каталог
		</h3>
		<p className='mt-2 max-w-md text-sm text-rose-600 dark:text-rose-300/80'>
			Проверьте подключение или попробуйте обновить страницу.
		</p>
		<button
			type='button'
			onClick={onRetry}
			className='mt-4 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400'>
			Повторить попытку
		</button>
	</div>
);

interface ProductGridProps {
	readonly filters?: ListProductsQueryArgs;
}

export function ProductGrid({ filters }: ProductGridProps) {
	const { data, isLoading, isFetching, isError, refetch } =
		useListProductsQuery(filters, {
			refetchOnReconnect: true,
			refetchOnFocus: true,
		});

	const handleRetry = useCallback(() => {
		void refetch();
	}, [refetch]);

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	if (isError) {
		return <ErrorState onRetry={handleRetry} />;
	}

	const products = data?.data ?? [];

	if (products.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className='flex w-full flex-col gap-4'>
			{isFetching && !isLoading ? (
				<div className='flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400'>
					<span className='inline-flex size-2 animate-ping rounded-full bg-emerald-500' />
					Обновляем предложения…
				</div>
			) : null}
			<div className={gridBaseClass}>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>
		</div>
	);
}
