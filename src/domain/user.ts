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
