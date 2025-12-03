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

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
	typeof error === 'object' && error !== null && 'status' in error;

const isSerializedError = (error: unknown): error is SerializedError =>
	typeof error === 'object' && error !== null && 'message' in error;

export const extractErrorMessage = (error: unknown): string => {
	if (isFetchBaseQueryError(error)) {
		const data = error.data;
		if (typeof data === 'object' && data !== null && 'error' in data) {
			const message = (data as { readonly error?: unknown }).error;
			if (typeof message === 'string' && message.length > 0) {
				return message;
			}
		}
	}

	if (isSerializedError(error) && typeof error.message === 'string') {
		return error.message;
	}

	return 'Что-то пошло не так. Попробуйте ещё раз.';
};
