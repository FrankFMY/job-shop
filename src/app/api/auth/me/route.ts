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

import { NextRequest, NextResponse } from 'next/server';

import { findAuthenticatedUser, getSession } from '@/mocks/auth/state';
import { sessionCookie } from '@/lib/server/auth/session';

export async function GET(request: NextRequest) {
	const sessionId = sessionCookie.read(request);
	const session = getSession(sessionId);

	if (!session) {
		return NextResponse.json({ user: null }, { status: 200 });
	}

	const authenticated = findAuthenticatedUser(session.userId);
	if (!authenticated) {
		return NextResponse.json({ user: null }, { status: 200 });
	}

	return NextResponse.json(authenticated, { status: 200 });
}
