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
import type { NextRequest } from 'next/server';

import {
	getSellerProfileByUserId,
	getUserById,
} from '@/mocks/users/repository';

export async function GET(
	_request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;

	const user = getUserById(id);

	if (!user) {
		return NextResponse.json(
			{ error: `User with id "${id}" not found.` },
			{ status: 404 }
		);
	}

	const sellerProfile =
		user.role === 'seller' ? getSellerProfileByUserId(id) : undefined;

	return NextResponse.json({
		data: user,
		related: {
			sellerProfile,
		},
	});
}
