export interface PaginationMeta {
	readonly page: number;
	readonly pageSize: number;
	readonly totalItems: number;
	readonly totalPages: number;
}

export interface PaginatedResponse<T> {
	readonly data: readonly T[];
	readonly meta: PaginationMeta;
}
