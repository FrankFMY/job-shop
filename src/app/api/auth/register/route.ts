import { NextResponse } from 'next/server';

import type { UserRole } from '@/domain';
import {
	createSession,
	ensureEmailAvailable,
	registerUser,
} from '@/mocks/auth/state';
import { sessionCookie } from '@/lib/server/auth/session';

interface RegisterRequestBody {
	readonly email?: string;
	readonly password?: string;
	readonly displayName?: string;
	readonly role?: UserRole;
}

const MIN_PASSWORD_LENGTH = 6;

const isValidRole = (value: unknown): value is UserRole =>
	value === 'buyer' || value === 'seller' || value === 'admin';

export async function POST(request: Request) {
	let payload: RegisterRequestBody;
	try {
		payload = (await request.json()) as RegisterRequestBody;
	} catch {
		return NextResponse.json(
			{ error: 'Некорректный формат данных.' },
			{ status: 400 }
		);
	}

	if (!payload.email || typeof payload.email !== 'string') {
		return NextResponse.json(
			{ error: 'Укажите корректный email.' },
			{ status: 400 }
		);
	}

	if (!payload.password || typeof payload.password !== 'string') {
		return NextResponse.json({ error: 'Укажите пароль.' }, { status: 400 });
	}

	if (payload.password.length < MIN_PASSWORD_LENGTH) {
		return NextResponse.json(
			{
				error: `Пароль должен содержать не менее ${MIN_PASSWORD_LENGTH} символов.`,
			},
			{ status: 400 }
		);
	}

	if (!payload.displayName || typeof payload.displayName !== 'string') {
		return NextResponse.json(
			{ error: 'Укажите отображаемое имя.' },
			{ status: 400 }
		);
	}

	if (payload.role !== undefined && !isValidRole(payload.role)) {
		return NextResponse.json(
			{ error: 'Недопустимая роль пользователя.' },
			{ status: 400 }
		);
	}

	if (!ensureEmailAvailable(payload.email)) {
		return NextResponse.json(
			{ error: 'Пользователь с таким email уже существует.' },
			{ status: 409 }
		);
	}

	const registered = registerUser({
		email: payload.email,
		password: payload.password,
		displayName: payload.displayName,
		...(payload.role !== undefined ? { role: payload.role } : {}),
	});

	const session = createSession(registered.user.id);
	const response = NextResponse.json(registered, { status: 201 });
	sessionCookie.write(response, session.id, session.expiresAt);

	return response;
}
