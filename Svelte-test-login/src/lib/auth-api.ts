import axios from 'axios';
import { PUBLIC_AUTH_API_URL } from '$env/static/public';

export type AuthUser = {
	id: number;
	email: string;
	role: string;
};

const api = axios.create({
	baseURL: PUBLIC_AUTH_API_URL,//definimos la url del servicio de autenticacion
	validateStatus: () => true
});

export async function fetchMe(token: string): Promise<AuthUser | null> {
	const { data, status } = await api.get('/api/me', {
		headers: { Authorization: `Bearer ${token}` }
	});

	if (status !== 200) {
		return null;
	}

	return data.user ?? null;
}

export async function loginRemote(
	email: string,
	password: string
): Promise<{ token: string; user: AuthUser } | { error: string }> {
	const { data, status } = await api.post('/api/login', { email, password });

	if (status !== 200 || data.error) {
		return { error: data.error ?? 'Login failed' };
	}

	return { token: data.token, user: data.user };
}
