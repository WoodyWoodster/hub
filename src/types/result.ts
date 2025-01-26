export type Result<T, E> = Ok<T> | Err<E>;

export interface Ok<T> {
	type: 'ok';
	value: T;
}

export interface Err<E> {
	type: 'error';
	error: E;
}

export const ok = <T, E = never>(value: T): Result<T, E> => ({
	type: 'ok',
	value,
});

export const err = <T = never, E = unknown>(error: E): Result<T, E> => ({
	type: 'error',
	error,
});

export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
	return result.type === 'ok';
}

export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
	return result.type === 'error';
}
