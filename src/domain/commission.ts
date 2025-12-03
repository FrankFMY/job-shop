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
