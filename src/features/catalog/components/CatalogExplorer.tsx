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

'use client';

import { useMemo, useState } from 'react';

import {
	ProductFilters,
	type ProductFiltersValue,
	buildProductQueryArgs,
} from './ProductFilters';
import { ProductGrid } from './ProductGrid';

export function CatalogExplorer() {
	const [filters, setFilters] = useState<ProductFiltersValue>({});

	const queryArgs = useMemo(() => buildProductQueryArgs(filters), [filters]);

	return (
		<>
			<ProductFilters onChange={setFilters} />
			{queryArgs !== undefined ? (
				<ProductGrid filters={queryArgs} />
			) : (
				<ProductGrid />
			)}
		</>
	);
}
