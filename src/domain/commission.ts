export interface CommissionRule {
	readonly id: string;
	readonly sellerId: string;
	readonly percentage: number;
	readonly appliesFrom: string;
	readonly appliesTo?: string;
	readonly categoryId?: string;
}

export interface CommissionStatement {
	readonly id: string;
	readonly sellerId: string;
	readonly orderId: string;
	readonly amount: number;
	readonly currency: string;
	readonly createdAt: string;
}
