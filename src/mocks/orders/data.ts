import type { Order, OrderItem } from '@/domain';
import { products } from '../catalog/data';
import { users } from '../users/data';

const findProduct = (productId: string) => {
	const product = products.find((candidate) => candidate.id === productId);
	if (!product) {
		throw new Error(`Product ${productId} not found in mocks`);
	}
	return product;
};

const currency = 'RUB';

const orderItems = (
	orderId: string,
	entries: ReadonlyArray<{
		readonly productId: string;
		readonly quantity: number;
	}>
): readonly OrderItem[] =>
	entries.map(({ productId, quantity }, index) => {
		const product = findProduct(productId);
		const subtotal = product.price * quantity;
		return {
			id: `${orderId}-item-${index + 1}`,
			orderId,
			productId,
			quantity,
			unitPrice: product.price,
			currency,
			subtotal,
		};
	});

const order = (
	id: string,
	buyerId: string,
	sellerId: string,
	status: Order['status'],
	entries: ReadonlyArray<{
		readonly productId: string;
		readonly quantity: number;
	}>,
	createdAt: string,
	commissionPercentage: number
): Order => {
	const items = orderItems(id, entries);
	const total = items.reduce((sum, item) => sum + item.subtotal, 0);
	return {
		id,
		buyerId,
		sellerId,
		status,
		total,
		currency,
		commissionTotal: Number((total * commissionPercentage).toFixed(2)),
		createdAt,
		updatedAt: createdAt,
		items,
	};
};

const ensureBuyer = (buyerId: string) => {
	const user = users.find((candidate) => candidate.id === buyerId);
	if (!user) {
		throw new Error(`Buyer ${buyerId} not found`);
	}
	if (user.role !== 'buyer') {
		throw new Error(`User ${buyerId} is not a buyer`);
	}
	return user;
};

ensureBuyer('user-buyer-ivan');
ensureBuyer('user-buyer-olga');

export const orders: readonly Order[] = [
	order(
		'order-1001',
		'user-buyer-ivan',
		'seller-omega',
		'completed',
		[
			{ productId: 'prod-smartwatch-1', quantity: 1 },
			{ productId: 'prod-headphones-1', quantity: 1 },
		],
		'2024-03-22T11:45:00.000Z',
		0.12
	),
	order(
		'order-1002',
		'user-buyer-ivan',
		'seller-motion',
		'processing',
		[
			{ productId: 'prod-sneakers-1', quantity: 1 },
			{ productId: 'prod-jacket-1', quantity: 1 },
		],
		'2024-04-03T14:20:00.000Z',
		0.11
	),
	order(
		'order-1003',
		'user-buyer-olga',
		'seller-homely',
		'pending',
		[
			{ productId: 'prod-lamp-1', quantity: 2 },
			{ productId: 'prod-sofa-1', quantity: 1 },
		],
		'2024-04-08T09:05:00.000Z',
		0.14
	),
];
