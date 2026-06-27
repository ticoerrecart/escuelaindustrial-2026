import { redirect } from "@sveltejs/kit";
import { isAllowedReturnTo } from "$lib/redirect";

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies, url }) {
	cookies.delete("token", { path: "/" });

	const returnTo = url.searchParams.get("returnTo");

	if (returnTo && isAllowedReturnTo(returnTo)) {
		throw redirect(303, returnTo);
	}

	throw redirect(303, "/login");
}
