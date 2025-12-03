export type ProductStatus = 'draft' | 'active' | 'archived';
export type ProductSort = 'price-asc' | 'price-desc' | 'rating-desc';

export interface Category {
	readonly id: string;
	readonly name: string;
	readonly slug: string;
	readonly parentId?: string;
	readonly createdAt: string;
	readonly updatedAt: string;
}

export interface Product {
	readonly id: string;
	readonly sellerId: string;
	readonly categoryId: string;
	readonly name: string;
	readonly slug: string;
	readonly description: string;
	readonly price: number;
	readonly currency: string;
	readonly stock: number;
	readonly status: ProductStatus;
	readonly imageUrls: readonly string[];
	readonly createdAt: string;
	readonly updatedAt: string;
}

export interface ProductSummary {
	readonly id: string;
	readonly sellerId: string;
	readonly name: string;
	readonly price: number;
	readonly currency: string;
	readonly thumbnailUrl?: string;
	readonly rating: number;
	readonly reviewCount: number;
}
