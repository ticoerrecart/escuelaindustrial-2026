import { isAllowedReturnTo } from '$lib/redirect';

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
	const returnTo = url.searchParams.get('returnTo');

	if (returnTo && !isAllowedReturnTo(returnTo)) {
		return { returnTo: null, returnToError: 'URL de retorno no permitida.' };
	}

	return { returnTo, returnToError: null };
}
