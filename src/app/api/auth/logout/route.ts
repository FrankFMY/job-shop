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

import { deleteSession } from '@/mocks/auth/state';
import { sessionCookie } from '@/lib/server/auth/session';

export async function POST(request: NextRequest) {
	const response = NextResponse.json({ success: true });
	const sessionId = sessionCookie.read(request);
	deleteSession(sessionId);
	sessionCookie.clear(response);
	return response;
}
