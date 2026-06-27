import { env } from '$env/dynamic/private';
import { PUBLIC_AUTH_API_URL } from '$env/static/public';
import { redirect, type Handle } from '@sveltejs/kit';

type AuthUser = {
	id: number;
	email: string;
	role: string;
};

const AUTH_COOKIE_OPTIONS = {
	path: '/',
	httpOnly: true,
	sameSite: 'lax' as const,
	secure: false,
	maxAge: 3600
};

function getProtectedRoutes() {
	const routes = env.PROTECTED_ROUTES ?? '/dashboard';
	return routes
		.split(',')
		.map((route) => route.trim())
		.filter(Boolean);
}

function getLoginUrl(appUrl: string, returnPath = '/dashboard') {
	const returnTo = `${appUrl}/auth/callback?next=${encodeURIComponent(returnPath)}`;
	return `${PUBLIC_AUTH_API_URL}/login?returnTo=${encodeURIComponent(returnTo)}`;
}

function getLogoutUrl(appUrl: string, returnPath = '/') {
	return `${PUBLIC_AUTH_API_URL}/auth/logout?returnTo=${encodeURIComponent(`${appUrl}${returnPath}`)}`;
}

async function fetchMe(token: string): Promise<AuthUser | null> {
	const response = await fetch(`${PUBLIC_AUTH_API_URL}/api/me`, {
		headers: { Authorization: `Bearer ${token}` }
	});

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.user ?? null;
}

async function logoutRemote() {
	await fetch(`${PUBLIC_AUTH_API_URL}/api/logout`, { method: 'POST' });
}

async function handleAuthCallback(event: Parameters<Handle>[0]['event']) {
	const token = event.url.searchParams.get('token');
	const next = event.url.searchParams.get('next') ?? '/dashboard';

	if (!token) {
		throw redirect(303, '/login');
	}

	const user = await fetchMe(token);

	if (!user) {
		throw redirect(303, '/login');
	}

	event.cookies.set('auth_token', token, AUTH_COOKIE_OPTIONS);
	event.locals.user = user;

	const destination = next.startsWith('/') ? next : '/dashboard';
	throw redirect(303, destination);
}

async function handleAuthLogout(event: Parameters<Handle>[0]['event']) {
	event.cookies.delete('auth_token', { path: '/' });
	event.locals.user = null;
	await logoutRemote();
	throw redirect(303, getLogoutUrl(event.url.origin, '/'));
}

function handleAuthLogin(event: Parameters<Handle>[0]['event']) {
	const next = event.url.searchParams.get('next') ?? '/dashboard';
	const destination = next.startsWith('/') ? next : '/dashboard';
	throw redirect(303, getLoginUrl(event.url.origin, destination));
}

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/auth/callback') {
		await handleAuthCallback(event);
	}

	if (event.url.pathname === '/logout') {
		await handleAuthLogout(event);
	}

	if (event.url.pathname === '/login') {
		handleAuthLogin(event);
	}

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
		throw redirect(303, `/login?next=${encodeURIComponent(event.url.pathname)}`);
	}

	return resolve(event);
};
