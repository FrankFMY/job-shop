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
