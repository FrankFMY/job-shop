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

type Serializable = string | number | boolean;

export type QueryArgs = Record<string, Serializable | null | undefined>;

export const toQueryParams = <T extends QueryArgs>(
	args?: T
): Record<string, Serializable> | undefined => {
	if (!args) {
		return undefined;
	}

	const entries = Object.entries(args).filter(
		([, value]) => value !== undefined && value !== null
	);

	if (entries.length === 0) {
		return undefined;
	}

	return Object.fromEntries(entries) as Record<string, Serializable>;
};
