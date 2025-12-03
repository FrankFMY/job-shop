import { NextRequest, NextResponse } from 'next/server';

import { deleteSession } from '@/mocks/auth/state';
import { sessionCookie } from '@/lib/server/auth/session';

export async function POST(request: NextRequest) {
	const response = NextResponse.json({ success: true });
	const sessionId = sessionCookie.read(request);
	deleteSession(sessionId);
	sessionCookie.clear(response);
	return response;
}
