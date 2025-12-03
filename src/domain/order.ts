export type OrderStatus =
	| 'pending'
	| 'processing'
	| 'completed'
	| 'cancelled'
	| 'refunded';

export interface OrderItem {
	readonly id: string;
	readonly orderId: string;
	readonly productId: string;
	readonly quantity: number;
	readonly unitPrice: number;
	readonly currency: string;
	readonly subtotal: number;
}

export interface Order {
	readonly id: string;
	readonly buyerId: string;
	readonly sellerId: string;
	readonly status: OrderStatus;
	readonly total: number;
	readonly currency: string;
	readonly commissionTotal: number;
	readonly createdAt: string;
	readonly updatedAt: string;
	readonly items: readonly OrderItem[];
}
