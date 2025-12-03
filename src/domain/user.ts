export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
	readonly id: string;
	readonly role: UserRole;
	readonly email: string;
	readonly displayName: string;
	readonly avatarUrl?: string;
	readonly createdAt: string;
	readonly updatedAt: string;
}

export interface SellerProfile {
	readonly id: string;
	readonly userId: string;
	readonly shopName: string;
	readonly description?: string;
	readonly commissionRate: number;
	readonly rating: number;
	readonly isVerified: boolean;
	readonly createdAt: string;
	readonly updatedAt: string;
}
