import { env } from '$env/dynamic/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { fetchMe } from '$lib/auth-api';

function getProtectedRoutes() {
	const routes = env.PROTECTED_ROUTES ?? '/dashboard';
	return routes
		.split(',')
		.map((route) => route.trim())
		.filter(Boolean);
}

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth_token');
	event.locals.user = null;

	if (token) {
		const user = await fetchMe(token);
		if (user) {
			event.locals.user = user;
		} else {
			event.cookies.delete('auth_token', { path: '/' });
		}
	}

	const isProtected = getProtectedRoutes().some((route) => event.url.pathname.startsWith(route));

	if (isProtected && !event.locals.user) {
		throw redirect(303, '/login');
	}

	return resolve(event);
};
