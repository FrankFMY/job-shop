import type { SellerProfile, User } from './user';

export interface AuthenticatedUser {
	readonly user: User;
	readonly sellerProfile: SellerProfile | null;
}
