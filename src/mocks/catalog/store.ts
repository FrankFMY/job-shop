import { randomUUID } from 'crypto';

import type { Category, Product, ProductSummary } from '@/domain';
import {
	categories as seedCategories,
	productSummaries as seedProductSummaries,
	products as seedProducts,
} from './data';

interface CatalogStore {
	readonly categories: Category[];
	readonly products: Product[];
	readonly summaries: ProductSummary[];
}

const cloneCategories = (): Category[] =>
	seedCategories.map((item) => ({ ...item }));
const cloneProducts = (): Product[] =>
	seedProducts.map((item) => ({ ...item }));
const cloneSummaries = (): ProductSummary[] =>
	seedProductSummaries.map((item) => ({ ...item }));

const store: CatalogStore = {
	categories: cloneCategories(),
	products: cloneProducts(),
	summaries: cloneSummaries(),
};

export const catalogStore = {
	getCategories(): readonly Category[] {
		return store.categories;
	},
	getProducts(): readonly Product[] {
		return store.products;
	},
	getSummaries(): readonly ProductSummary[] {
		return store.summaries;
	},
	reset(): void {
		store.categories.splice(
			0,
			store.categories.length,
			...cloneCategories()
		);
		store.products.splice(0, store.products.length, ...cloneProducts());
		store.summaries.splice(0, store.summaries.length, ...cloneSummaries());
	},
	addProduct(product: Product, summary: ProductSummary): void {
		store.products.push(product);
		store.summaries.push(summary);
	},
	updateProduct(
		productId: string,
		product: Partial<Product>,
		summary?: Partial<ProductSummary>
	): Product | undefined {
		const index = store.products.findIndex((item) => item.id === productId);
		if (index === -1) {
			return undefined;
		}

		const updatedProduct = {
			...store.products[index],
			...product,
		} as Product;
		store.products[index] = updatedProduct;

		if (summary) {
			const summaryIndex = store.summaries.findIndex(
				(item) => item.id === productId
			);
			if (summaryIndex !== -1) {
				store.summaries[summaryIndex] = {
					...store.summaries[summaryIndex],
					...summary,
				} as ProductSummary;
			}
		}

		return updatedProduct;
	},
	removeProduct(productId: string): void {
		const productIndex = store.products.findIndex(
			(item) => item.id === productId
		);
		if (productIndex !== -1) {
			store.products.splice(productIndex, 1);
		}
		const summaryIndex = store.summaries.findIndex(
			(item) => item.id === productId
		);
		if (summaryIndex !== -1) {
			store.summaries.splice(summaryIndex, 1);
		}
	},
	generateProductId(): string {
		return `product-${randomUUID()}`;
	},
};
