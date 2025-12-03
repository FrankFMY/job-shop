'use client';

import Image from 'next/image';

import type { ProductSummary } from '@/domain';

interface ProductCardProps {
	readonly product: ProductSummary;
}

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
	style: 'currency',
	currency: 'RUB',
});

const buildThumbnailSrc = (source: string): string => {
	try {
		const url = new URL(source);
		url.searchParams.set('auto', 'format');
		url.searchParams.set('fit', 'crop');
		url.searchParams.set('w', '560');
		url.searchParams.set('h', '560');
		url.searchParams.set('q', '80');
		return url.toString();
	} catch (error) {
		console.warn('Unable to normalize product image URL', error);
		return source.includes('?')
			? `${source}&auto=format&fit=crop&w=560&h=560&q=80`
			: `${source}?auto=format&fit=crop&w=560&h=560&q=80`;
	}
};

export function ProductCard({ product }: ProductCardProps) {
	const HIGH_PRIORITY_PRODUCT_IDS = new Set([
		'prod-watch-omega',
		'prod-headphones-aurora',
		'prod-lamp-helios',
	]);
	const isAboveTheFold = HIGH_PRIORITY_PRODUCT_IDS.has(product.id);
	const thumbnailSrc = product.thumbnailUrl
		? buildThumbnailSrc(product.thumbnailUrl)
		: null;

	return (
		<article className='flex flex-col gap-3 rounded-2xl border border-zinc-200/60 bg-white/25 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800/60 dark:bg-zinc-900/40'>
			<div className='relative aspect-square w-full overflow-hidden rounded-xl bg-linear-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900'>
				{thumbnailSrc ? (
					<Image
						src={thumbnailSrc}
						alt={product.name}
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw'
						loading={isAboveTheFold ? 'eager' : 'lazy'}
						priority={isAboveTheFold}
					/>
				) : (
					<div className='flex h-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400'>
						Нет изображения
					</div>
				)}
			</div>
			<header className='flex flex-col gap-1'>
				<h3 className='text-base font-semibold text-zinc-900 dark:text-zinc-50'>
					{product.name}
				</h3>
				<p className='text-sm text-zinc-500 dark:text-zinc-400'>
					Продавец: {product.sellerId}
				</p>
			</header>
			<footer className='mt-auto flex items-center justify-between'>
				<span className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
					{currencyFormatter.format(product.price)}
				</span>
				<div className='flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'>
					<span>{product.rating.toFixed(1)}★</span>
					<span className='text-zinc-400'>·</span>
					<span>{product.reviewCount}</span>
				</div>
			</footer>
		</article>
	);
}
