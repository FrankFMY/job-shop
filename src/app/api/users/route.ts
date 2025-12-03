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

import type { UserRole } from '@/domain';
import { listUsers, type ListUsersFilters } from '@/mocks/users/repository';

const parseNumber = (value: string | null): number | undefined => {
	if (!value) {
		return undefined;
	}
	const numeric = Number.parseInt(value, 10);
	return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;
};

const isUserRole = (value: string): value is UserRole =>
	value === 'buyer' || value === 'seller' || value === 'admin';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const roleParam = searchParams.get('role');
	const search = searchParams.get('search');
	const page = parseNumber(searchParams.get('page'));
	const pageSize = parseNumber(searchParams.get('pageSize'));
	const role =
		roleParam !== null && isUserRole(roleParam) ? roleParam : undefined;

	const filters = {
		...(role !== undefined ? { role } : {}),
		...(search !== null ? { search } : {}),
		...(page !== undefined ? { page } : {}),
		...(pageSize !== undefined ? { pageSize } : {}),
	} satisfies ListUsersFilters;

	const { items, meta } = listUsers(filters);

	return NextResponse.json({
		data: items,
		meta,
	});
}
