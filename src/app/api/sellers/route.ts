import { NextResponse } from 'next/server';

import { listSellerOptions } from '@/mocks/users/repository';

export async function GET() {
	const sellers = listSellerOptions();

	return NextResponse.json({
		data: sellers,
	});
}
