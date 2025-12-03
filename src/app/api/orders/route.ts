import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { OrderStatus } from '@/domain';
import { listOrders, type ListOrdersFilters } from '@/mocks/orders/repository';

const parseNumber = (value: string | null): number | undefined => {
	if (!value) {
		return undefined;
	}
	const numeric = Number.parseInt(value, 10);
	return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;
};

const isOrderStatus = (value: string): value is OrderStatus =>
	value === 'pending' ||
	value === 'processing' ||
	value === 'completed' ||
	value === 'cancelled' ||
	value === 'refunded';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const buyerId = searchParams.get('buyerId');
	const sellerId = searchParams.get('sellerId');
	const statusParam = searchParams.get('status');
	const page = parseNumber(searchParams.get('page'));
	const pageSize = parseNumber(searchParams.get('pageSize'));
	const status =
		statusParam !== null && isOrderStatus(statusParam)
			? statusParam
			: undefined;

	const filters = {
		...(buyerId !== null ? { buyerId } : {}),
		...(sellerId !== null ? { sellerId } : {}),
		...(status !== undefined ? { status } : {}),
		...(page !== undefined ? { page } : {}),
		...(pageSize !== undefined ? { pageSize } : {}),
	} satisfies ListOrdersFilters;

	const { items, meta } = listOrders(filters);

	return NextResponse.json({
		data: items,
		meta,
	});
}
