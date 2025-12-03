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

import { getProductById } from '@/mocks/catalog/repository';

export async function GET(
	_request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;
	const product = getProductById(id);

	if (!product) {
		return NextResponse.json(
			{ error: `Product with id "${id}" not found.` },
			{ status: 404 }
		);
	}

	return NextResponse.json({ data: product });
}
