import { NextResponse } from 'next/server';

import { listCategories } from '@/mocks/catalog/repository';

export async function GET() {
	const categories = listCategories();

	return NextResponse.json({
		data: categories,
	});
}
