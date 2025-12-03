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
