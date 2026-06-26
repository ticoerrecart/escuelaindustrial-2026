// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { AuthUser } from '$lib/auth-api';

declare global {
	namespace App {
		interface Locals {
			user: AuthUser | null;
		}
	}
}

export {};
