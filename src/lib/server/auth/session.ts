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

import type { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'jobshop_session';

const isProduction = process.env.NODE_ENV === 'production';

const baseCookieOptions = {
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	path: '/',
};

export const sessionCookie = {
	name: SESSION_COOKIE_NAME,
	read(request: NextRequest): string | undefined {
		return request.cookies.get(SESSION_COOKIE_NAME)?.value;
	},
	write(response: NextResponse, value: string, expiresAt: string): void {
		response.cookies.set(SESSION_COOKIE_NAME, value, {
			...baseCookieOptions,
			expires: new Date(expiresAt),
		});
	},
	clear(response: NextResponse): void {
		response.cookies.set(SESSION_COOKIE_NAME, '', {
			...baseCookieOptions,
			maxAge: 0,
		});
	},
};
