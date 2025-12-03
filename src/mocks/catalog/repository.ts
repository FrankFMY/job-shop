import type { Category, Product, ProductSort, ProductSummary } from '@/domain';
import { catalogStore } from './store';
import {
	type PaginatedResult,
	paginate,
	type PaginationInput,
} from '../utils/pagination';

export interface ListProductsFilters extends PaginationInput {
	readonly search?: string;
	readonly categoryId?: string;
	readonly sellerId?: string;
	readonly status?: Product['status'];
	readonly sort?: ProductSort;
}

const normalize = (value: string): string => value.trim().toLowerCase();

const sortSummaries = (
	summaries: readonly ProductSummary[],
	sort?: ProductSort
): readonly ProductSummary[] => {
	if (!sort) {
		return summaries;
	}

	const sorted = [...summaries];

	switch (sort) {
		case 'price-asc': {
			sorted.sort((a, b) => a.price - b.price);
			break;
		}
		case 'price-desc': {
			sorted.sort((a, b) => b.price - a.price);
			break;
		}
		case 'rating-desc': {
			sorted.sort((a, b) => {
				if (b.rating === a.rating) {
					return b.reviewCount - a.reviewCount;
				}
				return b.rating - a.rating;
			});
			break;
		}
		default:
			break;
	}

	return sorted;
};

export function listCategories(): readonly Category[] {
	return catalogStore.getCategories();
}

export function listProductSummaries(
	filters: ListProductsFilters = {}
): PaginatedResult<ProductSummary> {
	const products = catalogStore.getProducts();
	const summaries = catalogStore.getSummaries();

	const filtered = summaries.filter((summary) => {
		const product = products.find(
			(candidate) => candidate.id === summary.id
		);
		if (!product) {
			return false;
		}

		if (filters.status !== undefined && product.status !== filters.status) {
			return false;
		}

		if (filters.categoryId && product.categoryId !== filters.categoryId) {
			return false;
		}

		if (filters.sellerId && product.sellerId !== filters.sellerId) {
			return false;
		}

		if (filters.search) {
			const query = normalize(filters.search);
			const matchesName = normalize(summary.name).includes(query);
			const matchesSeller = normalize(product.sellerId).includes(query);
			if (!matchesName && !matchesSeller) {
				return false;
			}
		}

		return true;
	});

	const sorted = sortSummaries(filtered, filters.sort);

	return paginate(sorted, filters);
}

export function getProductById(id: string): Product | undefined {
	return catalogStore.getProducts().find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
	return catalogStore.getProducts().find((product) => product.slug === slug);
}
