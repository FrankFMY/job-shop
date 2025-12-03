import type { SellerProfile, User, UserRole } from '@/domain';
import { usersStore } from './store';
import {
	type PaginatedResult,
	paginate,
	type PaginationInput,
} from '../utils/pagination';

export interface ListUsersFilters extends PaginationInput {
	readonly role?: UserRole;
	readonly search?: string;
}

export interface SellerOption {
	readonly id: string;
	readonly userId: string;
	readonly displayName: string;
	readonly shopName: string;
	readonly commissionRate: number;
	readonly rating: number;
	readonly isVerified: boolean;
}

const normalize = (value: string): string => value.trim().toLowerCase();

const getUsers = (): readonly User[] => usersStore.getUsers();
const getSellerProfiles = (): readonly SellerProfile[] =>
	usersStore.getSellerProfiles();

export function listUsers(
	filters: ListUsersFilters = {}
): PaginatedResult<User> {
	const filtered = getUsers().filter((user) => {
		if (filters.role && user.role !== filters.role) {
			return false;
		}

		if (filters.search) {
			const query = normalize(filters.search);
			const matchesName = normalize(user.displayName).includes(query);
			const matchesEmail = normalize(user.email).includes(query);
			if (!matchesName && !matchesEmail) {
				return false;
			}
		}

		return true;
	});

	return paginate(filtered, filters);
}

export function getUserById(id: string): User | undefined {
	return getUsers().find((user) => user.id === id);
}

export function getSellerProfileByUserId(
	userId: string
): SellerProfile | undefined {
	return getSellerProfiles().find((profile) => profile.userId === userId);
}

export function listSellerOptions(): readonly SellerOption[] {
	return getSellerProfiles().map((profile) => {
		const owner = getUsers().find(
			(candidate) => candidate.id === profile.userId
		);

		return {
			id: profile.id,
			userId: profile.userId,
			displayName: owner?.displayName ?? profile.shopName,
			shopName: profile.shopName,
			commissionRate: profile.commissionRate,
			rating: profile.rating,
			isVerified: profile.isVerified,
		};
	});
}
