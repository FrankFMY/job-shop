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
