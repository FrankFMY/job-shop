import type { SellerProfile, User, UserRole } from '@/domain';

const createTimestamp = (month: number, day: number) =>
	new Date(2024, month - 1, day, 9, 0, 0).toISOString();

const user = (
	id: string,
	role: UserRole,
	email: string,
	displayName: string,
	month: number,
	day: number,
	avatarUrl?: string
): User =>
	({
		id,
		role,
		email,
		displayName,
		createdAt: createTimestamp(month, day),
		updatedAt: createTimestamp(month, day + 2),
		...(avatarUrl !== undefined ? { avatarUrl } : {}),
	} satisfies User);

export const users: readonly User[] = [
	user(
		'user-buyer-ivan',
		'buyer',
		'ivan.buyers@example.com',
		'Иван Покупатель',
		1,
		10,
		'https://images.unsplash.com/photo-1544723795-3fb6469f5b39'
	),
	user(
		'user-buyer-olga',
		'buyer',
		'olga.shopper@example.com',
		'Ольга Шоппер',
		2,
		4,
		'https://images.unsplash.com/photo-1544723795-432537909029'
	),
	user(
		'seller-omega',
		'seller',
		'sales@omegapulse.ru',
		'Omega Tech',
		1,
		18,
		'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0'
	),
	user(
		'seller-aurora',
		'seller',
		'hello@auroraaudio.io',
		'Aurora Audio',
		1,
		22,
		'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee'
	),
	user(
		'seller-homely',
		'seller',
		'support@homely.design',
		'Homely Design',
		2,
		12,
		'https://images.unsplash.com/photo-1504593811423-6dd665756598'
	),
	user(
		'seller-motion',
		'seller',
		'team@motionlab.sport',
		'Motion Lab',
		2,
		18,
		'https://images.unsplash.com/photo-1454165205744-3b78555e5572'
	),
	user(
		'seller-velocity',
		'seller',
		'service@velocity.pro',
		'Velocity Pro',
		3,
		6,
		'https://images.unsplash.com/photo-1521572267360-ee0c2909d518'
	),
	user(
		'admin-natalia',
		'admin',
		'natalia.admin@example.com',
		'Наталия Админ',
		1,
		3
	),
];

export const sellerProfiles: readonly SellerProfile[] = [
	{
		id: 'seller-profile-omega',
		userId: 'seller-omega',
		shopName: 'Omega Pulse Market',
		description: 'Гаджеты премиум-класса с поддержкой умного дома.',
		commissionRate: 0.12,
		rating: 4.8,
		isVerified: true,
		createdAt: createTimestamp(1, 18),
		updatedAt: createTimestamp(3, 10),
	},
	{
		id: 'seller-profile-aurora',
		userId: 'seller-aurora',
		shopName: 'Aurora Audio Store',
		description: 'Аудио-устройства с уникальным дизайном и звуком.',
		commissionRate: 0.1,
		rating: 4.6,
		isVerified: true,
		createdAt: createTimestamp(1, 22),
		updatedAt: createTimestamp(3, 2),
	},
	{
		id: 'seller-profile-homely',
		userId: 'seller-homely',
		shopName: 'Homely Interiors',
		description: 'Мебель и свет для минималистичных пространств.',
		commissionRate: 0.14,
		rating: 4.7,
		isVerified: true,
		createdAt: createTimestamp(2, 12),
		updatedAt: createTimestamp(3, 18),
	},
	{
		id: 'seller-profile-motion',
		userId: 'seller-motion',
		shopName: 'Motion Active',
		description: 'Одежда и экипировка для активного образа жизни.',
		commissionRate: 0.11,
		rating: 4.5,
		isVerified: false,
		createdAt: createTimestamp(2, 18),
		updatedAt: createTimestamp(3, 22),
	},
	{
		id: 'seller-profile-velocity',
		userId: 'seller-velocity',
		shopName: 'Velocity Sports',
		description: 'Премиальная спортивная экипировка и фитнес-аксессуары.',
		commissionRate: 0.13,
		rating: 4.9,
		isVerified: true,
		createdAt: createTimestamp(3, 6),
		updatedAt: createTimestamp(4, 5),
	},
];
