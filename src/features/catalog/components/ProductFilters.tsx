'use client';

import {
	useDeferredValue,
	useEffect,
	useMemo,
	useState,
	useTransition,
} from 'react';

import { useListCategoriesQuery } from '@/lib/api/services/categoriesApi';
import { useListSellersQuery } from '@/lib/api/services/sellersApi';
import type { ListProductsQueryArgs } from '@/lib/api/services/productsApi';

export interface ProductFiltersValue {
	readonly search?: string;
	readonly categoryId?: string;
	readonly sellerId?: string;
	readonly sort?: ListProductsQueryArgs['sort'];
}

interface ProductFiltersProps {
	readonly onChange: (value: ProductFiltersValue) => void;
}

export function ProductFilters({ onChange }: ProductFiltersProps) {
	const [searchInput, setSearchInput] = useState('');
	const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
	const [sellerId, setSellerId] = useState<string | undefined>(undefined);
	const [sort, setSort] = useState<ListProductsQueryArgs['sort']>();
	const deferredSearch = useDeferredValue(searchInput);
	const deferredCategory = useDeferredValue(categoryId);
	const deferredSeller = useDeferredValue(sellerId);
	const deferredSort = useDeferredValue(sort);
	const [isPending, startTransition] = useTransition();

	const { data: categories, isLoading: isCategoriesLoading } =
		useListCategoriesQuery();
	const { data: sellers, isLoading: isSellersLoading } =
		useListSellersQuery();

	const filterValue = useMemo<ProductFiltersValue>(() => {
		const trimmed = deferredSearch.trim();
		return {
			...(trimmed.length > 0 ? { search: trimmed } : {}),
			...(deferredCategory !== undefined && deferredCategory.length > 0
				? { categoryId: deferredCategory }
				: {}),
			...(deferredSeller !== undefined && deferredSeller.length > 0
				? { sellerId: deferredSeller }
				: {}),
			...(deferredSort !== undefined ? { sort: deferredSort } : {}),
		};
	}, [deferredCategory, deferredSearch, deferredSeller, deferredSort]);

	useEffect(() => {
		onChange(filterValue);
	}, [filterValue, onChange]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		startTransition(() => {
			setSearchInput(value);
		});
	};

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = event.target;
		startTransition(() => {
			setCategoryId(value === '' ? undefined : value);
		});
	};

	const handleSellerChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = event.target;
		startTransition(() => {
			setSellerId(value === '' ? undefined : value);
		});
	};

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		startTransition(() => {
			setSort(value === '' ? undefined : (value as typeof sort));
		});
	};

	return (
		<section className='flex w-full flex-col gap-6 rounded-3xl border border-zinc-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/70'>
			<div className='flex w-full flex-col gap-2 sm:max-w-2xl'>
				<label
					htmlFor='product-search'
					className='text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
					Поиск
				</label>
				<div className='relative'>
					<input
						id='product-search'
						type='search'
						value={searchInput}
						onChange={handleSearchChange}
						placeholder='Название товара, продавец...'
						className='h-11 w-full rounded-2xl border border-zinc-200/70 bg-white/85 px-4 text-sm text-zinc-800 shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-100'
					/>
					{isPending ? (
						<span className='absolute right-3 top-1/2 inline-flex size-2 -translate-y-1/2 animate-ping rounded-full bg-emerald-500' />
					) : null}
				</div>
			</div>

			<div className='grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				<div className='flex min-w-0 flex-col gap-2'>
					<label
						htmlFor='product-category'
						className='text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
						Категория
					</label>
					<div className='relative flex items-center'>
						<select
							id='product-category'
							value={categoryId ?? ''}
							onChange={handleCategoryChange}
							className='peer flex h-11 w-full appearance-none items-center rounded-2xl border border-zinc-200/70 bg-white/85 px-4 pr-12 text-sm text-zinc-700 shadow-sm transition focus-visible:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-100'
							disabled={isCategoriesLoading}>
							<option value=''>Все категории</option>
							{categories?.map((category) => (
								<option
									key={category.id}
									value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						<span className='pointer-events-none absolute right-3 flex size-6 items-center justify-center rounded-full bg-zinc-200/60 text-zinc-500 shadow-sm transition-transform duration-200 ease-out peer-focus:-rotate-180 peer-focus-visible:-rotate-180 dark:bg-zinc-800/60 dark:text-zinc-300'>
							<svg
								viewBox='0 0 16 16'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='size-3.5'>
								<path d='M4 6L8 10L12 6' />
							</svg>
						</span>
					</div>
				</div>

				<div className='flex min-w-0 flex-col gap-2'>
					<label
						htmlFor='product-seller'
						className='text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
						Продавец
					</label>
					<div className='relative flex items-center'>
						<select
							id='product-seller'
							value={sellerId ?? ''}
							onChange={handleSellerChange}
							className='peer flex h-11 w-full appearance-none items-center rounded-2xl border border-zinc-200/70 bg-white/85 px-4 pr-12 text-sm text-zinc-700 shadow-sm transition focus-visible:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-100'
							disabled={isSellersLoading}>
							<option value=''>Все продавцы</option>
							{sellers?.map((seller) => (
								<option
									key={seller.id}
									value={seller.userId}>
									{seller.shopName} · {seller.rating.toFixed(1)}★
								</option>
							))}
						</select>
						<span className='pointer-events-none absolute right-3 flex size-6 items-center justify-center rounded-full bg-zinc-200/60 text-zinc-500 shadow-sm transition-transform duration-200 ease-out peer-focus:-rotate-180 peer-focus-visible:-rotate-180 dark:bg-zinc-800/60 dark:text-zinc-300'>
							<svg
								viewBox='0 0 16 16'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='size-3.5'>
								<path d='M4 6L8 10L12 6' />
							</svg>
						</span>
					</div>
				</div>

				<div className='flex min-w-0 flex-col gap-2'>
					<label
						htmlFor='product-sort'
						className='text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
						Сортировка
					</label>
					<div className='relative flex items-center'>
						<select
							id='product-sort'
							value={sort ?? ''}
							onChange={handleSortChange}
							className='peer flex h-11 w-full appearance-none items-center rounded-2xl border border-zinc-200/70 bg-white/85 px-4 pr-12 text-sm text-zinc-700 shadow-sm transition focus-visible:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-100'
							disabled={isSellersLoading}>
							<option value=''>По умолчанию</option>
							<option value='price-asc'>Цена: по возрастанию</option>
							<option value='price-desc'>Цена: по убыванию</option>
							<option value='rating-desc'>
								Рейтинг: сначала выше
							</option>
						</select>
						<span className='pointer-events-none absolute right-3 flex size-6 items-center justify-center rounded-full bg-zinc-200/60 text-zinc-500 shadow-sm transition-transform duration-200 ease-out peer-focus:-rotate-180 peer-focus-visible:-rotate-180 dark:bg-zinc-800/60 dark:text-zinc-300'>
							<svg
								viewBox='0 0 16 16'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='size-3.5'>
								<path d='M4 6L8 10L12 6' />
							</svg>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export const buildProductQueryArgs = (
	value: ProductFiltersValue
): ListProductsQueryArgs | undefined => {
	const filters: ListProductsQueryArgs = {
		...(value.search !== undefined ? { search: value.search } : {}),
		...(value.categoryId !== undefined
			? { categoryId: value.categoryId }
			: {}),
		...(value.sellerId !== undefined ? { sellerId: value.sellerId } : {}),
		...(value.sort !== undefined ? { sort: value.sort } : {}),
	};
	return Object.keys(filters).length > 0 ? filters : undefined;
};
