import { json, type RequestHandler } from '@sveltejs/kit';
import { loginRemote } from '$lib/auth-api';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password } = await request.json();
	const result = await loginRemote(email, password);

	if ('error' in result) {
		return json({ error: result.error }, { status: 401 });
	}

	cookies.set('auth_token', result.token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		maxAge: 3600
	});

	return json({ user: result.user });
};
