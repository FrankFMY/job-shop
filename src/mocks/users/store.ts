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

import { randomUUID } from 'crypto';

import type { SellerProfile, User } from '@/domain';
import {
	sellerProfiles as seedSellerProfiles,
	users as seedUsers,
} from './data';

interface UserStore {
	readonly users: User[];
	readonly sellerProfiles: SellerProfile[];
}

const cloneUsers = (): User[] => seedUsers.map((user) => ({ ...user }));
const cloneSellerProfiles = (): SellerProfile[] =>
	seedSellerProfiles.map((profile) => ({ ...profile }));

const store: UserStore = {
	users: cloneUsers(),
	sellerProfiles: cloneSellerProfiles(),
};

export const usersStore = {
	getUsers(): readonly User[] {
		return store.users;
	},
	getSellerProfiles(): readonly SellerProfile[] {
		return store.sellerProfiles;
	},
	reset(): void {
		store.users.splice(0, store.users.length, ...cloneUsers());
		store.sellerProfiles.splice(
			0,
			store.sellerProfiles.length,
			...cloneSellerProfiles()
		);
	},
	addUser(user: User): User {
		store.users.push(user);
		return user;
	},
	updateUser(userId: string, payload: Partial<User>): User | undefined {
		const index = store.users.findIndex(
			(candidate) => candidate.id === userId
		);
		if (index === -1) {
			return undefined;
		}

		const updated = {
			...store.users[index],
			...payload,
		} as User;
		store.users[index] = updated;
		return updated;
	},
	addSellerProfile(profile: SellerProfile): SellerProfile {
		store.sellerProfiles.push(profile);
		return profile;
	},
	updateSellerProfile(
		profileId: string,
		payload: Partial<SellerProfile>
	): SellerProfile | undefined {
		const index = store.sellerProfiles.findIndex(
			(candidate) => candidate.id === profileId
		);
		if (index === -1) {
			return undefined;
		}

		const updated = {
			...store.sellerProfiles[index],
			...payload,
		} as SellerProfile;
		store.sellerProfiles[index] = updated;
		return updated;
	},
	generateSellerProfileId(): string {
		return `seller-profile-${randomUUID()}`;
	},
};
