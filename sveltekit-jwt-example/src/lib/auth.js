import { env } from "$env/dynamic/private";
import jwt from "jsonwebtoken";

function getJwtSecret() {
	const secret = env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET environment variable is not set");
	}
	return secret;
}

export function createToken(user) {
	return jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		getJwtSecret(),
		{ expiresIn: "1h" },
	);
}

export function verifyToken(token) {
	try {
		return jwt.verify(token, getJwtSecret());
	} catch {
		return null;
	}
}
