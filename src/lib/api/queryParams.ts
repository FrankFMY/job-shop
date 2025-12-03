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
