import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { ProductStatus } from '@/domain';
import {
	listProductSummaries,
	type ListProductsFilters,
} from '@/mocks/catalog/repository';

const parseNumber = (value: string | null): number | undefined => {
	if (!value) {
		return undefined;
	}
	const numeric = Number.parseInt(value, 10);
	return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;
};

const isProductStatus = (value: string): value is ProductStatus =>
	value === 'draft' || value === 'active' || value === 'archived';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const search = searchParams.get('search');
	const categoryId = searchParams.get('categoryId');
	const sellerId = searchParams.get('sellerId');
	const statusParam = searchParams.get('status');
	const page = parseNumber(searchParams.get('page'));
	const pageSize = parseNumber(searchParams.get('pageSize'));
	const status =
		statusParam !== null && isProductStatus(statusParam)
			? statusParam
			: undefined;

	const filters = {
		...(search !== null ? { search } : {}),
		...(categoryId !== null ? { categoryId } : {}),
		...(sellerId !== null ? { sellerId } : {}),
		...(status !== undefined ? { status } : {}),
		...(page !== undefined ? { page } : {}),
		...(pageSize !== undefined ? { pageSize } : {}),
	} satisfies ListProductsFilters;

	const { items, meta } = listProductSummaries(filters);

	return NextResponse.json({
		data: items,
		meta,
	});
}
