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

import { NextResponse } from 'next/server';

import {
	createSession,
	findAuthenticatedUser,
	verifyCredentials,
} from '@/mocks/auth/state';
import { sessionCookie } from '@/lib/server/auth/session';

interface LoginRequestBody {
	readonly email?: string;
	readonly password?: string;
}

export async function POST(request: Request) {
	let payload: LoginRequestBody;
	try {
		payload = (await request.json()) as LoginRequestBody;
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

	const credentials = verifyCredentials(payload.email, payload.password);
	if (!credentials) {
		return NextResponse.json(
			{ error: 'Неверный email или пароль.' },
			{ status: 401 }
		);
	}

	const authenticated = findAuthenticatedUser(credentials.userId);
	if (!authenticated) {
		return NextResponse.json(
			{ error: 'Пользователь не найден.' },
			{ status: 404 }
		);
	}

	const session = createSession(credentials.userId);
	const response = NextResponse.json(authenticated, { status: 200 });
	sessionCookie.write(response, session.id, session.expiresAt);
	return response;
}
