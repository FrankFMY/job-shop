import type { Category, Product, ProductSummary } from '@/domain';

export const categories: readonly Category[] = [
	{
		id: 'cat-electronics',
		name: 'Электроника',
		slug: 'electronics',
		createdAt: '2024-01-10T10:00:00.000Z',
		updatedAt: '2024-04-12T12:00:00.000Z',
	},
	{
		id: 'cat-fashion',
		name: 'Одежда',
		slug: 'fashion',
		createdAt: '2024-01-11T11:30:00.000Z',
		updatedAt: '2024-03-05T09:10:00.000Z',
	},
	{
		id: 'cat-home',
		name: 'Дом и интерьер',
		slug: 'home-decor',
		createdAt: '2024-02-02T08:45:00.000Z',
		updatedAt: '2024-02-15T08:45:00.000Z',
	},
	{
		id: 'cat-sport',
		name: 'Спорт',
		slug: 'sport',
		createdAt: '2024-02-18T07:20:00.000Z',
		updatedAt: '2024-04-01T07:20:00.000Z',
	},
];

export const products: readonly Product[] = [
	{
		id: 'prod-smartwatch-1',
		sellerId: 'seller-omega',
		categoryId: 'cat-electronics',
		name: 'Умные часы Omega Pulse',
		slug: 'omega-pulse-watch',
		description:
			'Флагманские умные часы с мониторингом здоровья, NFC-платежами и автономностью до 5 дней.',
		price: 12990,
		currency: 'RUB',
		stock: 42,
		status: 'active',
		imageUrls: [
			'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d',
			'https://images.unsplash.com/photo-1519741477676-29f87139f713',
		],
		createdAt: '2024-03-01T10:30:00.000Z',
		updatedAt: '2024-04-10T10:30:00.000Z',
	},
	{
		id: 'prod-headphones-1',
		sellerId: 'seller-aurora',
		categoryId: 'cat-electronics',
		name: 'Наушники Aurora Flow ANC',
		slug: 'aurora-flow-anc',
		description:
			'Беспроводные наушники с активным шумоподавлением, поддержкой пространственного звука и 30 часами автономной работы.',
		price: 15990,
		currency: 'RUB',
		stock: 63,
		status: 'active',
		imageUrls: [
			'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08',
		],
		createdAt: '2024-03-11T09:10:00.000Z',
		updatedAt: '2024-04-05T09:10:00.000Z',
	},
	{
		id: 'prod-lamp-1',
		sellerId: 'seller-homely',
		categoryId: 'cat-home',
		name: 'Настольная лампа Helios',
		slug: 'helios-desk-lamp',
		description:
			'Минималистичная лампа с регулировкой яркости, температурой света и беспроводной зарядкой.',
		price: 4890,
		currency: 'RUB',
		stock: 28,
		status: 'active',
		imageUrls: [
			'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
		],
		createdAt: '2024-02-22T13:00:00.000Z',
		updatedAt: '2024-02-28T13:00:00.000Z',
	},
	{
		id: 'prod-sofa-1',
		sellerId: 'seller-homely',
		categoryId: 'cat-home',
		name: 'Диван Modulor Flex',
		slug: 'modulor-flex-sofa',
		description:
			'Модульный диван с высокоэластичным наполнителем, сменными чехлами и встроенными USB-портами.',
		price: 54990,
		currency: 'RUB',
		stock: 8,
		status: 'active',
		imageUrls: [
			'https://images.unsplash.com/photo-1505691723518-36a5ac3be353',
		],
		createdAt: '2024-03-25T15:20:00.000Z',
		updatedAt: '2024-04-02T15:20:00.000Z',
	},
	{
		id: 'prod-sneakers-1',
		sellerId: 'seller-motion',
		categoryId: 'cat-fashion',
		name: 'Кроссовки Motion Velocity',
		slug: 'motion-velocity-sneakers',
		description:
			'Лёгкие беговые кроссовки с амортизацией для городских и трейл-забегов, устойчивые к влаге.',
		price: 8990,
		currency: 'RUB',
		stock: 75,
		status: 'active',
		imageUrls: [
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
		],
		createdAt: '2024-02-18T08:00:00.000Z',
		updatedAt: '2024-03-01T08:00:00.000Z',
	},
	{
		id: 'prod-jacket-1',
		sellerId: 'seller-motion',
		categoryId: 'cat-fashion',
		name: 'Куртка Motion Stormproof',
		slug: 'motion-stormproof-jacket',
		description:
			'Многофункциональная куртка для активного отдыха с мембраной 15k/15k, вентиляцией и утеплёнными зонами.',
		price: 17990,
		currency: 'RUB',
		stock: 34,
		status: 'active',
		imageUrls: [
			'https://images.unsplash.com/photo-1521577352947-9bb58764b69a',
		],
		createdAt: '2024-01-28T17:45:00.000Z',
		updatedAt: '2024-02-14T17:45:00.000Z',
	},
	{
		id: 'prod-bike-1',
		sellerId: 'seller-velocity',
		categoryId: 'cat-sport',
		name: 'Велосипед Velocity Gravel Pro',
		slug: 'velocity-gravel-pro',
		description:
			'Грэвел-байк с карбоновой рамой, 11-скоростной трансмиссией и карбоновым подседельным штырем.',
		price: 119000,
		currency: 'RUB',
		stock: 5,
		status: 'active',
		imageUrls: [
			'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
		],
		createdAt: '2024-04-01T06:20:00.000Z',
		updatedAt: '2024-04-08T06:20:00.000Z',
	},
	{
		id: 'prod-yoga-1',
		sellerId: 'seller-velocity',
		categoryId: 'cat-sport',
		name: 'Набор для йоги Serenity',
		slug: 'serenity-yoga-kit',
		description:
			'Комплект из коврика, блока, ремня и сумки из переработанных материалов для практики йоги и пилатеса.',
		price: 6290,
		currency: 'RUB',
		stock: 51,
		status: 'active',
		imageUrls: [
			'https://images.unsplash.com/photo-1518611012118-696072aa579a',
		],
		createdAt: '2024-03-05T12:15:00.000Z',
		updatedAt: '2024-03-16T12:15:00.000Z',
	},
];

const stableRating = (id: string, price: number): number => {
	const base = price > 50000 ? 4.9 : 4.4;
	const spread =
		id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 3;
	return Number((base + spread * 0.05).toFixed(1));
};

const stableReviewCount = (id: string): number => {
	const seed = id
		.split('')
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return 80 + (seed % 420);
};

export const productSummaries: readonly ProductSummary[] = products.map(
	(product) =>
		({
			id: product.id,
			sellerId: product.sellerId,
			name: product.name,
			price: product.price,
			currency: product.currency,
			rating: stableRating(product.id, product.price),
			reviewCount: stableReviewCount(product.id),
			...(product.imageUrls.at(0) !== undefined
				? { thumbnailUrl: product.imageUrls[0]! }
				: {}),
		} satisfies ProductSummary)
);
