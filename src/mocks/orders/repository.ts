import type { Order, OrderStatus } from '@/domain';
import { orders } from './data';
import {
	type PaginatedResult,
	paginate,
	type PaginationInput,
} from '../utils/pagination';

export interface ListOrdersFilters extends PaginationInput {
	readonly buyerId?: string;
	readonly sellerId?: string;
	readonly status?: OrderStatus;
}

export function listOrders(
	filters: ListOrdersFilters = {}
): PaginatedResult<Order> {
	const filtered = orders.filter((order) => {
		if (filters.buyerId && order.buyerId !== filters.buyerId) {
			return false;
		}
		if (filters.sellerId && order.sellerId !== filters.sellerId) {
			return false;
		}
		if (filters.status && order.status !== filters.status) {
			return false;
		}
		return true;
	});

	return paginate(filtered, filters);
}

export function getOrderById(id: string): Order | undefined {
	return orders.find((order) => order.id === id);
}
