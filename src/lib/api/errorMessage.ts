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
