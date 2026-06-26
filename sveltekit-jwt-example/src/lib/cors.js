import { env } from "$env/dynamic/private";

export function getAllowedOrigins() {
	const origins = env.ALLOWED_ORIGINS ?? "http://localhost:3000,http://localhost:5174";
	return origins
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);
}

export function isApiRoute(pathname) {
	return pathname.startsWith("/api/");
}

/** @param {string | null} origin */
export function getCorsHeaders(origin, allowedOrigins) {
	if (!origin || !allowedOrigins.includes(origin)) {
		return null;
	}

	return {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	};
}

/** @param {Response} response @param {Record<string, string>} headers */
export function applyCorsHeaders(response, headers) {
	response.headers.set("Access-Control-Allow-Origin", headers["Access-Control-Allow-Origin"]);
	response.headers.set(
		"Access-Control-Allow-Credentials",
		headers["Access-Control-Allow-Credentials"],
	);
}
