import { getAllowedOrigins } from "$lib/cors";

/** @param {string | null | undefined} returnTo */
export function isAllowedReturnTo(returnTo) {
	if (!returnTo) {
		return false;
	}

	try {
		const url = new URL(returnTo);
		return getAllowedOrigins().includes(url.origin);
	} catch {
		return false;
	}
}
