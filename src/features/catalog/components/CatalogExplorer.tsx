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
