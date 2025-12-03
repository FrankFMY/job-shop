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

export interface PaginationInput {
	readonly page?: number;
	readonly pageSize?: number;
}

export interface PaginationMeta {
	readonly page: number;
	readonly pageSize: number;
	readonly totalItems: number;
	readonly totalPages: number;
}

export interface PaginatedResult<T> {
	readonly items: readonly T[];
	readonly meta: PaginationMeta;
}

export const DEFAULT_PAGE_SIZE = 20;

export function paginate<T>(
	items: readonly T[],
	input: PaginationInput = {}
): PaginatedResult<T> {
	const pageSize =
		input.pageSize !== undefined && input.pageSize > 0
			? Math.min(input.pageSize, 100)
			: DEFAULT_PAGE_SIZE;
	const page =
		input.page !== undefined && input.page > 0 ? Math.floor(input.page) : 1;

	const totalItems = items.length;
	const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
	const clampedPage = Math.min(page, totalPages);

	const start = (clampedPage - 1) * pageSize;
	const end = start + pageSize;

	return {
		items: items.slice(start, end),
		meta: {
			page: clampedPage,
			pageSize,
			totalItems,
			totalPages,
		},
	};
}
