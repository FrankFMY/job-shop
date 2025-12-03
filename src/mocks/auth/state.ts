import { createHash, randomUUID } from 'crypto';

import type {
	AuthenticatedUser,
	SellerProfile,
	User,
	UserRole,
} from '@/domain';
import { usersStore } from '../users/store';
import { users as seedUsers } from '../users/data';

interface CredentialRecord {
	readonly userId: string;
	readonly email: string;
	readonly passwordHash: string;
}

interface SessionRecord {
	readonly id: string;
	readonly userId: string;
	readonly createdAt: string;
	readonly expiresAt: string;
}

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const credentials: CredentialRecord[] = seedUsers.map((user) => ({
	userId: user.id,
	email: user.email.toLowerCase(),
	passwordHash: hashSecret('password123'),
}));
const sessions = new Map<string, SessionRecord>();

function hashSecret(secret: string): string {
	return createHash('sha256').update(secret).digest('hex');
}

const now = (): string => new Date().toISOString();

const toLower = (value: string): string => value.trim().toLowerCase();

function createSessionRecord(userId: string): SessionRecord {
	const id = randomUUID();
	const createdAt = now();
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();
	return { id, userId, createdAt, expiresAt } satisfies SessionRecord;
}

function getSellerProfile(userId: string): SellerProfile | undefined {
	return usersStore
		.getSellerProfiles()
		.find((profile) => profile.userId === userId);
}

export interface RegisterPayload {
	readonly email: string;
	readonly password: string;
	readonly displayName: string;
	readonly role?: UserRole;
}

export function verifyCredentials(
	email: string,
	password: string
): CredentialRecord | undefined {
	const credential = credentials.find(
		(item) => item.email === toLower(email)
	);
	if (!credential) {
		return undefined;
	}

	const hash = hashSecret(password);
	return hash === credential.passwordHash ? credential : undefined;
}

export function createSession(userId: string): SessionRecord {
	const session = createSessionRecord(userId);
	sessions.set(session.id, session);
	return session;
}

export function getSession(
	sessionId: string | undefined
): SessionRecord | undefined {
	if (!sessionId) {
		return undefined;
	}

	const session = sessions.get(sessionId);
	if (!session) {
		return undefined;
	}

	if (new Date(session.expiresAt).getTime() < Date.now()) {
		sessions.delete(sessionId);
		return undefined;
	}

	return session;
}

export function deleteSession(sessionId: string | undefined): void {
	if (!sessionId) {
		return;
	}
	sessions.delete(sessionId);
}

export function findAuthenticatedUser(
	userId: string
): AuthenticatedUser | undefined {
	const user = usersStore.getUsers().find((item) => item.id === userId);
	if (!user) {
		return undefined;
	}

	return {
		user,
		sellerProfile: getSellerProfile(userId) ?? null,
	};
}

export function registerUser(payload: RegisterPayload): AuthenticatedUser {
	const timestamp = now();
	const id = `user-${randomUUID()}`;
	const role: UserRole = payload.role ?? 'buyer';
	const user: User = {
		id,
		role,
		email: payload.email,
		displayName: payload.displayName,
		createdAt: timestamp,
		updatedAt: timestamp,
	};

	usersStore.addUser(user);

	credentials.push({
		userId: id,
		email: toLower(payload.email),
		passwordHash: hashSecret(payload.password),
	});

	let sellerProfile: SellerProfile | null = null;
	if (role === 'seller') {
		const profile: SellerProfile = {
			id: usersStore.generateSellerProfileId(),
			userId: id,
			shopName: payload.displayName,
			description: 'Новый продавец маркетплейса',
			commissionRate: 0.1,
			rating: 0,
			isVerified: false,
			createdAt: timestamp,
			updatedAt: timestamp,
		};
		usersStore.addSellerProfile(profile);
		sellerProfile = profile;
	}

	return { user, sellerProfile };
}

export function ensureEmailAvailable(email: string): boolean {
	return !credentials.some(
		(credential) => credential.email === toLower(email)
	);
}

export function listCredentials(): readonly CredentialRecord[] {
	return credentials;
}
