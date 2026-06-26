import { verifyToken } from "$lib/auth";
import {
	applyCorsHeaders,
	getAllowedOrigins,
	getCorsHeaders,
	isApiRoute,
} from "$lib/cors";
import { redirect } from "@sveltejs/kit";

const protectedRoutes = ["/dashboard"];

/** @param {import('@sveltejs/kit').RequestEvent} event */
function getToken(event) {
	const cookieToken = event.cookies.get("token");
	if (cookieToken) {
		return cookieToken;
	}

	const auth = event.request.headers.get("authorization");
	if (auth?.startsWith("Bearer ")) {
		return auth.slice(7);
	}

	return null;
}

export async function handle({ event, resolve }) {
	const allowedOrigins = getAllowedOrigins();
	const origin = event.request.headers.get("origin");
	const apiRoute = isApiRoute(event.url.pathname);
	const cors = getCorsHeaders(origin, allowedOrigins);

	if (apiRoute && event.request.method === "OPTIONS" && cors) {
		return new Response(null, { status: 204, headers: cors });
	}

	const token = getToken(event);
	event.locals.user = token ? verifyToken(token) : null;

	const isProtectedRoute = protectedRoutes.some((route) =>
		event.url.pathname.startsWith(route),
	);

	if (isProtectedRoute && !event.locals.user) {
		throw redirect(303, "/login");
	}

	const response = await resolve(event);

	if (apiRoute && cors) {
		applyCorsHeaders(response, cors);
	}

	return response;
}
